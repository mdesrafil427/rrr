const { getTime } = global.utils;

module.exports = {
  config: {
    name: "user",
    version: "1.0",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 1,
    shortDescription: {
      en: "Manage users"
    },
    longDescription: {
      en: "Manage Users in Orochi system"
    },
    category: "𝗨𝗦𝗘𝗥 𝗠𝗔𝗡𝗔𝗚𝗘𝗥",
    guide: {
      en: "   {pn} [find | -f | search | -s] <name to find>: search for users in bot data by name"
        + "\n"
        + "\n   {pn} [ban | -b] [<uid> | @tag | reply message] <reason>: to ban user with id <uid> or tagged user or sender of message replied using bot"
        + "\n"
        + "\n   {pn} unban [<uid> | @tag | reply message]: to unban user using bot"
    }
  },

  langs: {
    en: {
      noUserFound: "⛔ 𝗡𝗢 𝗙𝗢𝗨𝗡𝗗\n\nNo User found with name matching keyword: \"%1\" in bot data",
      userFound: "✅ 𝗙𝗢𝗨𝗡𝗗𝗘𝗗\n\n🔎 Found %1 user with name matching keyword \"%2\" in bot data:\n➤ %3",
      uidRequired: "📝 𝗥𝗘𝗤𝗨𝗜𝗥𝗘𝗗 𝗨𝗜𝗗\n\n❌ Uid of user to ban cannot be empty, please enter uid or tag or reply message of 1 user by user ban <uid> <reason>",
      reasonRequired: "❌ 𝗥𝗘𝗔𝗦𝗢𝗡 𝗥𝗘𝗤𝗨𝗜𝗥𝗘𝗗\n\n📝 Reason to ban user cannot be empty, please enter uid or tag or reply message of 1 user by user ban <uid> <reason>",
      userHasBanned: "⛔ 𝗔𝗟𝗥𝗘𝗔𝗗𝗬 𝗕𝗔𝗡𝗡𝗘𝗗\n\n➪ User with id [%1 | %2] has been banned before\n\n𝗥𝗘𝗔𝗦𝗢𝗡\n➤ %3\n\n𝗗𝗔𝗧𝗘\n➤ %4",
      userBanned: "⛔ 𝗦𝗬𝗦𝗧𝗘𝗠 𝗔𝗟𝗘𝗥𝗧\n\n➪ You Has Been Banned From Using The Orochi Chatbot By Orochi Owner's\n➪ You Activity Is Not Follow Own Community Rules\n➪ Please Contact To Orochi Owners For More Details\n➪ Check Your Unusual Activity\n➪ Our Support Is Always With You\n🖇️ 𝗬𝗢𝗨𝗥 𝗨𝗜𝗗\n➤ %1 | %2\n\n📒 𝗕𝗔𝗡 𝗥𝗘𝗔𝗦𝗢𝗡\n➤ %3\n\n🔔 𝗕𝗔𝗡𝗡𝗘𝗗 𝗗𝗔𝗧𝗘\n➤ %4\n\n𝗦𝗨𝗣𝗣𝗢𝗥𝗧 ( 24/7 )\nJoin Our Support Messanger Group\nGroup Link:- https://m.me/j/AbaepcUJi3cJx3ZR/\nOwner FB link:- https://www.facebook.com/official.aryand.0\nSupport Website Link:- No Data Found\n\n💖  𝗢𝗥𝗢𝗖𝗛𝗜 𝗧𝗘𝗔𝗠 💖",
      uidRequiredUnban: "❌ 𝗥𝗘𝗤𝗨𝗜𝗥𝗘𝗗 𝗨𝗜𝗗\n\n⚒️ Uid of user to unban cannot be empty",
      userNotBanned: "❌ 𝗨𝗦𝗘𝗥 𝗡𝗢𝗧 𝗕𝗔𝗡𝗡𝗘𝗗\n\n💁 User with id [%1 | %2] is not banned",
      userUnbanned: "💎 𝗕𝗔𝗡𝗡𝗘𝗗 𝗨𝗦𝗘𝗥\n\n😗 User with id [%1 | %2] has been unbanned"
    }
  },

  onStart: async function ({ args, usersData, message, event, prefix, getLang }) {
    const type = args[0];
    switch (type) {
      // find user
      case "find":
      case "-f":
      case "search":
      case "-s": {
        const allUser = await usersData.getAll();
        const keyWord = args.slice(1).join(" ");
        const result = allUser.filter(item => (item.name || "").toLowerCase().includes(keyWord.toLowerCase()));
        const msg = result.reduce((i, user) => i += `\n╭Name: ${user.name}\n╰ID: ${user.userID}`, "");
        message.reply(result.length == 0 ? getLang("noUserFound", keyWord) : getLang("userFound", result.length, keyWord, msg));
        break;
      }
      // ban user
      case "ban":
      case "-b": {
        let uid, reason;
        if (event.type == "message_reply") {
          uid = event.messageReply.senderID;
          reason = args.slice(1).join(" ");
        }
        else if (Object.keys(event.mentions).length > 0) {
          const { mentions } = event;
          uid = Object.keys(mentions)[0];
          reason = args.slice(1).join(" ").replace(mentions[uid], "");
        }
        else if (args[1]) {
          uid = args[1];
          reason = args.slice(2).join(" ");
        }
        else return message.SyntaxError();

        if (!uid)
          return message.reply(getLang("uidRequired"));
        if (!reason)
          return message.reply(getLang("reasonRequired", prefix));
        reason = reason.replace(/\s+/g, ' ');

        const userData = await usersData.get(uid);
        const name = userData.name;
        const status = userData.banned.status;

        if (status)
          return message.reply(getLang("userHasBanned", uid, name, userData.banned.reason, userData.banned.date));
        const time = getTime("DD/MM/YYYY HH:mm:ss");
        await usersData.set(uid, {
          banned: {
            status: true,
            reason,
            date: time
          }
        });
        message.reply(getLang("userBanned", uid, name, reason, time));
        break;
      }
      // unban user
      case "unban":
      case "-u": {
        let uid;
        if (event.type == "message_reply") {
          uid = event.messageReply.senderID;
        }
        else if (Object.keys(event.mentions).length > 0) {
          const { mentions } = event;
          uid = Object.keys(mentions)[0];
        }
        else if (args[1]) {
          uid = args[1];
        }
        else
          return message.SyntaxError();
        if (!uid)
          return message.reply(getLang("uidRequiredUnban"));
        const userData = await usersData.get(uid);
        const name = userData.name;
        const status = userData.banned.status;
        if (!status)
          return message.reply(getLang("userNotBanned", uid, name));
        await usersData.set(uid, {
          banned: {}
        });
        message.reply(getLang("userUnbanned", uid, name));
        break;
      }
      default:
        return message.SyntaxError();
    }
  }
};