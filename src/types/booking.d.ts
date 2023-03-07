export enum BookingStatus {
    'cancelled',
    'confirmed',
}

export interface Booking {
    id: string;
    name: string;
    start: number;
    doctorId: string;
    date: string;
    status: BookingStatus;
}

export interface BookingParams {
    doctorId: string;
    name: string;
    date: string;
    start: number;
}