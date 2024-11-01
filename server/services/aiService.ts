import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const OPENAI_API_URL = 'https://api.openai.com/v1/completions';

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
    console.error("Error fetching task suggestions:", error);
    return ["No suggestions available"];
  }
};
