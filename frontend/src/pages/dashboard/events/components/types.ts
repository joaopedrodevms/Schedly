import type { EventUpdateRequestDto } from "@/service/types.gen"

export type EventChanges = {
    [key: string]: EventUpdateRequestDto
}

export type SlugValidation = {
    [key: string]: {
        isValid: boolean,
        message?: string
    }
}

export type WeekDay = 0 | 1 | 2 | 3 | 4 | 5 | 6;

// 0 = Segunda, 6 = Domingo
export const WEEK_DAYS: WeekDay[] = [0, 1, 2, 3, 4, 5, 6];

export const WEEK_DAY_LABELS: Record<WeekDay, string> = {
    0: "SEG",
    1: "TER",
    2: "QUA",
    3: "QUI",
    4: "SEX",
    5: "SAB",
    6: "DOM"
};