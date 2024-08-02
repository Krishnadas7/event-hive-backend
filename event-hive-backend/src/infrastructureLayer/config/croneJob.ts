import cron from 'node-cron';
import { sendingEmail } from '../../usecaseLayer/usecase/croneJob/croneJob';

console.log('Server starting at', new Date());

// Define the task to run
const taskToRun = () => {
  console.log('Task executed at', new Date());
  // Add your task logic here
};
export const sample = () =>{
    cron.schedule('*/2 * * * *', () => {
  sendingEmail()
  taskToRun();
});

}
// Schedule the cron job to run every 2 minutes

console.log('Cron job setup completed');
