// Update Buss interface
export interface IUpdateBussRequest {
    _id: string;
    BussName: string;
    BussSeats: number
}

// Add buss interface
export interface IAddBussRequest {
    BussName: string;
    BussSeats: number
}

// Delete Buss interface
export interface IDeleteBussRequest {
    _id: string;
}