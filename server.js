import express from "express";

// import bodyParser from "body-parser";

import mongoose from "mongoose";
import dotenv from "dotenv";

import cookieParser from "cookie-parser";
import cors from "cors";

import authRoute from "./routes/auth.route.js";
import userRoute from "./routes/user.route.js";
import gigRoute from "./routes/gig.route.js";
import orderRoute from "./routes/order.route.js";
import conversationRoute from "./routes/conversation.route.js";
import messageRoute from "./routes/message.route.js";
import reviewRoute from "./routes/review.route.js";


const app = express();
dotenv.config();
// mongoose.set('strictQuery', true);

/*
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.log(error);
    }
}
*/
const connectDB = async () => {
    try {
      await mongoose.connect(
        // process.env.MONGODB_URL, 
        'mongodb+srv://testinglife001:h9jMGbE1h0B1Vrz2@myapptwo.y3ua3.mongodb.net/?retryWrites=true&w=majority&appName=myapptwo',
      {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
      });
      // console.log("Connected to MongoDB!");
      // console.log('MongoDB connected successfully');
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error('MongoDB connection error:', error);
      console.log(error);
      process.exit(1);
    }
  };


// app.use(cors({ 
//    origin: ["http://localhost:5173"], 
//    credentials: true,
//    method: ["GET", "POST", "PUT", "DELETE"],
// })); 
// app.use(cors());
// app.use(cors({
//       origin: 'http://localhost:9000'  //to be changed later to vercel url 8800
//    origin: 'http://localhost:8800'
// }));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.json());
// app.use(cookieParser());

const corsConfig = {
  // origin: process.env.Client_URL,
  origin: ["https://myrealapp-froontend.vercel.app"], 
  credentials: true,
  method: ["GET", "POST", "PUT", "DELETE"],
};

app.options("", cors(corsConfig));
app.use(cors(corsConfig));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

 app.get("/api", (req, res) => {
   res.json("Hi Hey");
 }) 

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/gigs", gigRoute);
app.use("/api/orders", orderRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/reviews", reviewRoute);

connectDB();


// app.get("/", (req, res) => {
//   res.json("Hi Hey");
// }) 

// app.get("/v", (req, res) => {
//  res.send("Hello World");
// });

 app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";  
    return res.status(errorStatus).send(errorMessage).json("Hello");
 });
  
const port = process.env.PORT || 8800;

app.listen(port, () => {
    // connect();
    // connectDB();
    // console.log("Backend server is running!");
    // console.log(`Server is running on port ${port}`);
    try {
      console.log(`Server is running on port ${process.env.PORT}`);
    } catch (error) {
      console.log(error);
    }
})



// testinglife001
// h9jMGbE1h0B1Vrz2
// mongodb+srv://testinglife001:<db_password>@myapptwo.y3ua3.mongodb.net/?retryWrites=true&w=majority&appName=myapptwo


