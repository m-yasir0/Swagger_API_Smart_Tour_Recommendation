import { Document } from "mongoose";

export interface IBUSS extends Document {
    _id: string;
    BussName: string;
    BussSeats: number;
    BussBookingDates: Date[];
    createdAt?: Date | any;
    updatedAt?: Date | any
}
