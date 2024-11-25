import { CourtModel } from "../models";

export const getCourts = async (): Promise<CourtModel.CourtDocument[]> => {
    return CourtModel.Court.find();
};

export const getCourtById = async (
    id: string
): Promise<CourtModel.CourtDocument | null> => {
    return CourtModel.Court.findById(id);
};

export const createCourt = async (
    data: CourtModel.CourtDocument
): Promise<CourtModel.CourtDocument> => {
    const court = new CourtModel.Court(data);
    return court.save();
};

export const updateCourt = async (
    id: string,
    data: Partial<CourtModel.CourtDocument>
): Promise<CourtModel.CourtDocument | null> => {
    return CourtModel.Court.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourt = async (
    id: string
): Promise<CourtModel.CourtDocument | null> => {
    return CourtModel.Court.findByIdAndDelete(
        id
    ) as unknown as CourtModel.CourtDocument | null;
};
