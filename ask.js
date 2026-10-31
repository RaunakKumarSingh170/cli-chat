const readline = require('readline');
require('dotenv').config();

const API_KEY = process.env.GROQ_API_KEY;
const URL = "https://api.groq.com/openai/v1/chat/completions";
const messages = [];

async function askAI(prompt) {
  messages.push({
    role: "user",
    content: prompt
  });
  const response = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      model: "openai/gpt-oss-120b",
      messages: messages
    })
  });

  const data = await response.json();
  const reply = data.choices[0].message.content;
  messages.push({
    role: "assistant",
    content: reply
  });
  console.log(reply);
}

const r1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
r1.on("line",async (input) => {
  await askAI(input);
});
