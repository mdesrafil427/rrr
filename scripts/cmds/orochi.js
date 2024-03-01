const axios = require('axios');

const Prefixes = [
  'shiro',
  'Shiro',
  '.shiro',
  '/shiro',
  '@shiro',
];

module.exports = {
  config: {
    name: "shiro",
    aliases: [`shiro chan`],
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
        await message.reply("🤖 𝗢𝗿𝗼𝗰𝗵𝗶:\n\nHello! How can I assist you today.");
        return;
      }


      const response = await axios.get(`https://orochixyz.replit.app/orochi?prompt=${encodeURIComponent(prompt)}`);
      const answer = response.data.answer;


    await message.reply(`🤖 𝗢𝗿𝗼𝗰𝗵𝗶:\n\n${answer}`);

    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};