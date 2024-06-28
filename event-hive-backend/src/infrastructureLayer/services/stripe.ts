import IStripe from "../../usecaseLayer/interface/services/Istripe";
import { IResponse } from "../../usecaseLayer/interface/services/Iresponse";
import { Req } from "../types/expressTypes";

import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51PQWx603Z9ZoAMB6acIe5Mdje8GLBWcS6tFpMTRuXLAWL63YtLedZJ920W8djBDYz4j2o6DQURsPHmiq1BtQhPZe00Qt1if3Ff' as string,{
    apiVersion: "2024-04-10"
});

class StripeService implements IStripe{
    async  createPaymentIntent(
        amount:string,
        bookingId:string,
        user_id:string
      ):Promise<IResponse> {
        
        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: [
            {
              price_data: {
                currency: 'inr',
                product_data: {
                  name: 'Service Payment is',
                },
                unit_amount: parseInt(amount) *100,
              },
              quantity: 1,
            },
          ],
          mode: 'payment',
          success_url: 'http://localhost:5173/user/success-page',
          cancel_url: 'http://localhost:5173/api/user/checkout-failed',
          metadata: { 
            bookingId,
            amount,
            user_id
          },
        });
        console.log('=ssss==s',session)
          return {
            success:true,
            status:200,
            data:session.id
          }
    }
    async paymentSuccess(req:Req){
        const payload = req.body;     
        const payloadString = JSON.stringify(payload, null, 2);
        const signature = req.headers["stripe-signature"];
    
        if (typeof signature !== "string") {
          return false;
        }
    
        const endpointSecret= "whsec_a2d68d3b6b38d0957bfa39b971e29d842ea6acf04548b64181f493c25a33f585";
        const header = stripe.webhooks.generateTestHeaderString({
          payload:payloadString,
          secret:endpointSecret
        });
    
        let event
           event = stripe.webhooks.constructEvent(
          payloadString,
          header,
          endpointSecret
        );
        if (event.type == "charge.succeeded") {
          return true;
        } else {
          return false;
        }
    
      }
}

export default StripeService