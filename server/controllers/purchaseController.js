import Joi from 'joi';
import { STRIPE_SECRET_KEY } from '../config/config.js';
import Purchase from '../models/Purchase.js';
import Stripe from 'stripe';
import LicenseKey from '../models/LicenseKey.js';
import { createError } from '../utils/createError.js';
import GameSchema from '../models/GameSchema.js';
import { sendLicenseCodeEmail } from './Email/sendOTPEmal.js';

export const createPurchase = async (req, res, next) => {
    const { gameLicense, licenseKey } = req.body;

    try {
        const newPurchase = new Purchase({
            user: req.user._id,
            gameLicense,
            licenseKey
        });

        const savedPurchase = await newPurchase.save();
        res.status(201).json(savedPurchase);
    } catch (error) {
        next(error);
    }
};




export const getPurchasesByUser = async (req, res, next) => {
    try {
        const purchases = await Purchase.find({ user: req.params.userId })
            .populate('gameLicense')
            .populate('licenseKey');

        res.status(200).json(purchases);
    } catch (error) {
        next(error);
    }
};

export const getPurchaseById = async (req, res, next) => {
    try {
        const purchase = await Purchase.findById(req.params.id)
            .populate('gameLicense')
            .populate('licenseKey');

        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json(purchase);
    } catch (error) {
        next(error);
    }
};


export const getAllPurchases = async (req, res, next) => {
    try {
        const purchases = await Purchase.find()
            .populate('user', 'username email')
            .populate('gameLicense')
            .populate('licenseKey');

        res.status(200).json(purchases);
    } catch (error) {
        next(error);
    }
};

export const deletePurchase = async (req, res, next) => {
    try {
        const purchase = await Purchase.findByIdAndRemove(req.params.id);

        if (!purchase) {
            return res.status(404).json({ message: 'Purchase not found' });
        }

        res.status(200).json({ message: 'Purchase deleted successfully' });
    } catch (error) {
        next(error);
    }
};



const calculateOrderAmount = async (items) => {
    let totalAmount = 0;

    for (const item of items) {
        const game = await GameSchema.findById(item._id);
        if (!game) continue;

        let price = game.price;
        if (game.offer.isActive && new Date() >= game.offer.startDate && new Date() <= game.offer.endDate) {
            price -= (price * game.offer.discount / 100);
        }

        totalAmount += price * item.quantity;
    }
    totalAmount = totalAmount * 100;
    return totalAmount;
};

export const paymentIntent = async (req, res, next) => {
    // const { items } = req.body;
    // use joi 
    const schema = Joi.object({
        items: Joi.array().items(Joi.object({
            _id: Joi.string().required(),
            quantity: Joi.number().required()
        })).required()
    });

    const { error } = schema.validate(req.body);

    if (error) {
        next(error);
    }


    const { items } = req.body;
    try {
        const stripe = new Stripe(STRIPE_SECRET_KEY);

        const amount = await calculateOrderAmount(items);
        console.log(amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.log(err)
        next(err.message)
    }
};


// Joi Schemas
const gameItemSchema = Joi.object({
    game: Joi.string().required(),
    quantity: Joi.number().integer().min(1).required()
});

const paymentDataSchema = Joi.object({
    items: Joi.array().items(gameItemSchema).min(1).required(),
    paymentMethod: Joi.string().required(),
    transactionId: Joi.string().required()
});

export const savePaymentData = async (req, res, next) => {
    try {
        const { error, value } = paymentDataSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // Extract the validated data
        const { items, paymentMethod, transactionId } = value;
        const userId = req.user._id;
        console.log(userId);
        let totalAmount = 0;
        const gameIds = items.map(item => item.game);
        const gameDetails = await GameSchema.find({ '_id': { $in: gameIds } });
        console.log(gameDetails);
        // Process each item
        for (const item of items) {
            const game = gameDetails.find(g => g._id.toString() === item.game);
            if (!game) {
                // return res.status(404).json({ error: `Game not found with ID: ${item.game}` });
                next(createError(404, `Game not found with ID: ${item.game}`));
            }

            let price = game.price;
            let discountApplied = 0;
            if (game.offer.isActive && new Date() >= game.offer.startDate && new Date() <= game.offer.endDate) {
                discountApplied = game.offer.discount;
                price -= (price * discountApplied / 100);
            }
            item.price = price;
            item.discountApplied = discountApplied;

            const unsoldKeys = await LicenseKey.find({ sku: game.sku, isSold: false }).limit(item.quantity);
            console.log(unsoldKeys);
            if (unsoldKeys.length < item.quantity) {
                // return res.status(400).json({ error: `Not enough license keys available for game: ${game.title}` });
                next(createError(400, `Not enough license keys available for game: ${game.title}`));
            }
            // Update item with game title and license keys
            item.gameTitle = game.title;
            item.licenseKeysData = unsoldKeys;
            item.licenseKeys = unsoldKeys.map(key => {
                key.isSold = true;
                key.save();
                return key._id;
            });

            totalAmount += price * item.quantity;
        }

        const newPurchase = new Purchase({
            userId,
            items,
            totalAmount,
            paymentMethod,
            status: 'completed',
            transactionId
        });

        await newPurchase.save();

        // After saving the purchase, send the license code email
        console.log('Sending email');
        console.log(req.user, items);
        const sendEmailResult = await sendLicenseCodeEmail(req.user, items);

        if (!sendEmailResult.success) {
            // Handle the email sending failure
            console.error(sendEmailResult.message, sendEmailResult.error);

            return next(createError(500, 'Purchase saved but email sending failed'));
        }

        return res.status(200).json({ message: 'Purchase saved and email sent', purchase: newPurchase });
    } catch (error) {
        console.error(error);
        next(error);
    }
};