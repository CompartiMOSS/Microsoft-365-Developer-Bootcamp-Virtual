export type SessionScheduleProps =
{
    Schedule?: string;
    Title?: string;
    Speaker?:string;
}

export type SessionScheduleTable = {
    ScheduleTable:SessionScheduleProps[];
}