import { Court, CourtDocument } from "../models/Court.model";

export const getCourts = async (): Promise<CourtDocument[]> => {
    return Court.find();
};

export const getCourtById = async (
    id: string
): Promise<CourtDocument | null> => {
    return Court.findById(id);
};

export const createCourt = async (
    data: CourtDocument
): Promise<CourtDocument> => {
    const court = new Court(data);
    return court.save();
};

export const updateCourt = async (
    id: string,
    data: Partial<CourtDocument>
): Promise<CourtDocument | null> => {
    return Court.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourt = async (
    id: string
): Promise<CourtDocument | null> => {
    return Court.findByIdAndDelete(id) as unknown as CourtDocument | null;
};
