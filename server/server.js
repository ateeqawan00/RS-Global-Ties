import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { rawJsonMiddleware } from "./middleware/webhook.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import http from "http";
import { initSocketIO } from "./utils/GlobalMap.js";
import { init } from "./utils/socket.js";
import bodyParser from "body-parser";
import adminRoutes from "./routes/adminRoutes.js";
import Login from "./routes/Login.js";
import subscriptionRoute from "./routes/subscriptionRoutes.js";
import RequirementRoute from "./routes/requirementRoute.js";
import companyProfileRoutes from "./routes/companyProfilesRoutes.js";
import productDetailRoutes from "./routes/productDetailRoutes.js";
import ChatRoute from "./routes/ChatRoute.js";
import MessagesRoutes from "./routes/MessagesRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import CaurasoulRoutes from "./routes/CaurasoulRoutes.js";
import UserProfilesRotes from "./routes/UserProfilesRotes.js";
import businessRoute from "./routes/businessRoutes.js";
import servicesRoute from "./routes/servicesRoute.js";
import { webhookHandler } from "./controllers/subscription.js";
import CatagoryRoute from "./routes/CatagoryRoutes.js"
import subcatagoryRoute from "./routes/subcatagoryRoutes.js"
import successStoriesRoutes from "./routes/successStoriesRoutes.js"
import ProductListRoutes from "./routes/ProductListRoutes.js"
import ServiveProviderRoutes from "./routes/ServiceProviderRoutes.js"


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
dotenv.config();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Adjust server selection timeout to 30 seconds
    });
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

const allowedOrigins = [
  "http://localhost:5174",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://rsglobalties.com",
];

//new commits

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);




app.use(
  bodyParser.json({
    verify: function (req, res, buf) {
      req.rawBody = buf;
    },
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.raw({ type: "application/json" }));

app.use("/api", Login);
app.use("/api/admin", adminRoutes);
app.use("/api/subscribe", subscriptionRoute);
app.use("/api/Requirements", RequirementRoute);
app.use("/api/companyProfile", companyProfileRoutes);
app.use("/api/product", productDetailRoutes);
app.use("/api/chat/", ChatRoute);
app.use("/api/Message", MessagesRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/Caurasoul", CaurasoulRoutes);
app.use("/api/Profile", UserProfilesRotes);
app.use("/api/business", businessRoute);
app.use("/api/service", servicesRoute);
app.use("/api/Catagory", CatagoryRoute);
app.use("/api/subcatagory",subcatagoryRoute)
app.use("/api/successstories",successStoriesRoutes)
app.use("/api/ProductList",ProductListRoutes)
app.use("/api/ServiveProvider",ServiveProviderRoutes)



app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.responseMessage || "Something went wrong!";
  return res.status(errorStatus).json({ error: errorMessage });
});

const PORT = process.env.PORT || 3000;
export const server = http.createServer(app);

init(server);

initSocketIO(server);


// mongoose.connection.on('connected', async () => {
//   try {
//     const db = mongoose.connection.db;
//     const indexName = 'sessionId_1';

//     // Drop the unique constraint from the index
//     await db.collection('subscriptions').dropIndex(indexName);

//     console.log(`Unique constraint dropped from ${indexName} successfully.`);

//   } catch (error) {
//     console.error('Error dropping unique constraint:', error);
//   } finally {
//     // Close the connection
//     mongoose.connection.close();
//   }
// });

server.listen(PORT, () => {
  connect();
  console.log(`Server is running on port ${PORT}`);
});
