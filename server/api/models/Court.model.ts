import mongoose, { Schema, Document } from "mongoose";

export enum StatisticCategory {
    PENAL = "PENAL",
    CIVIL = "CIVIL",
    LABOR = "LABOR",
}

export interface Statistic {
    id: number;
    year: number;
    category: StatisticCategory;
    incoming: number;
    resolved: number;
    backlog_start: number;
    backlog_end: number;
}

export interface CourtDocument extends Document {
    court_name: string;
    court_address: string;
    statistics: Statistic[];
}

const StatisticSchema = new Schema<Statistic>({
    id: {
        type: Number,
        required: true,
        unique: false,
    },
    year: { type: Number, required: true },
    category: {
        type: String,
        enum: StatisticCategory,
        required: true,
    },
    incoming: { type: Number, required: true },
    resolved: { type: Number, required: true },
    backlog_start: { type: Number, required: true },
    backlog_end: { type: Number, required: true },
});

const CourtSchema = new Schema<CourtDocument>({
    court_name: { type: String, required: true, unique: true },
    court_address: { type: String, required: false, unique: false },
    statistics: [StatisticSchema],
});

export const Court = mongoose.model<CourtDocument>("Court", CourtSchema);
