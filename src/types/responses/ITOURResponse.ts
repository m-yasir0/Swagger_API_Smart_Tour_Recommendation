// Register Tour response
export interface IRegisterTourResponse {
    TourDestinations: Array<string>;
    TourDate: Date;
    TourParticipants: number;
    BussesAlloted: Array<ISingleBUSS> | any;
    TourRegistrarPhone: string;
    TourRegistrarName: string;
}

/**
 * Single Bus interface 
 * Used when populating Tour Alloted busses
 */
interface ISingleBUSS {
    _id: string;
    BussName: string;
    BussSeats: number;
    BussBookingDates?: Date[];
    createdAt?: Date | any;
    updatedAt?: Date | any
}