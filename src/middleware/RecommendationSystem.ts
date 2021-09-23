import CustomError from "../utills/Error";
import { BussClass } from "../repositories/BussRepository";
class RecommendationClass {
    /**
     * @param available_busses Busses available in requested Date
     * @param tour_participants Total requested participants for tour
     * @returns busses Array of _id of recommended busses
     */
    AllotBusses(available_busses: Array<any>, tour_participants: number) {
        if (available_busses.length == 0)
            throw new CustomError(404, 'No available busses for your requested tour', 'Not Found');

        let buss_subset = this.GenerateBussesSubsets(available_busses, available_busses.length, tour_participants).sort(function (a: any, b: any) {
            return b.total_capacity - a.total_capacity;
        });;

        /**
         * @param subset Subset of document of recommended busses
         * @returns busses _ids
         */
        function ExtractIds(subset: any) {
            let busses = [];
            for (var i = 0; i < subset.Busses.length; i++) {
                busses.push(subset.Busses[i]._id);
            }
            return busses;
        }
        if (buss_subset.length >= 1) {
            let curr_subset = buss_subset.pop();
            return ExtractIds(curr_subset);
        }

        throw new CustomError(400, 'We currently donot have enough busses to accomodate your tour', 'Bad Request');
    }

    /**
     * @param available_busses Busses available in requested Date
     * @param total_busses length of available busses
     * @param tour_participants Requested tour participants
     * @returns all_subsets Subsets of busses array
     * Generate subset of busses document to evaluate mininum efficient available capacity 
     */

    private GenerateBussesSubsets(available_busses: Array<any>, total_busses: number, tour_participants: number) {
        let all_subsets = [];
        for (let i = 0; i < (Math.pow(2, total_busses)); i++) {
            let subset = [];
            let total_capacity = 0;
            for (let j = 0; j < total_busses; j++) {
                if (i & (1 << j)) {
                    total_capacity += available_busses[j].BussSeats;
                    subset.push(available_busses[j]);
                }
            }
            if (subset.length > 0 && total_capacity >= tour_participants)
                all_subsets.push({
                    Busses: subset,
                    total_capacity: total_capacity
                });
        }

        return all_subsets;
    }
}

/**
 * @param req 
 * @param res 
 * @param next 
 * Middleware call funtion. Attach recommended busses to res.locals
 * Uses BussClass to get available busses
 * Uses RecommendationClass to get busses from AllotBusses
 */

export function Recommend(req: any, res: any, next: any) {
    (async () => {
        try {
            var date: any;
            date = new Date(req.body.TourDate);
            if (date.toString() != 'Invalid Date') {
                var available_busses = await new BussClass().GetAvailableBussesByDate(date);
                res.locals.busses = await new RecommendationClass().AllotBusses(available_busses, req.body.TourParticipants);
                next();
            }
            else
                throw new CustomError(400, 'Cannot register tour. Invalid TourDate entered', 'Bad Request')
        } catch (error) {
            next(error)
        }
    })()
}