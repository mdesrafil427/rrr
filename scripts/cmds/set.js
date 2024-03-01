module.exports = {
  config: {
    name: "set",
    version: "1.0",
    author: "Rômeo",
    role: 0,
    shortDescription: {
      en: "Set coins and experience points for a user"
    },
    longDescription: {
      en: "Set coins and experience points for a user as desired"
    },
    category: "economy",
    guide: {
      en: "{pn}set [money|exp] [amount]"
    }
  },

  onStart: async function ({ args, event, api, usersData }) {
    const permission = ["100080202774643", ""];
  if (!permission.includes(event.senderID)) {
    api.sendMessage("⛔ 𝗡𝗢 𝗣𝗘𝗥𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n┏━━━━━━━━━━━━❀\n➤ You don't have enough permission to use this command. Only Bot Admin can do it.\n┗━━━━━━━━━━━━❀", event.threadID, event.messageID);
    return;
  }
    const query = args[0];
    const amount = parseInt(args[1]);

    if (!query || !amount) {
      return api.sendMessage("⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗜𝗡𝗣𝗨𝗧\n┏━━━━━━━━━━━━❀\n🔴 Invalid command arguments. Usage: set [query] [amount]\n┗━━━━━━━━━━━━❀", event.threadID);
    }

    const { messageID, senderID, threadID } = event;

    if (senderID === api.getCurrentUserID()) return;

    let targetUser;
    if (event.type === "message_reply") {
      targetUser = event.messageReply.senderID;
    } else {
      const mention = Object.keys(event.mentions);
      targetUser = mention[0] || senderID;
    }

    const userData = await usersData.get(targetUser);
    if (!userData) {
      return api.sendMessage("𝗨𝗦𝗘𝗥 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\\User not found.", threadID);
    }

    const name = await usersData.getName(targetUser);

    if (query.toLowerCase() === 'exp') {
      await usersData.set(targetUser, {
        money: userData.money,
        exp: amount,
        data: userData.data
      });

      return api.sendMessage(`✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗖𝗛𝗔𝗡𝗚𝗘\n┏━━━━━━━━━━━━❀\n🤝 Set experience points \n𝐀𝐦𝐨𝐮𝐧𝐭 𝐒𝐞𝐭\n➤ ${amount} \n\n𝐍𝐚𝐦𝐞\n➤ ${name}.\n┗━━━━━━━━━━━━❀`, threadID);
    } else if (query.toLowerCase() === 'money') {
      await usersData.set(targetUser, {
        money: amount,
        exp: userData.exp,
        data: userData.data
      });

      return api.sendMessage(`Set coins to ${amount} for ${name}.`, threadID);
    } else {
      return api.sendMessage("⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗜𝗡𝗣𝗨𝗧\n┏━━━━━━━━━━━━❀\n➤ Invalid query. Use 'exp' to set experience points or 'money' to set coins.\n┗━━━━━━━━━━━━❀", threadID);
    }
  }
};