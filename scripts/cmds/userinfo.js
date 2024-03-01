module.exports = {
  config: {
    name: "userinfo",
    aliases: [`ui`],
    version: "1.0",
    author: "Orochi Team",//Command Modified By Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: "Get user information and avatar",
    longDescription: "Get user information and avatar by mentioning",
    category: "𝗢𝗥𝗢𝗖𝗛𝗜 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢",
  },

   onStart: async function ({ event, message, usersData, api, args, getLang }) {
    let avt;
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    let uid;

    if (args[0]) {
      // Check if the argument is a numeric UID
      if (/^\d+$/.test(args[0])) {
        uid = args[0];
      } else {
        // Check if the argument is a profile link
        const match = args[0].match(/profile\.php\?id=(\d+)/);
        if (match) {
          uid = match[1];
        }
      }
    }

    if (!uid) {
      // If no UID was extracted from the argument, use the default logic
      uid = event.type === "message_reply" ? event.messageReply.senderID : uid2 || uid1;
    }

    api.getUserInfo(uid, async (err, userInfo) => {
      if (err) {
        return message.reply("Failed to retrieve user information.");
      }

      const avatarUrl = await usersData.getAvatarUrl(uid);

      // Gender mapping
      let genderText;
      switch (userInfo[uid].gender) {
        case 1:
          genderText = "Girl";
          break;
        case 2:
          genderText = "Boy";
          break;
        default:
          genderText = "Unknown";
      }

      // Construct and send the user's information with avatar
      const userInformation = `┏━━━━━━━━━━━━━━❀\n🎀 𝗨𝗦𝗘𝗥 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡𝗦\n\n❣️ 𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘\n➤  ${userInfo[uid].name} \n💌 𝗣𝗥𝗢𝗙𝗜𝗟𝗘 𝗨𝗥𝗟\n 👇    ${userInfo[uid].profileUrl} \n💝 𝗨𝗦𝗘𝗥 𝗚𝗘𝗡𝗗𝗘𝗥 \n➤  ${genderText} \n😊 𝗜𝗦 𝗨𝗦𝗘𝗥 𝗧𝗬𝗣𝗘\n➤  ${userInfo[uid].type} \n😍 𝗜𝗦 𝗨𝗦𝗘𝗥 𝗙𝗥𝗜𝗘𝗡𝗗 \n➤  ${userInfo[uid].isFriend ? "Yes" : "No"} \n😘 𝗜𝗦 𝗕𝗜𝗥𝗧𝗛𝗗𝗔𝗧 𝗧𝗢𝗗𝗔𝗬 \n➤  ${userInfo[uid].isBirthday ? "Yes" : "No"}\n┗━━━━━━━━━━━━━━❀ `;

      message.reply({
        body: userInformation,
        attachment: await global.utils.getStreamFromURL(avatarUrl)
      });
    });
  }
};