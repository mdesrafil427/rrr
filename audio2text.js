const axios = require("axios");

module.exports = {
  config: {
    name: "audio2text",
    aliases: [`a2t`],
    version: "1.1",
    author: "Rômeo",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      vi: "",
      en: "audio to text"
    },
    longDescription: {
      vi: "",
      en: "audio to text"
    },
    category: "fun",
    guide: {
      vi: "{pn}",
      en: "{pn} reply to an audio"
    }
  },

  onStart: async function({ event, api, message }) {
    try {
      const link = event.messageReply.attachments[0].url || args.join(" ");
      if (!link) return message.reply('⛔ 𝗜𝗡𝗩𝗔𝗜𝗟𝗗 𝗨𝗦𝗘\n\n💦 Please reply to an audio.You want to extract audio to text');
      const response = await axios.get(`https://milanbhandari.imageapi.repl.co/transcribe?url=${encodeURIComponent(link)}`);
      const text = response.data.transcript;
      message.reply({
        body: text
      });
    } catch (error) {
      console.error(error);
      message.reply("An error occurred.");
    }
  }
};