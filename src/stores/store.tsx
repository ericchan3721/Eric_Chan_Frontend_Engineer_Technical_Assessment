import { createContext } from "react";
import { SetAlertBoxOptions, SetBookingFormOptions } from "../types/components"

export type GlobalContextType = {
    setBookingForm: (options: SetBookingFormOptions | ((prevOptions: SetBookingFormOptions) => SetBookingFormOptions)) => void;
    setAlertBox: (options: SetAlertBoxOptions | ((prevOptions: SetAlertBoxOptions) => SetAlertBoxOptions)) => void;
};

export const GlobalContext = createContext<GlobalContextType>({
    setBookingForm: (options: SetBookingFormOptions | ((prevOptions: SetBookingFormOptions) => SetBookingFormOptions)) => undefined,
    setAlertBox: (options: SetAlertBoxOptions | ((prevOptions: SetAlertBoxOptions) => SetAlertBoxOptions)) => undefined,
});
