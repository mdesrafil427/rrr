const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
  config: {
    name: "uid",
    aliases: [`u`],
    version: "1.0",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      vi: "Xem uid",
      en: "View uid"
    },
    longDescription: {
      vi: "Xem user id facebook của người dùng",
      en: "View facebook user id of user"
    },
    category: "info",
    guide: {
      en: "   {pn}: use to view your facebook user id"
        + "\n   {pn} @tag: view facebook user id of tagged people"
        + "\n   {pn} <profile link>: view facebook user id of profile link"
        + "\n   Reply to someone's message with the command to view their facebook user id"
    }
  },

  langs: {
    en: {
      syntaxError: "❌ Invalid Input\n\n🍒 Please enter your U.I.D"
    }
  },

  onStart: async function({ message, event, args, getLang }) {
    if (event.messageReply) {
      const senderID = event.messageReply.senderID || "Unknown";
      return message.reply(`💬 𝗬𝗢𝗨𝗥 𝗨𝗜𝗗 \n\n🌺ℍ𝕖𝕣𝕖 𝕚𝕤 𝕐𝕠𝕦𝕣 𝕌𝕀𝔻:\n🍒[${senderID}]🍒`);
    }
    if (!args[0]) {
      const senderID = event.senderID || "Unknown";
      return message.reply(`💬 𝗬𝗢𝗨𝗥 𝗨𝗜𝗗 \n\n😗 𝖧𝖾𝗋𝖾 𝖨𝗌𝖸𝗈𝗎𝗋 𝖴𝖨𝖣\n\n\n➤  [${senderID}]`);
    }
    if (args[0].match(regExCheckURL)) {
      let msg = '';
      for (const link of args) {
        try {
          const uid = await findUid(link);
          msg += `🔘𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢\n\n🌺 𝗟𝗜𝗡𝗞.   👇\n❀${link}❀ \n\n🍒 𝗨𝗜𝗗.   👇\n\n\n ➤  ${uid}\n`;
        } catch (e) {
          msg += `𝗨𝗦𝗘𝗥 𝗟𝗜𝗡𝗞\n\n${link} (ERROR) \n\n❌ ${e.message}\n`;
        }
      }
      message.reply(msg);
      return;
    }

    let msg = "";
    const { mentions } = event;
    for (const id in mentions) {
      msg += `💦 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢\n\n🎀 𝗡𝗔𝗠𝗘.  👇 \n❍${mentions[id].replace("@", "")}❍\n\n🍒 𝗨𝗜𝗗   👇\n❀${id}❀\n`;
    }
    message.reply(msg || getLang("syntaxError"));
  }
}