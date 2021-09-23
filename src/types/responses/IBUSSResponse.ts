// Get all busses response interface
// Add update buss response interface
export interface IGetBussResponse {
    _id: string;
    BussName: string;
    BussSeats: number;
    BussBookingDates: Date[];
    createdAt?: Date | any;
    updatedAt?: Date | any
}