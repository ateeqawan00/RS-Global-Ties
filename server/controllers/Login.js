


import jwt from 'jsonwebtoken';
import Joi from 'joi';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { sendOTPEmail } from './Email/sendOTPEmal.js';
import { createError } from '../utils/createError.js';
import { sendOTPEmailHelp } from './Email/sendOTPEmal.js';
import dotenv from 'dotenv';
import { cookieOptions, generateJWT, userDataProperties } from '../utils/authUtilities.js';
import axios from 'axios';
import cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { AUTH_REDIRECT } from '../config/config.js';
dotenv.config();
const jwtKey = process.env.jwtKey;
import Admin from '../models/Admin.js';
const salt = bcrypt.genSaltSync(10);



// export const SignIn = async (req, res, next) => {
//     const value = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().min(3).required()
//     }).validate(req.body)
//     if (value.error) {
//         next(createError(400, value.error.details[0].message))
//     }
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email: email.toLowerCase() });

//         if (!user) return next(createError(400, "User not found!"));

//         if (!user.password && (user.googleId || user.facebookId)) {
//             return next(createError(400, "Please use your Google/Facebook account to login or set a local password first."));
//         }

//         const isPasswordCorrect = bcrypt.compareSync(password, user.password);
//         if (!isPasswordCorrect) return next(createError(400, "Wrong credentials!"));

//         const token = jwt.sign({ ...userDataProperties(user) }, jwtKey, { expiresIn: '30d' });
//         return res.cookie("accessToken", token, cookieOptions()).status(200).json({ success: true, message: "Login Successful", userData: user, token });

//     } catch (err) {
//         next(err);
//     }
// }
export const SignIn = async (req, res, next) => {
    const value = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required()
    }).validate(req.body);
    if (value.error) {
        return next(createError(400, value.error.details[0].message));
    }

    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            user = await Admin.findOne({ email: email.toLowerCase() });
        }

        if (!user) {
            return next(createError(400, "User not found!"));
        }

        const isPasswordCorrect = bcrypt.compareSync(password, user.password);
        if (!isPasswordCorrect) {
            return next(createError(400, "Wrong credentials!"));
        }

        const token = jwt.sign({ ...userDataProperties(user) }, jwtKey, { expiresIn: '30d' });
        
        // Include role information in the response
        const role = user instanceof Admin ? 'admin' : 'user';

        res.cookie("accessToken", token, cookieOptions()).status(200).json({ success: true, message: "Login Successful", userData: user, token, role });

    } catch (err) {
        next(err);
    }
};


// export const getUrlData = async (req, res) => {
//     const { url } = req.body;

//     if (!url) {
//         return res.status(400).send('URL is required');
//     }

//     try {
//         const response = await axios.get(url);
//         const $ = cheerio.load(response.data);

//         // Extract and clean text from the HTML
//         const text = $('body').text()
//                               .replace(/\s\s+/g, ' ') // Replace multiple spaces with a single space
//                               .trim(); // Remove leading and trailing spaces

//         res.send({ text: text });
//     } catch (err) {
//        console.log(err);
//        res.status(400).send('Invalid URL');
//     }
// }
export const getUrlData = async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // Launch Puppeteer browser
        const browser = await puppeteer.launch({
            headless: 'new', // Opting in early to the new headless mode
            args: ['--no-sandbox', '--disable-setuid-sandbox'] // Recommended args for running in a non-interactive environment
        });

        const page = await browser.newPage();
        await page.goto(url, { waitUntil: 'networkidle2' });

        // Extract only the text content from the body or specific elements
        const textContent = await page.evaluate(() => {
            // You can modify this selector to be more specific if needed
            return document.querySelector('body').innerText;
        });

        // Close the browser
        await browser.close();

        res.send({ content: textContent });
    } catch (err) {
        console.log(err);
        res.status(400).send('Invalid URL');
    }
};




export const signUp = async (req, res, next) => {
    const value = Joi.object({
        fullName: Joi.string().required(),
        email: Joi.string().email().required(),
        companyName: Joi.string().required(),
        country: Joi.string().required(),
        registrationNumber: Joi.string().required(),
        mobileNumber: Joi.string().required(),
        password: Joi.string().min(3).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
            'any.only': 'Passwords do not match',
        }),
        accountType: Joi.string().valid('Buyer', 'Supplier', 'Service Provider').required(),
        businessType: Joi.string().valid('Sole Proprietor', 'Partnership', 'Company').required(),
    }).validate(req.body);

    if (value.error) {
        next(createError(400, value.error.details[0].message));
    }

    try {
        const { fullName, email, companyName, country, registrationNumber, mobileNumber, password, confirmPassword, accountType, businessType } = req.body;

      
        let user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            if (!user.password) {
                
                user.password = bcrypt.hashSync(password, salt);
            
                user.confirmPassword = bcrypt.hashSync(confirmPassword, salt);
                await user.save();
            } else {
                return next(createError(400, "Email already exists"));
            }
        } else {
        
            const hash = bcrypt.hashSync(password, salt);
      
            const confirmHash = bcrypt.hashSync(confirmPassword, salt);
            user = new User({
                fullName,
                email: email.toLowerCase(),
                companyName,
                country,
                registrationNumber,
                mobileNumber,
                password: hash,
                confirmPassword: confirmHash,
                accountType,
                businessType,
                isCompanyVerified: false,
            });
            await user.save();
        }

        const token = jwt.sign({ ...userDataProperties(user) }, jwtKey, { expiresIn: '30d' });
        return res.cookie("accessToken", token, cookieOptions()).status(200).json({ success: true, userData: user, token });

    } catch (err) {
        next(err);
    }
};



export const forgetPasswordStepOne = async (req, res, next) => {
    const value = Joi.object({
        email: Joi.string().email().required()
    }).validate(req.body)
    if (value.error) {
        // return res.status(400).json({ success: false, error: value.error.details[0].message })
        next(createError(400, value.error.details[0].message))
    }
    console.log(jwtKey)
    try {
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            const otp = Math.floor(1000 + Math.random() * 9000);
            const token = jwt.sign({
                id: user._id,
                otp,
                isVerified: false,
            }, jwtKey, { expiresIn: '30m' })

            await sendOTPEmail(req.body.email, otp)
            return res.status(200).json({ success: true, message: "OTP sent to your email", token })
        }
        else {
            next(createError(400, "Email not found!"))
        }
    }
    catch (err) {
        next(err)
    }

}

export const forgetPasswordStepTwo = async (req, res, next) => {
    // save token in local storag or any other way and send it in body
    const value = Joi.object({
        token: Joi.string(),
        otp: Joi.number().required()
    }).validate(req.body)
    if (value.error) {
        next(createError(400, value.error.details[0].message))
    }

    try {
        const { otp, token } = req.body
        const decoded = jwt.verify(token, jwtKey)
        // type of decoded.otp is?

        console.log(typeof decoded.otp + " " + typeof otp)
        if (String(decoded.otp) === String(otp)) {

            const newToken = jwt.sign({
                id: decoded.id,
                isVerified: true
            }, jwtKey, { expiresIn: '30d' });
            return res.status(200).json({ success: true, message: "OTP verified", token: newToken })
        }
        else {
            next(createError(400, "Wrong OTP"))
        }
    }
    catch (err) {
        next(err)
    }

}


export const resetPassword = async (req, res, next) => {
    const value = Joi.object({
        token: Joi.string(),
        password: Joi.string().min(3).required(),
    }).validate(req.body)
    if (value.error) {
        next(createError(400, value.error.details[0].message))
    }

    try {
        const { password, token } = req.body
        const hash = bcrypt.hashSync(password, salt);
        // const decoded = jwt.verify(req.headers.authorization, jwtKey)
        // decode the token
        const decoded = jwt.verify(token, jwtKey)
        console.log(decoded)

        if (!decoded.isVerified) {
            next(createError(400, "Please verify your email with OTP first"));
            return;
        }
        const user = await User.findOneAndUpdate({ _id: decoded.id }, { password: hash }, { new: true })
        if (user) {
            return res.status(200).json({ success: true, message: "Password reset successfully" })
        }
        else {
            next(createError(400, "User not found"))
        }
    }
    catch (err) {
        next(err)
    }


}




export const logout = async (req, res, next) => {
    res
        .clearCookie("accessToken", {
            sameSite: "none",
            secure: true,
        })
        .status(200)
        .send("User has been logged out.");
};



export const handleGoogleCallback = async (req, res, next) => {
    try {
        const token = jwt.sign({ ...userDataProperties(req.user) }, jwtKey, { expiresIn: '30d' });
        const user = req.user;

        // Set or update googleId field
        user.googleId = req.user.id;

        await user.save();

        // return res.cookie("accessToken", token, cookieOptions()).redirect( `${AUTH_REDIRECT}`);
        const authResponse = {
            success: true,
            message: "Login Successful",
            userData: req.user,
            token,
        };

        // return res.cookie("accessToken", token, cookieOptions()).redirect( `${AUTH_REDIRECT}`);
        return res.cookie("accessToken", token, cookieOptions()).redirect(`${AUTH_REDIRECT}?userData=${encodeURIComponent(JSON.stringify(authResponse))}`);
    } catch (err) {
        next(err);
    }
};

export const handleFacebookCallback = async (req, res, next) => {
    try {
        const token = jwt.sign({ ...userDataProperties(req.user) }, jwtKey, { expiresIn: '30d' });
        const user = req.user;

        // Set or update facebookId field
        user.facebookId = req.user.id;

        await user.save();

        // Create the response data
        const authResponse = {
            success: true,
            message: "Login Successful",
            userData: req.user,
            token,
        };

        // return res.cookie("accessToken", token, cookieOptions()).redirect( `${AUTH_REDIRECT}`);
        return res.cookie("accessToken", token, cookieOptions()).redirect(`${AUTH_REDIRECT}?userData=${encodeURIComponent(JSON.stringify(authResponse))}`);
    } catch (err) {
        next(err);
    }
};


const helpQuerySchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    query: Joi.string().required(),
  });
  
  export const helpApi = async (req, res, next) => {
    try {
      // Validate request body against schema
      const { error } = helpQuerySchema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { name, email, query } = req.body;
  
      // Log the query (you can save it to a database as well)
      console.log(`New Help Query from ${name} (${email}): ${query}`);
  
      // Send help query email to admin
      await sendOTPEmailHelp(name, email, query);
      console.log('Help query email sent to admin');
  
      res.status(200).json({ message: 'Query received successfully!' });
    } catch (error) {
      console.error('Error processing help query:', error);
      res.status(500).json({ error: 'Failed to process help query' });
    }
  };