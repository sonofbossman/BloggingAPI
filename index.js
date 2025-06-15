import express from "express";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import requestLogger from "./utils/requestLogger.js";
import logger from "./utils/logger.js";
import "express-async-errors";
import "dotenv/config";
import mongoSanitize from "express-mongo-sanitize";
import { router as authRouter } from "./routes/authRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
import { router as blogRouter } from "./routes/blogRouter.js";
import connectToMongoDB from "./configuration/mongoDBconn.js";
import { notFound as notFoundMiddleware } from "./middleware/not-found.js";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";

const app = express();

// Enable CORS
app.use(cors());

// Enable trust proxy to correctly handle X-Forwarded-For header
app.set("trust proxy", 1);
// Rate limiting security functionality
let limiter = rateLimit({
  max: 1000,
  windowMs: 60 * 60 * 1000,
  message:
    "We have received too many requests from this IP. Please try again after one hour.",
});

app.use("/api", limiter);
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Log HTTP requests
app.use(requestLogger);

// Security middleware
app.use(helmet());

app.use(express.json({ limit: "10kb" }));
// Data sanitization against NoSQL query injection
app.use(mongoSanitize());
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blogs", blogRouter);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
// Use the user routes

// Validate critical environment variables
if (!process.env.SENDGRID_API_KEY) {
  logger.error("Missing SENDGRID_API_KEY in environment variables.");
  process.exit(1); // Exit the process if the API key is missing
}

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectToMongoDB(process.env.MONGO_URI);
    logger.info("CONNECTED TO THE DB...");
    app.listen(port, () =>
      logger.info(`Server is listening on port ${port}...`)
    );
  } catch (err) {
    logger.error("DB Connection Error: ", err);
  }
};

start();
