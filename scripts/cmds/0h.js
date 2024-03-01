module.exports = {
  config: {
    name: "supportgc",
    version: "1.0",
    author: "Rômeo",
    role: 0,
    shortDescription: {
      en: "Adds the user to a specific thread."
    },
    longDescription: {
      en: "Adds the user to a specific thread and sends them a notification message."
    },
    category: "System",
    guide: {
      en: "Use {p}join to add yourself to the specified thread."
    }
  },
  onStart: async function ({ api, event, args }) {
    const threadID = "6617605598354814"; // ID of the thread to add the user to

    try {
      await api.addUserToGroup(event.senderID, threadID);
      api.sendMessage("💕 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖\n\nYou have been added to the group chat. Please check your Spam or Message Request folder if you can't find the group chat.", event.senderID);
    } catch (error) {
      api.sendMessage("💕 𝗦𝗨𝗣𝗣𝗢𝗥𝗧𝗚𝗖\n\nFailed to add you to the group chat.", event.senderID);
    }
  }
};