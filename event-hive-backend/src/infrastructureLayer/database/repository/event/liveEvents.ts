import EventModel from "../../model/eventModel";

export const liveEvents = async (
    companyId: string,
    eventModels: typeof EventModel
) => {
    try {
        console.log('Company ID:', companyId);
        const currentDate = new Date();

        // Find events that are live based on the current date
        const events = await eventModels.find({
            company_id: companyId,
            $expr: {
                $and: [
                    { $lte: [{ $toDate: "$start_date" }, currentDate] },
                    { $gte: [{ $toDate: "$end_date" }, currentDate] }
                ]
            }
        });

        console.log('=== Live Events ===', events);

        return events;
    } catch (error) {
        throw error;
    }
};
