export type TimeRange = {
    id: string;
    start: string;
    end: string;
};

export type DayAvailability = {
    ranges: TimeRange[];
};

export type WeekAvailability = {
    [key in WeekDay]: DayAvailability;
};

export enum WeekDay {
    SUNDAY = "DOM",
    MONDAY = "SEG",
    TUESDAY = "TER",
    WEDNESDAY = "QUA",
    THURSDAY = "QUI",
    FRIDAY = "SEX",
    SATURDAY = "SAB"
}

export const WEEK_DAYS = [
    WeekDay.SUNDAY,
    WeekDay.MONDAY,
    WeekDay.TUESDAY,
    WeekDay.WEDNESDAY,
    WeekDay.THURSDAY,
    WeekDay.FRIDAY,
    WeekDay.SATURDAY
];

export const DEFAULT_WEEK_AVAILABILITY: WeekAvailability = {
    [WeekDay.SUNDAY]: { ranges: [] },
    [WeekDay.MONDAY]: { ranges: [] },
    [WeekDay.TUESDAY]: { ranges: [] },
    [WeekDay.WEDNESDAY]: { ranges: [] },
    [WeekDay.THURSDAY]: { ranges: [] },
    [WeekDay.FRIDAY]: { ranges: [] },
    [WeekDay.SATURDAY]: { ranges: [] }
}; 