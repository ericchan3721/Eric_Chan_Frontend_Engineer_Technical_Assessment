import React from "react";

export interface SetBookingFormOptions {
    isOpen: boolean;
    title?: string | JSX.Element;
    children?: React.ReactNode;
    onClose?: () => void;
    onConfirm?: () => void;
    onCancel?: () => void;
    doctorId: string;
    doctorName?: string;
    doctorAvailability?: OpeningHour[];
}

export interface SetAlertBoxOptions {
    isOpen: boolean;
    title?: string | JSX.Element,
    message?: string | JSX.Element;
    autoHideDuration?: number | null;
    severity: 'success' | 'error' | 'warning' | 'info',
}