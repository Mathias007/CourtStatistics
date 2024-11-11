import mongoose, { Document, Schema } from "mongoose";
import { DatabaseModels } from "../../config/DatabaseModels";

const { COURT } = DatabaseModels;

interface Case {
    category: string;
    incoming_backlog: number;
    inflow: number;
    resolved: number;
    outgoing_backlog: number;
}

interface Statistic {
    year: number;
    cases: Case[];
}

export interface CourtDocument extends Document {
    court_name: string;
    statistics: Statistic[];
}

const CaseSchema = new Schema<Case>({
    category: { type: String, required: true },
    incoming_backlog: { type: Number, required: true },
    inflow: { type: Number, required: true },
    resolved: { type: Number, required: true },
    outgoing_backlog: { type: Number, required: true },
});

const StatisticSchema = new Schema<Statistic>({
    year: { type: Number, required: true },
    cases: { type: [CaseSchema], required: true },
});

const CourtSchema = new Schema<CourtDocument>({
    court_name: { type: String, required: true },
    statistics: { type: [StatisticSchema], required: true },
});

export default mongoose.model<CourtDocument>(COURT, CourtSchema);
