import EventModel from "../../../infrastructureLayer/database/model/eventModel";

export const sendingEmail =async () =>{
    const currentDate = new Date(); // Current date and time
const currentDateString = currentDate.toISOString().split('T')[0]; // Current date in 'YYYY-MM-DD' format
const currentTime = currentDate.getTime(); // Current time in milliseconds

// Calculate the time one hour before the event's starting time
const oneHourBefore = new Date(currentTime - 60 * 60 * 1000); // One hour before current time

const data = await EventModel.aggregate([
  {
    $addFields: {
      // Create a date object for event start time
      eventStart: {
        $dateFromString: {
          dateString: {
            $concat: [
              "$start_date",
              "T",
              "$starting_time",
              ":00Z" // Ensure the time is in UTC
            ]
          }
        }
      }
    }
  },
  {
    $match: {
      // Match events happening today
      start_date: currentDateString,
      // Match events where current time is between one hour before and the event start time
      
    }
  }
]);
const date = data[0].eventStart

const startDate = new Date(date); // Example start date and time
const curDate = new Date(); 

console.log('Formatted startDate:', startDate.toISOString());
console.log('Formatted currentDate:', curDate.toISOString());


}
//   {
//     $unwind: "$registrations" // Unwind the registrations array
//   },
//   {
//     $lookup: {
//       from: "users", // The collection to join with
//       localField: "registrations", // The user IDs in the registrations array
//       foreignField: "_id", // The field in the 'users' collection to match
//       as: "user_info" // The name of the output array field
//     }
//   },
//   {
//     $unwind: "$user_info" // Unwind the user_info array to get individual user details
//   },
//   {
//     $group: {
//       _id: "$_id",
//       registeredUsers: { $addToSet: "$user_info.email" } // Collect unique user emails
//     }
//   },
//   {
//     $project: {
//       _id: 0, // Exclude the event _id from the output
//       registeredUsers: 1 // Include the array of user emails
//     }
//   }

