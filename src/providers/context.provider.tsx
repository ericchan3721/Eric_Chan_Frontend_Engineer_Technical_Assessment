import { useState } from "react";
import AlertBox from "../components/Alert";
import BookingForm from "../components/Booking/Form";
import { GlobalContext } from "../stores/store";
import { SetAlertBoxOptions, SetBookingFormOptions } from "../types/components";

const GlobalContextProvider = ({ children }: any) => {
    const [bookingForm, setBookingForm] = useState<SetBookingFormOptions>({
        isOpen: false,
        doctorId: '',
    });
    const [alertBox, setAlertBox] = useState<SetAlertBoxOptions>({
        isOpen: false,
        severity: 'error',
    });

    return (
        <GlobalContext.Provider
            value={{
                setBookingForm,
                setAlertBox,
            }}
        >
            {children}
            <AlertBox {...alertBox} />
            <BookingForm {...bookingForm} />
        </GlobalContext.Provider>
    )
};

export default GlobalContextProvider;
