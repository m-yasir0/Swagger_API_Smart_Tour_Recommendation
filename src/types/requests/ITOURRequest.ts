export interface IRegisterTourRequest {
    TourDestinations: Array<string>;
    TourDate: "yyyy-mm-dd";
    TourParticipants: number;
    TourRegistrarPhone: string;
    TourRegistrarName: string;
}