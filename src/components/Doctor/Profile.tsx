import { Avatar, Box, Button, Card, styled, Typography } from "@mui/material";
import { useGlobalContext } from "../../hooks/context.hook";
import { Color } from "../../themes/color";
import { SetBookingFormOptions } from "../../types/components";
import { Doctor } from "../../types/doctor";
import DoctorAddress from "./Address";
import DoctorAvailability from "./Availability";

interface DoctorProfileProps {
    doctor: Doctor;
}

const StyledCard = styled(Card)({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '20px',
    gap: '16px',
    border: 'solid 1px #8c8c8c',
    borderRadius: 20,
    // flexBasis: '33%',
    width: '100%',
});

const StyledInfoBox = styled(Box)({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    gap: '10px',
});

const StyledButton = styled(Button)({
    backgroundColor: Color.THEME_PINK,
    textTransform: 'none',
    alignSelf: 'flex-end',
    '&:hover': {
        backgroundColor: Color.THEME_PINK_DARKER,
    },
})

const DoctorProfile = ({ doctor }: DoctorProfileProps) => {
    const { setBookingForm } = useGlobalContext();

    const handleOnClick = () => {
        setBookingForm((prevOptions: SetBookingFormOptions) => ({
            ...prevOptions,
            isOpen: true,
            doctorId: doctor.id,
            doctorName: doctor.name,
            doctorAvailability: doctor.opening_hours,
        }));
    }

    return (
        <StyledCard>
            <Avatar sx={{ width: 64, height: 64 }}>{doctor.name.charAt(0)}</Avatar>
            <StyledInfoBox>
                <Typography variant="h2" sx={{ fontSize: '48px' }}>{doctor.name}</Typography>
                <DoctorAddress address={doctor.address} />
                <StyledButton variant="contained" onClick={handleOnClick} sx={{ alignSelf: 'flex-end' }}>Book now</StyledButton>
            </StyledInfoBox>
        </StyledCard>
    )
}

export default DoctorProfile;