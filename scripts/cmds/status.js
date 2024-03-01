const fs = require("fs");

const vipFilePath = "premium.json";

function loadVIPData() {
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}

function saveVIPData(data) {
  try {
    fs.writeFileSync(vipFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving VIP data:", err);
  }
}

module.exports = {
  config: {
    name: "status",
    version: "1.0",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    role: 0,
    category: "𝗢𝗥𝗢𝗖𝗛𝗜 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗦𝗧𝗔𝗧𝗨𝗦",
    guide: {
      en: "{pn} status - Check user status",
    },
  },

  onStart: async function ({ api, event, message, usersData }) {
    const uid = event.senderID;

    // Load VIP data from the JSON file
    let vipData = loadVIPData();

    if (vipData[uid]) {
      const userData = await usersData.get(uid);
      const userName = userData ? userData.name : "Unknown User";
      return message.reply(`💎 𝗣𝗥𝗘𝗠𝗜𝗨𝗠 𝗨𝗦𝗘𝗥\n\n𝗡𝗔𝗠𝗘\n➤ ${userName}\n𝗦𝗧𝗔𝗧𝗨𝗦\n➤ Premium Subscriber 👑\n𝗨𝗜𝗗\n➤ ${uid}`);
    } else {
      const userData = await usersData.get(uid);
      const userName = userData ? userData.name : "Unknown User";
      return message.reply(`👑 𝗣𝗥𝗢 𝗨𝗦𝗘𝗥\n\n𝗡𝗔𝗠𝗘\n➤ ${userName}\n𝗦𝗧𝗔𝗧𝗨𝗦\n➤ Pro Subscriber\n𝗨𝗜𝗗\n➤ ${uid}`);
    }
  }
};