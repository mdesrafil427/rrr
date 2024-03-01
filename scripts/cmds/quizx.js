const axios = require("axios");
const fs = require("fs");

module.exports = {
  config: {
    name: "quizx",
    version: "1.0",
    author: "Rômeo",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Play Quiz Game"
    },
    longDescription: {
      en: "Play Quiz Game With Chat Bot"
    },
    category: "𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗤𝗨𝗜𝗭",
    guide: {
      en: "{pn} quizx"
    }
  },

  onReply: async function ({ args, event, api, Reply, commandName, usersData }) {
    const { dataGame, answer, nameUser } = Reply;
    if (event.senderID !== Reply.author) return;

    switch (Reply.type) {
      case "reply": {
        const userReply = event.body.toLowerCase();

        if (userReply === answer.toLowerCase()) {
          api.unsendMessage(Reply.messageID).catch(console.error);
          const rewardCoins = 10000000;
          const rewardExp = 20000; 
          const senderID = event.senderID;
          const userData = await usersData.get(senderID);
          await usersData.set(senderID, {
            money: userData.money + rewardCoins,
            exp: userData.exp + rewardExp,
            data: userData.data
          });
          const msg = {
            body: `💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗤𝗨𝗜𝗭𝗫\n\n┏━━━━━━━━━━━━❀\n𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘\n➤ ${nameUser} \nCongratulations! dude  ${nameUser}  You’ve answered correctly🎉 and recieved\n❣️ 𝗪𝗢𝗡 𝗥𝗘𝗪𝗔𝗥𝗗\n➤ ${rewardCoins} 💸\n🪙 𝗪𝗜𝗡 𝗘𝗫𝗣\n➤  ${rewardExp} ⚒️\n┗━━━━━━━━━━━━❀`
          };
          return api.sendMessage(msg, event.threadID, event.messageID);
        } else {
          api.unsendMessage(Reply.messageID);
          const msg = `💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗤𝗨𝗜𝗭𝗫\n┏━━━━━━━━━━━━❀\n𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘\n➤ ${nameUser}\nThe answer is wrong!!\n✅ 𝗖𝗢𝗥𝗥𝗘𝗖𝗧 𝗔𝗡𝗦𝗪𝗘𝗥\n➤ ${answer}\n😗 Please Try Again\n┗━━━━━━━━━━━━❀`;
          return api.sendMessage(msg, event.threadID);
        }
      }
    }
  },

  onStart: async function ({ api, event, usersData, commandName }) {
    const { threadID, messageID } = event;
    const timeout = 600;

    try {
      const response = await axios.get('https://samirthakuri.restfulapi.repl.co/quiz?apikey=samirey');
      const quizData = response.data;
      const samir = response.data;
      const { question, answer } = quizData;
      const { A, B, C, D } = samir;
      const namePlayerReact = await usersData.getName(event.senderID);

      const msg = {
        body: `💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗤𝗨𝗜𝗭𝗫\n┏━━━━━━━━━━━━❀\n𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐪𝐮𝐞𝐬𝐭𝐢𝐨𝐧\n➤ ${question} \n\n✅ 𝗖𝗵𝗼𝗼𝘀𝗲 𝗢𝗻𝗲 𝗢𝗽𝘁𝗶𝗼𝗻\n➤ [A] ${A} \n➤ [B] ${B}\n➤ [C] ${C}\n➤ [D] ${D}\n\n😙 Reply with the answer\n┗━━━━━━━━━━━━❀`,
      };

      api.sendMessage(msg, threadID, async (error, info) => {
        global.GoatBot.onReply.set(info.messageID, {
          type: "reply",
          commandName,
          author: event.senderID,
          messageID: info.messageID,
          dataGame: quizData,
          answer,
          nameUser: namePlayerReact
        });

        setTimeout(function () {
          api.unsendMessage(info.messageID);
        }, timeout * 10000);
      });
    } catch (error) {
      console.error("what ? 😞", error);
    }
  }
};