// auth.service.js

const twilio = require("twilio");
const nodemailer = require("nodemailer");
const db = require("../db/mysql"); 


const isEmail = (value) => /\S+@\S+\.\S+/.test(value);


const isPhone = (value) => {
    if (!value || typeof value !== "string") return false;
    
    return /^\+?[0-9\s-()]{7,20}$/.test(value.trim()); 
};

const normalizePhone = (phone) => {
    if (!phone) return null;
    phone = phone.trim().replace(/[\s-()]/g, ''); 
    if (phone.startsWith("+")) return phone;
    if (/^\d{10}$/.test(phone)) return `+91${phone}`; 
    return phone;
};


const useRealServices = process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.EMAIL_USER;

let twilioClient;
let mailTransporter;

if (useRealServices) {
    console.log("Using REAL Twilio and Nodemailer clients.");
    
    
    twilioClient = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );
    
    
  mailTransporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
});

} else {
    console.warn("Using MOCK Twilio/Nodemailer clients. Set environment variables for real functionality.");
    
    
    twilioClient = {
        messages: {
            create: async ({ body, to }) => {
                console.log(`[MOCK SMS] To: ${to}, Message: ${body}`);
            }
        }
    };
    
    mailTransporter = {
        sendMail: async ({ to, subject, html }) => {
            console.log(`[MOCK EMAIL] To: ${to}, Subject: ${subject}, Body: ${html}`);
        }
    }
}

const otpStore = {};  //  [+916385221009] = {1212 , 22344} , 

const generateAndSendOtp = async (identifier) => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; 
    let key;

    if (isPhone(identifier)) {
        let phone = identifier.trim();
        phone = normalizePhone(phone);

        if (!phone) throw new Error("Could not normalize phone number.");

        key = phone;
        otpStore[key] = { otp, expiresAt };

        await twilioClient.messages.create({
            body: `Your OTP is ${otp}. Valid for 5 minutes.`,
            from: process.env.TWILIO_PHONE_NUMBER, 
            to: phone,
        });

        return { key, type: "phone" };
    }

    if (isEmail(identifier)) {
        const email = identifier.toLowerCase();
        key = email;
        otpStore[key] = { otp, expiresAt };

        await mailTransporter.sendMail({
            from: process.env.EMAIL_USER || "mock@example.com",
            to: email,
            subject: "Your OTP Code",
            html: `<p>Your OTP is <b>${otp}</b></p>`,
        });

        return { key, type: "email" };
    }

    throw new Error("Invalid email or phone identifier format.");
};


exports.sendOtpService = async ({ identifier, type }) => {
    
    let userExists = false;  
    let identifierForDb = identifier;  

    if (type === "PHONE") {
        identifierForDb = normalizePhone(identifier);

        const user = await db("login_users").where({ phonenumber: identifierForDb }).first();
        if (user) userExists = true;
    } else if (type === "EMAIL") {
        identifierForDb = identifier.toLowerCase();
        const user = await db("login_users").where({ email: identifierForDb }).first();
        if (user) userExists = true; 
    }

  
    const { key } = await generateAndSendOtp(identifier);
    
    return {
        success: true,
        key: key, 
        userExists: userExists, 
    };
};

const crypto = require("crypto");

exports.verifyOtpService = async ({ key, otp, email, phone }) => {
    console.log("Verify OTP received:", { key, otp, email, phone });

    // 1. Normalize Keys
    let lookupKey = key.trim();
    if (isEmail(lookupKey)) lookupKey = lookupKey.toLowerCase();
    if (isPhone(lookupKey)) lookupKey = normalizePhone(lookupKey);

    // 2. Validate OTP from Store
    const stored = otpStore[lookupKey];
    if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
        throw new Error("Invalid or expired OTP");
    }

    delete otpStore[lookupKey];

    // 3. Determine Final Email & Phone
    const primaryIsPhone = isPhone(lookupKey);
    let finalPhone = primaryIsPhone ? lookupKey : normalizePhone(phone);
    let finalEmail = primaryIsPhone ? (email ? email.toLowerCase() : null) : lookupKey;

    if (!isEmail(finalEmail) || !isPhone(finalPhone)) {
        throw new Error("Missing required profile detail (both valid email and phone are mandatory).");
    }

    // 🔥 FIX: Email athava Phone Number — ethu match ayalum aa row select cheyyum!
    const existingUser = await db("login_users")
        .where({ phonenumber: finalPhone })
        .orWhere({ email: finalEmail }) 
        .first();

    let sessionToken;
    let dbPayload = {
        email: finalEmail,
        phonenumber: finalPhone,
        is_profile_completed: true,
        updated_at: new Date()
    };

    if (existingUser) {
        // ✅ Ethu match ayalum puthiya row undakkathe, ulla row-ilekku data merge cheyyunnu
        sessionToken = existingUser.id;
        
        await db("login_users")
            .where({ id: sessionToken })
            .update(dbPayload);
            
        console.log("🔄 Existing User Matched via Phone or Email! Row updated for ID:", sessionToken);
    } else {
        // ✅ Randum thirichu arinjillebkil mathram puthiya UUID undakkum
        sessionToken = crypto.randomUUID();
        dbPayload.id = sessionToken;
        dbPayload.created_at = new Date();
        
        await db("login_users").insert(dbPayload);
        console.log("🆕 Purely New User! Inserted new row with ID:", sessionToken);
    }

    // Final database record fetch cheyyan
    const user = await db("login_users").where({ id: sessionToken }).first();

    return {
        success: true,
        message: "OTP verified & profile synced successfully.",
        sessionToken: sessionToken, 
        user: {
            id: user.id,
            email: user.email,
            phone: user.phonenumber
        }
    };
};


exports.getUserProfile = async (u_id) => {
    const user = await db("login_users")
        .where({ id: u_id })
        .first(); 

    return user;
};  