import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import http from "http";
import axios from "axios";

const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5173', 
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// const makeRequestWithRetry = async (url, options, retries = 3, delayMs = 1000) => {
//   try {
//     return await axios.post(url, options);
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       console.log(`Rate limit exceeded. Retrying in ${delayMs}ms...`);
//       await delay(delayMs);
//       return makeRequestWithRetry(url, options, retries - 1, delayMs * 2);
//     } else {
//       throw error;
//     }
//   }
// };

// app.post('/api/chat', async (req, res) => {
//   const userMessage = req.body.message;
//   const url = 'https://api.openai.com/v1/chat/completions';
//   const options = {
//     model: 'gpt-3.5-turbo-16k',
//     messages: [{ role: 'user', content: userMessage }],
//     max_tokens: 150,
//     n: 1,
//     stop: null,
//     temperature: 0.7,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
//     },
//   };

//   try {
//     const response = await makeRequestWithRetry(url, options);
//     const aiMessage = response.data.choices[0].message.content.trim();
//     res.json({ message: aiMessage });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Error processing your request');
//   }
// });

const httpServer = http.createServer(app);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to MongoDB!");

    const port = process.env.PORT || 5000;
    httpServer.listen(port, () => {
      console.log(`Server is listening on port: ${port}`);
    });
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

startServer();
