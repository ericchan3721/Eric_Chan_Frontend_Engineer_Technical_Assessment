import { Dialog, DialogContent, DialogTitle, FormControl, FormControlLabel, FormControlLabelProps, FormLabel, IconButton, Radio, radioClasses, RadioGroup, styled, TextField, Typography, useRadioGroup } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { LoadingButton } from '@mui/lab';
import { DateCalendar, pickersDayClasses } from "@mui/x-date-pickers";
import { BookingParams } from "../../types/booking";
import { necktieHttpClient } from "../../services/httpClient";
import { Color } from "../../themes/color";
import { SetAlertBoxOptions, SetBookingFormOptions } from "../../types/components";
import { useGlobalContext } from "../../hooks/context.hook";
import { OpeningHour } from "../../types/doctor";
import { WEEKDAYS } from "../../enums/week.enum";

const StyledDialog = styled(Dialog)({
    padding: '20px',
});

const StyledDialogTitle = styled(DialogTitle)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
});

const StyledDialogContent = styled(DialogContent)({ 
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
});

const StyledTextField = styled(TextField)({
    width: '100%',
});

const StyledTimeslotWrapper = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
    },
}));

const StyledDateCalendar = styled(DateCalendar)({
    flex: '1 1 60%',
});

const StyledFormControl = styled(FormControl)({
    flex: '1 1 40%',
    padding: 16,
    gap: 8,
});

const StyledButton = styled(LoadingButton)({
    width: '100%',
    height: '48px',
    backgroundColor: Color.THEME_PINK,
    textTransform: 'none',
    '&:hover': {
        backgroundColor: Color.THEME_PINK_DARKER,
    },
});


const BookingForm = ({
    isOpen = false,
    doctorId,
    doctorName,
    doctorAvailability,
    onClose,
}: SetBookingFormOptions) => {
    const { setBookingForm, setAlertBox } = useGlobalContext();
    const [date, setDate] = useState<Dayjs>(dayjs(new Date()));
    const [timeslot, setTimeslot] = useState<number>(0);
    const [patientName, setPatientName] = useState<string>('');
    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    
    const getTimeslots = useCallback(() => {
        const weekday = WEEKDAYS[date.day()];
        return doctorAvailability?.find((opening: OpeningHour) => opening.day === weekday) ?? {};
    }, []);
    
    const [availableTimeslots, setAvailableTimeslots] = useState<OpeningHour>(getTimeslots());

    const openAlert = (options: SetAlertBoxOptions) => {
        setTimeout(() => {
            setAlertBox((prevOptions: SetAlertBoxOptions) => ({
                ...prevOptions,
                ...options,
            }));
        }, 0);
    };  

    const handleSubmitBooking = async () => {
        // console.log('date:', date?.format('YYYY-MM-DD'));
        // console.log('time:', timeslot);
        const bookingParams: BookingParams = {
            name: patientName,
            date: date?.format('YYYY-MM-DD') as string,
            start: timeslot,
            doctorId,
        };
        setIsSubmiting(true);
        try {
            await necktieHttpClient
                    .post('/booking', bookingParams)
                    .then(res => {
                        // console.log(res);
                        const { id, status } = res.data;
                        if (res.status === 200 && id && status === 'confirmed') {
                            openAlert({
                                isOpen: true,
                                severity: 'success',
                                title: 'Your booking has been placed!',
                                message: `Booking id:${id}`,
                            });
                            closeBookingForm();
                            resetInputs();
                        }
                    })
                    .catch(e => {
                        // console.log('error', e);
                        openAlert({
                            isOpen: true,
                            severity: 'error',
                            title: 'Failed to place your booking!',
                        });
                    })
        } finally {
            setIsSubmiting(false);
        }
    }

    const shouldSubmitBtnEnabled = useCallback(() => {
        return (
            patientName.length > 0 &&
            date &&
            timeslot && 
            doctorId
        );
    }, [patientName, date, timeslot, doctorId]);

    const resetInputs = () => {
        setDate(dayjs(new Date()));
        setTimeslot(0);
        setPatientName('');
        setAvailableTimeslots(getTimeslots());
    }

    const closeBookingForm = () => {
        setBookingForm((prevOptions: SetBookingFormOptions) => ({
            ...prevOptions,
            isOpen: false,
            doctorId: '',
            doctorName: '',
            doctorAvailability: undefined,
        }));
    };

    useEffect(() => {
        resetInputs();
    }, []);

    const handleClose = () => {
        if (onClose) onClose();
        closeBookingForm();
        resetInputs();
    };

    const getActualTimeslots = useMemo(() => {
        const timeslots = [];
        //  checking selected date is today?
        const today = dayjs(new Date());
        const defaultStartTime = parseFloat(availableTimeslots?.start);
        //  if date is identical, use Max of currentHr & API startTime, since can't choose any past timeslots
        const startTime = today.date() === date.date() ? Math.max(today.hour(), defaultStartTime) : defaultStartTime;
        for (let i = startTime; i < parseFloat(availableTimeslots?.end); i++) {
            //  checking timeslot will exceed the endTime or not
            if (i + 1 <= parseFloat(availableTimeslots.end)) {
                const startTimeMins = (i % 1) * 60 === 0 ? '00' : (i % 1) * 60;
                const startTimeText = `${Math.floor(i)}:${startTimeMins}`;
                const endTimeMins = ((i + 1) % 1) * 60 === 0 ? '00' : ((i + 1) % 1) * 60;
                const endTimeText = `${Math.floor(i + 1)}:${endTimeMins}`;
                timeslots.push(<FormControlLabel key={`timeslot-${i}`} value={i} label={`${startTimeText} - ${endTimeText}`} control={<Radio />}/>);
            }
        }
        return timeslots;
    }, [availableTimeslots]);

    return (
        <StyledDialog open={isOpen} scroll="body" onClose={handleClose}>
            <StyledDialogTitle>
                <Typography>{`Booking for Dr. ${doctorName}`}</Typography>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>
            <StyledDialogContent>
                <StyledTextField placeholder="Patient's Name" value={patientName} onChange={(e)=>setPatientName(e.target.value)} />
                <StyledTimeslotWrapper>
                    <StyledDateCalendar
                        disablePast
                        shouldDisableDate={(date: any) => {
                            const weekday = WEEKDAYS[date?.day() ?? -1];
                            const isClosed = doctorAvailability?.find((opening: OpeningHour) => opening.day === weekday).isClosed === true;
                            return isClosed;
                        }}
                        value={date}
                        onChange={(newValue: any) => {
                            //  checking today's weekday
                            const weekday = WEEKDAYS[newValue?.day() ?? -1];
                            setDate(newValue);
                            //  reset selected timeslot
                            setTimeslot(0);
                            //  set available timeslots
                            const timeslots = doctorAvailability?.find((opening: OpeningHour) => opening.day === weekday);
                            setAvailableTimeslots(timeslots);
                        }}
                    />
                    <StyledFormControl>
                        <Typography>Available timeslots:</Typography>
                        {getActualTimeslots.length > 0 && availableTimeslots !== null && !availableTimeslots.isClosed ? (
                            <RadioGroup
                                value={timeslot}
                                onChange={(e) => {
                                    setTimeslot(parseFloat(e.target.value));
                                }}
                            >
                                {getActualTimeslots}
                            </RadioGroup>
                        ) : (
                            <Typography>Not available on your selected date</Typography>
                        )}
                    </StyledFormControl>
                </StyledTimeslotWrapper>
                <StyledButton
                    variant="contained"
                    onClick={handleSubmitBooking}
                    disabled={!shouldSubmitBtnEnabled()}
                    loading={isSubmiting}
                >
                    Confirm
                </StyledButton>
            </StyledDialogContent>
        </StyledDialog>
    )
}

export default BookingForm;