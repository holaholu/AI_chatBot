import dotenv from "dotenv";
import OpenAI from "openai";
dotenv.config();
const client = new OpenAI({ apiKey: process.env.apiKey });

class OpenAIResponse {
  static async generateResponse(userMessage) {
    

    const responseData = await client.chat.completions.create({
      model: "gpt-4o",

      messages: [
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

   
   

    // Check if choices array is defined and not empty
    if (
      responseData.choices &&
      responseData.choices.length > 0 &&
      responseData.choices[0].message
    ) {
      return responseData.choices[0].message.content;
    } else {
      // Handle the case where choices array is undefined or empty
      console.error("Error: No valid response from OpenAI API");
      return "Sorry, I couldn't understand that.";
    }
  }
}

export default OpenAIResponse;
