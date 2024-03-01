module.exports = {
  config: {
    name: "messagesend",
    aliases: ["sms"],
    author: "Rômeo",//Command modified by Aryan Chauhan don't change my author name credit
    category: "𝗦𝗠𝗦 𝗠𝗘𝗦𝗦𝗔𝗚𝗘",
    role: 0,
    shortDescription: {
      en: "Send a message to all users or groups",
      tl: ""
    },
    longDescription: {
      en: "Send a message to all users or groups",
      tl: ""
    },
    guide: {
      en: "{p}sendAll <message>",
      tl: "{p}sendAll <mensahe>"
    }
  },

  // Add a daily limit feature
  dailyLimit: 5,

  // Function to save user data in the aryan.json file
  saveData: function (data) {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'aryan.json');

    fs.writeFileSync(filePath, JSON.stringify(data));
  },

  // Function to load user data from the aryan.json file
  loadData: function () {
    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'aryan.json');

    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    } else {
      // if aryan.json file does not exist, create a new aryan.json file with an empty object
      fs.writeFileSync(filePath, '{}');
      return {};
    }
  },

  onStart: async function ({ event, args, api }) {
    // Load user data
    const userData = this.loadData();

    if (args.length === 0) {
      return api.sendMessage("📍 𝗣𝗥𝗢𝗩𝗜𝗗𝗘 𝗠𝗘𝗦𝗦𝗔𝗚𝗘\n\n👑 𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➤  [ " + (userData[event.senderID]?.limit || 0) + " / 5 ]\n\n💦 Please provide a message to send to all users and groups 🙃\n\n📍𝗖𝗠𝗗 𝗙𝗘𝗔𝗧𝗨𝗥𝗘𝗦\n➤ 1. This Command Allow to send message to All User's\n➤ 2. This Command Allow to send message to All Threads/Groups\n➤ 3. You will be given 5 limits daily, you can send messages 5 times", event.threadID);
    }

    // Check if user has reached the daily limit
    if (userData[event.senderID]?.limit <= 0) {
      return api.sendMessage("⛔ 𝗟𝗜𝗠𝗜𝗧𝗦 𝗔𝗟𝗘𝗥𝗧\n\n⚠️ Sorry, your daily limit is finished. 🙏Please come back tomorrow.💦", event.threadID);
    }

    const senderName = event && event.senderID ? await api.getUserInfo(event.senderID).then(res => res[event.senderID].name) : "Unknown User";
    const senderUID = event.senderID; // Replace with sender UID
    const messageText = args.join(" ");

    const messageToSend = `╔══════════╗\n 🔵 𝗠𝗘𝗦𝗦𝗔𝗚𝗘 🔵 \n╚══════════╝\n\n ┏━━━━━━━━━━━━❀\n\n💦 𝐒𝐄𝐍𝐃𝐄𝐑 𝐍𝐀𝐌𝐄\n🌹${senderName}🌹\n🌿 𝐒𝐄𝐍𝐃𝐄𝐑 𝐔𝐈𝐃 \n⚙️ ${senderUID} ⚙️\n\n📝 𝐒𝐄𝐍𝐃𝐄𝐑 𝐌𝐄𝐒𝐒𝐀𝐆𝐄\n📌【 ${messageText} 】\n┗━━━━━━━━━━━━❀`;

    const threads = await api.getThreadList(10, null, ["INBOX"]);

    threads.forEach(thread => {
      api.sendMessage(messageToSend, thread.threadID);
    });

    // Update user's daily limit
    if (!userData[event.senderID]) {
      userData[event.senderID] = { limit: this.dailyLimit - 1 }; // Subtract 1 from the daily limit
    } else {
      userData[event.senderID].limit -= 1; // Subtract 1 from the daily limit
    }

    // Save user data
    this.saveData(userData);

    api.sendMessage("✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗦𝗘𝗡𝗧\n\n👑 𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➤  [ " + userData[event.senderID].limit + " / 5 ]\n\n🍒 Message sent to all users or groups!", event.threadID);
  }
};