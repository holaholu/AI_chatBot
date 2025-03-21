
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import OpenAIResponse from "./openai.js";


const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "index.html"));
});

app.post("/getChatbotResponse", async (req, res) => {
  const userMessage = req.body.userMessage;

  // Use OpenAI API to generate a response
  const chatbotResponse = await OpenAIResponse.generateResponse(userMessage);

  // Send the response back to the client
  res.json({ chatbotResponse });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
