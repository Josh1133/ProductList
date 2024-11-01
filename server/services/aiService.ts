import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = process.env.OPENAI_API_URL;

export const getTaskSuggestions = async (keyword: string): Promise<string[]> => {
  if (!OPENAI_API_KEY) throw new Error("OpenAI API key is missing");

  try {
    const response = await axios.post(
      OPENAI_API_URL,
      {
        model: "gpt-3.5-turbo",
        prompt: `Suggest words related to ${keyword}`,
        max_tokens: 50,
        n: 5,
        stop: ["\n"]
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        }
      }
    );
    const suggestions = response.data.choices.map((choice: any) => choice.text.trim());
    return suggestions;
  } catch (error) {
    // This is in place because my OpenAi limit has been reached so it returns nothing so this is back up
    const suggestions = {
      "study": ["Study JavaScript", "Review TypeScript", "Read React docs"],
      "workout": ["Go to the gym", "Do yoga", "Run 5km"],
      "shopping": ["Buy groceries", "Get new clothes", "Order online"]
    };
    console.error("Error fetching task suggestions:", error);
    return suggestions[keyword.toLowerCase()] || ["No suggestions available"];
  }
};