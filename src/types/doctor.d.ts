export type Address = {
    district: string;
    line_1: string;
    line_2: string;
}

export type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export type OpeningHour = {
    start: string;
    end: string;
    isClosed: boolean;
    day: Day;
}

export interface Doctor {
    id: string;
    name: string;
    description: string;
    address: Address;
    opening_hours: OpeningHour[];
}