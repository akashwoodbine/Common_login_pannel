import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
// import db from "./db.js";


dotenv.config();

const app = express();

// ✅ Middleware
app.use(cors());          // Allow React frontend to connect
app.use(express.json());  // Parse JSON request bodies

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Backend is running successfully!");
});

// ✅ Example: Fetch all users
app.get("/api/users", (req, res) => {
  db.query("SELECT * FROM users", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json(results);
  });
});

// ✅ Example: Add a new user
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
  db.query(sql, [name, email], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Insert failed" });
    }
    res.status(201).json({ message: "User added successfully!" });
  });
});

// OTP Generation Logic Starts below
let otpStore = {}; // { email: { otp: '123456', expires: 1234567890 } }

// ✅ Send OTP
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email not entered !" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = Date.now() + 5 * 60 * 1000; // 5 min validity
  otpStore[email] = { otp, expires };

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Pragati Setu Team" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Password Reset for Pragati Setu",
      text: ` You have sent a password reset request, for which your OTP is ${otp}. It is valid for 5 minutes.`,
    });

    res.json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

// ✅ Verify OTP and Reset Password
app.post("/verify-otp", (req, res) => {
  const { email, otp, newPassword } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: "No OTP sent" });
  if (record.expires < Date.now())
    return res.status(400).json({ message: "OTP expired" });
  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  // ✅ OTP is valid — update password in your DB here
  // For now, just simulate:

  console.log(`Password for ${email} changed to ${newPassword}`);
  delete otpStore[email];

  res.json({ message: "Password reset successful!" });
});

// --- GLOBAL PASSWORD STORE ---
let default_password = "123456";

// ✅ Endpoint to get the password
app.get("/api/password", (req, res) => {
  res.json({ password: default_password });
});

// ✅ Endpoint to update the password
app.post("/api/password", (req, res) => {
  const { newPassword } = req.body;
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ message: "Invalid password" });
  }
  default_password = newPassword;
  console.log(`🔑 Default password changed to: ${default_password}`);
  res.json({ message: "Password updated successfully!" });
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

