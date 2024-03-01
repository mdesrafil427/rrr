const axios = require('axios');

module.exports = {
  config: {
    name: "fact",
    version: "1.0",
    author: "Rômeo",
    countDown: 0,
    role: 0,
    shortDescription: "Get Random Fact",
    longDescription: "Get Random Fact",
    category: "Study",
    guide: ". fact"
  },

  onStart: async function ({ api, event, args }) {
    const res = await axios.get(`https://api.popcat.xyz/fact`);
var fact = res.data.fact;
return api.sendMessage(`🥀 𝗨𝗡𝗞𝗡𝗢𝗪𝗡 𝗙𝗔𝗖𝗧\n\n┏━━━━━━━━━━━━━❀\n🤔 𝐃𝐢𝐝 𝐘𝐨𝐮 𝐊𝐧𝐨𝐰\n➤ ${fact}\n┗━━━━━━━━━━━━━❀`, event.threadID, event.messageID)
  }
};