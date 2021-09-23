import { Schema, model } from 'mongoose';
import { IBUSS } from '../types/documents/IBUSS';
const BussSchema = new Schema(
    {
        BussName: String,
        BussSeats: Number,
        BussBookingDates: [Date]
    },
    { timestamps: true }
);
export const BussModel = model<IBUSS>('Busses', BussSchema);