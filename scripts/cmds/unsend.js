 module.exports = {
  config: {
    name: "unsend",
    alises: ["un","u"],
    version: "1.0",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      vi: "Gỡ tin nhắn của bot",
      en: "Unsend bot's message"
    },
    longDescription: {
      vi: "Gỡ tin nhắn của bot",
      en: "Unsend bot's message"
    },
    category: "box chat",
    guide: {
      vi: "reply tin nhắn muốn gỡ của bot và gọi lệnh {pn}",
      en: "reply the message you want to unsend and call the command {pn}"
    }
  },

  langs: {
    vi: {
      syntaxError: "Vui lòng reply tin nhắn muốn gỡ của bot"
    },
    en: {
      syntaxError: "⛔ 𝗨𝗡𝗦𝗘𝗡𝗗 𝗠𝗦𝗚\n\n(◕ᴗ◕✿) Please reply the message you want to unsend..."
    }
  },

  onStart: async function ({ message, api, getLang, commandName, event }) {
    if (!event.messageReply || event.messageReply.senderID != api.getCurrentUserID())
      return message.reply(getLang("syntaxError"));

    message.unsend(event.messageReply.messageID);
    global.GoatBot.onReaction.set(event.messageReply.messageID, {
      messageID: event.messageReply.messageID,
      threadID: event.threadID,
      authorID: event.senderID,
      commandName
    });
  },

  onReaction: async function({ message, api, getLang, reaction, event }) {
    const { userID } = event;
    if (reaction == "😹") {
    await message.unsend(event.messageReply.messageID);
    }
  }
};