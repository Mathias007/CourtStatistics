export interface CourtStatistic {
    category: string;
    id: number;
    year: number;
    incoming: number;
    resolved: number;
    backlog_start: number;
    backlog_end: number;
}

export interface Court {
    _id: string;
    court_name: string;
    statistics: CourtStatistic[];
}
