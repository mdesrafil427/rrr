const axios = require('axios');

module.exports = {
  config: {
    name: 'random',
    version: '1.0',
    author: 'Orochi Team',
    role: 0,
    category: 'utility',
    shortDescription: {
      en: 'Generate a random number within a given range'
    },
    longDescription: {
      en: 'Generate a random number within a given range'
    },
    guide: {
      en: '{pn} <min> <max>'
    }
  },
  onStart: async function ({ api, event, args }) {
    const min = parseInt(args[0]);
    const max = parseInt(args[1]);
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    api.sendMessage(`🥀 𝗥𝗔𝗡𝗗𝗢𝗠 𝗡𝗨𝗠𝗕𝗘𝗥\n┏━━━━━━━━━━━━❀\n➤ Yours random number \n𝐍𝐮𝐦𝐛𝐞𝐫 𝐈𝐬\n➤ ${randomNumber}\n┗━━━━━━━━━━━━❀`, event.threadID, event.messageID);
  },
};