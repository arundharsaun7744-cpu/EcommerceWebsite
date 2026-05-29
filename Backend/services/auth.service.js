// auth.service.js

const twilio = require("twilio");
const { Resend } = require("resend");
const crypto = require("crypto");
const db = require("../db/mysql");

const resend = new Resend(process.env.RESEND_API_KEY);

const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

const isPhone = (value) => {
  if (!value || typeof value !== "string") return false;
  return /^\+?[0-9\s-()]{7,20}$/.test(value.trim());
};

const normalizePhone = (phone) => {
  if (!phone) return null;

  phone = phone.trim().replace(/[\s-()]/g, "");

  if (phone.startsWith("+")) return phone;
  if (/^\d{10}$/.test(phone)) return `+91${phone}`;

  return phone;
};

const hasResend = Boolean(process.env.RESEND_API_KEY);

const hasTwilio = Boolean(
  process.env.TWILIO_ACCOUNT_SID &&
    process.env.TWILIO_AUTH_TOKEN &&
    process.env.TWILIO_PHONE_NUMBER
);

let twilioClient;

if (hasTwilio) {
  console.log("✅ Using REAL Twilio client.");

  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} else {
  console.warn("⚠️ Using MOCK Twilio client.");

  twilioClient = {
    messages: {
      create: async ({ body, to }) => {
        console.log(`[MOCK SMS] To: ${to}, Message: ${body}`);
      },
    },
  };
}

if (hasResend) {
  console.log("✅ Using REAL Resend client.");
} else {
  console.warn("⚠️ Using MOCK Resend email.");
}

const otpStore = {};

const sendEmailOtp = async ({ email, otp }) => {
  if (hasResend) {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your OTP Code",
      html: `<p>Your OTP is <b>${otp}</b>. Valid for 5 minutes.</p>`,
    });

    console.log("✅ Email OTP sent:", email);
  } else {
    console.log(`[MOCK EMAIL] To: ${email}, OTP: ${otp}`);
  }
};

const sendPhoneOtp = async ({ phone, otp }) => {
  await twilioClient.messages.create({
    body: `Your OTP is ${otp}. Valid for 5 minutes.`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phone,
  });

  console.log("✅ Phone OTP sent:", phone);
};

const generateAndSendOtp = async (identifier) => {
  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  // ✅ EMAIL FIRST
  if (isEmail(identifier)) {
    const email = identifier.toLowerCase();

    otpStore[email] = { otp, expiresAt };

    await sendEmailOtp({ email, otp });

    return { key: email, type: "email" };
  }

  // ✅ PHONE NEXT
  if (isPhone(identifier)) {
    const phone = normalizePhone(identifier);

    if (!phone) {
      throw new Error("Could not normalize phone number.");
    }

    otpStore[phone] = { otp, expiresAt };

    await sendPhoneOtp({ phone, otp });

    return { key: phone, type: "phone" };
  }

  throw new Error("Invalid email or phone identifier format.");
};

const checkUserExists = async ({ identifier, type }) => {
  if (type === "EMAIL" || isEmail(identifier)) {
    const email = identifier.toLowerCase();

    const user = await db("login_users")
      .where({ email })
      .first();

    return Boolean(user);
  }

  if (type === "PHONE" || isPhone(identifier)) {
    const phone = normalizePhone(identifier);

    const user = await db("login_users")
      .where({ phonenumber: phone })
      .first();

    return Boolean(user);
  }

  return false;
};

exports.sendOtpService = async ({ identifier, type }) => {
  const [userExists, otpResult] = await Promise.all([
    checkUserExists({ identifier, type }),
    generateAndSendOtp(identifier),
  ]);

  return {
    success: true,
    key: otpResult.key,
    type: otpResult.type,
    userExists,
  };
};

exports.verifyOtpService = async ({ key, otp, email, phone }) => {
  console.log("Verify OTP received:", { key, otp, email, phone });

  let lookupKey = key.trim();

  if (isEmail(lookupKey)) lookupKey = lookupKey.toLowerCase();
  if (isPhone(lookupKey)) lookupKey = normalizePhone(lookupKey);

  const stored = otpStore[lookupKey];

  if (!stored || stored.otp !== otp || stored.expiresAt < Date.now()) {
    throw new Error("Invalid or expired OTP");
  }

  delete otpStore[lookupKey];

  const primaryIsPhone = isPhone(lookupKey);

  const finalPhone = primaryIsPhone ? lookupKey : normalizePhone(phone);
  const finalEmail = primaryIsPhone
    ? email
      ? email.toLowerCase()
      : null
    : lookupKey;

  if (!isEmail(finalEmail) || !isPhone(finalPhone)) {
    throw new Error(
      "Missing required profile detail (both valid email and phone are mandatory)."
    );
  }

  const existingUser = await db("login_users")
    .where({ phonenumber: finalPhone })
    .orWhere({ email: finalEmail })
    .first();

  let sessionToken;

  const dbPayload = {
    email: finalEmail,
    phonenumber: finalPhone,
    is_profile_completed: true,
    updated_at: new Date(),
  };

  if (existingUser) {
    sessionToken = existingUser.id;

    await db("login_users")
      .where({ id: sessionToken })
      .update(dbPayload);

    console.log("🔄 Existing user updated:", sessionToken);
  } else {
    sessionToken = crypto.randomUUID();

    await db("login_users").insert({
      id: sessionToken,
      ...dbPayload,
      created_at: new Date(),
    });

    console.log("🆕 New user created:", sessionToken);
  }

  const user = await db("login_users")
    .where({ id: sessionToken })
    .first();

  return {
    success: true,
    message: "OTP verified & profile synced successfully.",
    sessionToken,
    user: {
      id: user.id,
      email: user.email,
      phone: user.phonenumber,
    },
  };
};

exports.getUserProfile = async (u_id) => {
  const user = await db("login_users")
    .where({ id: u_id })
    .first();

  return user;
};