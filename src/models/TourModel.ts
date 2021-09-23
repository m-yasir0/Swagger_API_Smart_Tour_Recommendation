import { Schema, model } from 'mongoose';
import { ITOUR } from '../types/documents/ITOUR';

const TourSchema = new Schema(
    {
        TourDestinations: [String],
        TourDate: Date,
        TourParticipants: Number,
        BussesAlloted: [{
            type: Schema.Types.ObjectId,
            ref: 'Busses'
        }],
        TourRegistrarPhone: String,
        TourRegistrarName: String
    },
    { timestamps: true }
);

export const TourModel = model<ITOUR>('Tours', TourSchema);