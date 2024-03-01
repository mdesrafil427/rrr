const axios = require('axios');

const Prefixes = [
  'arched',
  'arc',
  '.arc',
  '/arc',
  '.arched',
];

module.exports = {
  config: {
    name: "ai",
    aliases: [`arc`],
    version: 1.0,
    author: "Rômeo",
    longDescription: "AI",
    category: "CHATGPT",
    guide: {
      en: "{p} questions",
    },
  },
  onStart: async function () {},
  onChat: async function ({ api, event, args, message }) {
    try {
      
      const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
      if (!prefix) {
        return; // Invalid prefix, ignore the command
      }
      const prompt = event.body.substring(prefix.length).trim();
   if (!prompt) {
        await message.reply("🤖 𝗔𝗿𝗰𝗵𝗲𝗱:\n\nHello! How can I assist you today.");
        return;
      }


      const response = await axios.get(`https://AryanAPI.replit.app/gpt?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;

 
    await message.reply(`🤖 𝗔𝗿𝗰𝗵𝗲𝗱:\n\n${answer}`);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};