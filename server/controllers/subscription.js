import Joi from 'joi';
import  Subscription from "../models/Subscription.js"
import { addMonths } from 'date-fns';
import User from '../models/User.js';
import Stripe from 'stripe';
// import User from '../models/User.js';
// import Subscription from '../models/Subscription.js';
import BusinessDocument from '../models/BusinessDocuments.js';

// Replace 'your_secret_key' with your actual Stripe API key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);








const  stripeSession =async(plan,userId)=>{
  console.log(plan,userId)
  
  try{
    const session = await stripe.checkout.sessions.create({
      mode:"subscription",
      payment_method_types:['card'],
      line_items:[{
        price:plan,
        quantity:1
      }],
      success_url :"https://rsglobalties.com/dashboard/payment-successful",
      cancel_url :"https://rsglobalties.com/dashboard/payment-cancelled",
      metadata: {
        userId: userId,
        plan:plan
      }
    })

    return session

  }catch(error){
     throw error
  }


}


const planPrices = {
  'free': "price_1OwsoBRtqZkTuUjduUB3FSJ1",
  'silver': "price_1Owsq4RtqZkTuUjdqnJOLTms",
  'gold': "price_1OwsrBRtqZkTuUjdOHCteHUe",
  'platinum': "price_1OwssERtqZkTuUjdD046OLmc"
};

export const subscribeUser = async (req, res, next) => {
  const { plan} = req.body; 
    

  const userId =req.user._id
  let planId = null;

  if (plan === 0) planId = planPrices['free'];
  else if (plan === 20) planId = planPrices['silver'];
  else if (plan === 70) planId = planPrices['gold'];
  else if (plan === 100) planId = planPrices['platinum'];

  try {
    console.log(planId, userId);

    const existingSubscription = await Subscription.findOne({ userId });
    console.log("existingSubscription",existingSubscription)
    if (existingSubscription) {
      const currentDate = new Date();
      if (currentDate < existingSubscription.planEndDate) {
        return res.status(400).json({ error: 'User already has an active subscription' });
      }
    }

    const session = await stripeSession(planId, userId);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error subscribing user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};



export const webhookHandler = async (req, res) => {
 
  const endpointSecret = process.env.End_Point_Secret;

  console.log("endpointSecret",endpointSecret)


  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);

  } catch (err) {
    console.log(`Webhook Error: ${err.message}`)
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }


  if (event) {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log("success")
        await handlePaymentIntentSucceeded(event);
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
}

 
  res.status(200).send();
};


const handlePaymentIntentSucceeded = async (event) => {
  try {
  
    const paymentIntentData = event.data.object;

    const session = await stripe.checkout.sessions.retrieve(paymentIntentData.id);
    const userId = session.metadata.userId;
    const planId =session.metadata.plan
    const planKey = Object.keys(planPrices).find(key => planPrices[key] === planId); 
    console.log("userId", userId);
    console.log("plan",planId)
    const expiryDate = new Date();
    const planStartDate = new Date();

  
    const planEndDate = new Date(planStartDate);
    planEndDate.setMonth(planEndDate.getMonth() + 1);

    const subscription = new Subscription({
      userId,
      plan: planId, 
      planStartDate,
      planEndDate,
      paymentStatus: 'paid',
      planKey:planKey,
      sessionId: paymentIntentData.id, 
    });

    await subscription.save();

    await User.findByIdAndUpdate(userId, { isCompanyVerified: true });

    console.log("Subscription created:", subscription);
  } catch (error) {
    console.error("Error saving subscription:", error);
    throw new Error("Error saving subscription to database");
  }
};





export const getUserSubscriptions = async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const subscriptions = await Subscription.find({ userId }).exec();
      return res.status(200).json(subscriptions);
    } catch (error) {
      console.error('Error retrieving subscriptions:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }



  };




  
  export const getAllUsersInformation = async (req, res, next) => {
    try {
 
      const users = await User.find();
  
      const userData = [];
  
      for (const user of users) {
     
        const subscription = await Subscription.findOne({ userId: user._id });
        
      
        const businessDocuments = await BusinessDocument.findOne({ userId: user._id });
  
    
        const formattedData = {
          user: {
            _id: user._id,
            name: user.fullName,
            email: user.email,
            companyName: user.companyName,
            country: user.country,
            accountType: user.accountType,
            isCompanyVerified: user.isCompanyVerified
       
          },
          subscription: subscription,
          businessDocuments: businessDocuments,
        };
  
     
        userData.push(formattedData);
      }
  
  
      res.json(userData);
    } catch (error) {
      console.error('Error in getAllUsersInformation:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  // export const checkOut = async (req, res, next) => {
  //   try {

  //       const subscription = await Subscription.findOne({ userId });
  //       console.log('Subscription:', subscription);
          
  //     if (!subscription) {
  //       return res.status(404).json({ error: 'Subscription not found' });
  //     }

  //     if (subscription.paymentStatus === 'paid') {
  //       return res.status(400).json({ error: 'Subscription is already paid' });
  //     }
  
    
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: subscription.price * 100,
  //       currency: 'usd',
  //       description: `Subscription payment for ${subscription.plan} plan`,
  //       payment_method: 'pm_card_visa',
  //       confirmation_method: 'manual',
  //       confirm: true,
  //     });
  

  //     subscription.paymentStatus = 'paid';
  //     await subscription.save();
  
  //     return res.status(200).json({ message: 'Payment successful', paymentIntent });
  //   } catch (error) {
  //     console.error('Error processing payment:', error);
  //     return res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // };


  export const StripeSuccess = async (req, res, next) => {
    const { sessionId} = req.body;

    const userId =req.user._id
  
    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId);
  
      if (session.payment_status === 'paid') {
        const subscriptionId = session.subscription;
        try {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId);
          const user = await User.findById(userId);
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
  
          // Extract necessary subscription information
          const planId = subscription.plan.id;
          let planType = "";
          if (planId === free) {
            planType = "Free";
          } else if (planId === silver) {
            planType = "Silver";
          } else if (planId === gold) {
            planType = "Gold";
          } else if (planId === platinum) {
            planType = "Platinum";
          } else {
            return res.status(500).json({ error: 'Invalid plan ID' });
          }
  
          const startDate = moment.unix(subscription.current_period_start).format('YYYY-MM-DD');
          const endDate = moment.unix(subscription.current_period_end).format('YYYY-MM-DD');
          const durationInSeconds = subscription.current_period_end - subscription.current_period_start;
          const durationInDays = moment.duration(durationInSeconds, 'seconds').asDays();
  
          // Update user's subscription information
          user.subscription = {
            sessionId: sessionId,
            planId: planId,
            planType: planType,
            planStartDate: startDate,
            planEndDate: endDate,
            planDuration: durationInDays
          };
          await user.save();
          
          return res.json({ message: "Payment successful" });
        } catch (error) {
          console.error('Error retrieving subscription:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
      } else {
        return res.json({ message: "Payment failed" });
      }
    } catch (error) {
      console.error('Error retrieving session:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };



  export const getUsersWithPlatinumPlan = async (req, res, next) => {
    try {
     
        const subscriptions = await Subscription.find({ planKey: "platinum" });

        const userIds = subscriptions.map(subscription => subscription.userId);

       
        const users = await User.find({ _id: { $in: userIds } }).select('fullName');

     
        const responseData = users.map(user => ({
            userId: user._id,
            fullName: user.fullName
        }));

        res.status(200).json(responseData);
    } catch (error) {
        next(error);
    }
}
  

// export const updateSubscriptionStatus = async (req, res, next) => {
//   try {
//     const userId = req.user._id; // Assuming userId is available in req.user

//     // Check if user is already subscribed
//     // const existingSubscription = await Subscription.findOne({ userId });

//     // if (existingSubscription) {
//     //   return res.status(200).json({ message: "Already subscribed" });
//     // }

//     const { plan } = req.body;

//     // Define planKey based on the plan selected
//     let planKey;
//     switch (plan) {
//       case 'free':
//         planKey = 'free';
//         break;
//       case 'silver':
//         planKey = 'silver';
//         break;
//       case 'gold':
//         planKey = 'gold';
//         break;
//       case 'platinum':
//         planKey = 'platinum';
//         break;
//       default:
//         planKey = 'free';
//         break;
//     }

//     // Update user's subscription status in the database
//     const subscription = new Subscription({
//       userId,
//       planKey,
//       plan,
//       paymentStatus: 'paid',  // Assuming the payment is successful
//       planStartDate: new Date(),
//       planDuration: 1,  // Assuming 1 month duration for all plans
//     });

//     await subscription.save();

//     res.status(200).json({ message: "Subscription status updated successfully." });
//   } catch (error) {
//     console.error("Error updating subscription status:", error);
//     next(error);
//   }
// };


    // export const subscribeUser = async (req, res, next) => {
    //   try {
    //     const { plan } = req.body;
    //     const userId = req.user._id;
    
    //     const existingFreeSubscription = await Subscription.findOne({
    //       userId,
    //       plan: 'free',
    //       expiryDate: { $lte: new Date() },
    //     });
    
    //     if (existingFreeSubscription) {
    //       return res.status(400).json({ error: 'User is not eligible for another free subscription at this time.' });
    //     }
    
    //     const schema = Joi.object({
    //       plan: Joi.string().valid('free', 'silver', 'gold', 'premium').required(),
    //     });
    
    //     const { error } = schema.validate({ plan });
    
    //     if (error) {
    //       return res.status(400).json({ error: error.details[0].message });
    //     }
    
    //     let price;
    //     switch (plan) {
    //       case 'free':
    //         price = 0;
    //         break;
    //       case 'silver':
    //         price = 50;
    //         break;
    //       case 'gold':
    //         price = 150;
    //         break;
    //       case 'premium':
    //         price = 250;
    //         break;
    //       default:
    //         return res.status(400).json({ error: 'Invalid subscription plan' });
    //     }
    
    //     const expiryDate = addMonths(new Date(), 1);
    //     const subscription = await Subscription.create({ userId, plan, price, expiryDate });
    
    //     return res.status(201).json(subscription);
    //   } catch (error) {
    //     console.error('Error creating subscription:', error);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    //   }
    // };



    export const deleteUser = async (req, res) => {
      try {
     
        const { userId } = req.params;
    
      
        const deletedUser = await User.findByIdAndDelete(userId);
    
        if (!deletedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
    
        
        res.json({ message: 'User deleted successfully', deletedUser });
      } catch (error) {
        console.error('Error in deleteUser:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    };



    
export const suspendUser = async (req, res) => {
  try {
    const { userId } = req.params;


    const updatedUser = await User.findByIdAndUpdate(userId, { isCompanyVerified: false }, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User suspended successfully', updatedUser });
  } catch (error) {
    console.error('Error in suspendUser:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};