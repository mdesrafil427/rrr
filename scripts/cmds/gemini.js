const axios = require('axios');
const Data = {};

module.exports = {
  config: {
    name: "gemini",
    aliases: ["gem"],
    version: 2.0,
    author: "Rômeo",//command modified by Aryan Chauhan
    longDescription: "Google Ai",
    category: "𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜",
    guide: {
      en: "{p} gemini questions",
    },
  },
  onStart: async function ({ args, message, event, Reply, api }) {
    try {
      if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0].type === "photo") {
        const photoUrl = encodeURIComponent(event.messageReply.attachments[0].url);
        const lado = `Intreact as Gimini Ai also know as Google Ai using Advance OT technology Developed by master Aryan Chauhan , Question:${args.join(" ")}`;
        const aalu = "otinxsandeep";
        const url = `https://sandipapi.onrender.com/gemini2?prompt=${encodeURIComponent(lado)}&url=${photoUrl}`;
        const response = await axios.get(url);

        message.reply(response.data.answer);
        return;
      }

      const prompt = `Intreact as Gimini Ai also know as Google Ai using Advance OT technology Developed by master Aryan Chauhan , Question:${args.join(" ")}`;
      const chat = event.senderID;

      if (prompt.toLowerCase() === "reset") {
        delete Data[chat];
        message.reply('✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗥𝗘𝗦𝗘𝗧\n\nSuccessfully Reset your prompts');
        return;
      }

      if (!Data[chat]) {
        Data[chat] = prompt;
      } else {
        Data[chat] += '\n' + prompt;
      }

      const ass = "otinxsandeep";
      const encodedPrompt = encodeURIComponent(Data[chat]);

      if (!encodedPrompt) {
        return message.reply("⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗤𝗨𝗘𝗦𝗧𝗜𝗢𝗡\n\nHello How can I assist you today.");
      }

      const response = await axios.get(`https://sandipapi.onrender.com/gemini?prompt=${encodedPrompt}`);
      const answer = response.data.answer;

      message.reply({
        body: `🌼 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜\n\n${answer}`,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  },
  onReply: async function ({ args, message, event, Reply, api }) {
    try {
      const prompt = `Intreact as Gimini Ai also know as Google Ai using Advance OT technology Developed by master Aryan Chauhan , Question:${args.join(" ")}`;
      const chat = event.senderID;

      if (prompt.toLowerCase() === "reset") {
        delete Data[chat];
        message.reply('✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗥𝗘𝗦𝗘𝗧\n\nSuccessfully Reset your prompts');
        return;
      }

      if (!Data[chat]) {
        Data[chat] = prompt;
      } else {
        Data[chat] += '\n' + prompt;
      }


      const encodedPrompt = encodeURIComponent(Data[chat]);

      const response = await axios.get(`https://sandipapi.onrender.com/gemini?prompt=${encodedPrompt}`);
      const answer = response.data.answer;

      message.reply({
        body: `🌼 𝗚𝗘𝗠𝗜𝗡𝗜 𝗔𝗜\n\n${answer}`,
      }, (err, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          messageID: info.messageID,
          author: event.senderID
        });
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  }
};