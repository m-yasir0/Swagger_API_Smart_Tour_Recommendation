import { BussModel } from "../models/BussModel";
import { IAddBussRequest, IDeleteBussRequest, IUpdateBussRequest } from "../types/requests/IBUSSRequest";

export class BussClass {

    // Adding new buss to the collection
    AddNewBuss(buss: IAddBussRequest) {
        return new BussModel(buss).save();
    }

    // Deleting bus from collection
    DeleteBuss(buss: IDeleteBussRequest) {
        return BussModel.findOneAndDelete({ _id: buss._id });
    }

    // Updating bus in the collection
    UpdateBuss(buss: IUpdateBussRequest) {
        return BussModel.findByIdAndUpdate(buss._id, buss, {
            new: true
        })
    }

    // Get all busses from collection
    GetBusses() {
        return BussModel.find();
    }

    /**
     * 
     * @param date Requested tour date Pattern yyyy-dd-mm
     * @returns array of available busses
     */
    async GetAvailableBussesByDate(date: Date) {
        function FilterAvailable(elem: any, index: number, array: any) {
            return elem.BussBookingDates.indexOf(date.toString()) == -1
        }
        var available_busses = []
        var all_busses = await BussModel.find();
        available_busses = all_busses.filter(FilterAvailable);
        return available_busses;
    }
}