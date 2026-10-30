//hi
require('dotenv').config();

const API_KEY = process.env.GROQ_API_KEY;
const URL = "https://api.groq.com/openai/v1/chat/completions";

async function askAI(prompt) {
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    })
  });

  const data = await response.json();
  console.log(data.choices[0].message.content);
}

askAI(process.argv[2]);