const axios = require("axios");

module.exports = {
  config: {
    name: "picklines",
    version: "1.0",
    author: "Rômeo",
    countDown: 0,
    role: 0,
    shortDescription: "Get pickup lines",
    longDescription: {
      en: "Get random pickup lines.",
    },
    category: "fun",
    guide: {
      en: "{prefix}pickuplines",
    },
  },

  onStart: async function ({ api, event }) {
    try {
      const response = await axios.get("https://api.popcat.xyz/pickuplines");
      const { pickupline } = response.data;
      const message = `📝 𝗥𝗔𝗡𝗗𝗢𝗠 𝗣𝗜𝗖𝗞-𝗨𝗣-𝗟𝗜𝗡𝗘𝗦\n┏━━━━━━━━━━━━❀\n🥰 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐘𝐨𝐮𝐫 𝐑𝐚𝐧𝐝𝐨𝐦 𝐏𝐢𝐜𝐤𝐮𝐩𝐥𝐢𝐧𝐞𝐝\n➤💘 ${pickupline}\n┗━━━━━━━━━━━━❀`;
      return api.sendMessage(message, event.threadID);
    } catch (error) {
      console.error(error);
    }
  },
};