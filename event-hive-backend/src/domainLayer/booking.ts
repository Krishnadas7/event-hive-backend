export interface IBooking {
    _id?: string;                    // Unique identifier for the booking
    user_id?: string;                 // Reference to the user making the booking
    event_id?: string;                // Reference to the event being booked
    company_id?: string;              // Reference to the company hosting the event
    booking_date?: any;           // Date when the booking was made (ISO format)
    payment_status?: string; // Status of the payment
    payment_amount?: string;         // Amount paid for the booking
    ticket_type?: string;   // Type of ticket (free or paid)
    eventDetails?:any;
  }
  