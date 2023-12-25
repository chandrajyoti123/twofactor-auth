import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import User from "./modules/SignUp.js";
import speakeasy from "speakeasy";
import nodemailer from "nodemailer";
import path from "path"

const app = express();
app.use(express.json());
const __dirname = path.resolve();

// ---mongodb connected ----

const connectMongodb = async () => {
  const response = await mongoose.connect(process.env.MONGODB_URI);

  if (response) {
    console.log("mongodb  added successfully");
  }
};
connectMongodb();


app.post("/api/2fauth/singup", async (req, res) => {
  const { username, email, password } = req.body;
  const secret = speakeasy.generateSecret();
  const newuser = new User({
   username:username,
    email:email,
    password:password,
    secret:secret.base32,
  });
  const saveduser = await newuser.save();
  
  let transporter = await nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: 'chet.kunde@ethereal.email',
      pass: '91Gjqqrm7Qva6Fw2nM'
    },
  });

    let mailOptions = await transporter.sendMail({
    from: '"chandrajyoti adil " <chandrajyoti@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Your Two-Factor Authentication Secret Key", // Subject line
    text: `Your secret key is: ${secret.base32}`, // plain text body
  });

  res.json({
    success: true,
    data: saveduser,
    message: "user signed successfully",
    });


});

  app.post("/api/2af/login", async (req, res) => {
  const { email, password, token } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "email is required",
    });
  }
  if (!password) {
    return res.json({
      success: false,
      message: "password is required",
    });
  }

  const finduser = await User.findOne({
    email: email,
    password:password,
    secret:token ,
  });

  if (!finduser) {
    return res.json({
      success: false,
      message: "invalid Credential",
    });
  }
  return res.json({
    success: true,
    data: finduser,
    message: "user logined successfully",
  });

 
});

     if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));

     app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
     })
   }

  const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);

});
