const fs = require('fs');

module.exports = {
  config: {
    name: "file",
    version: "1.0",
    author: "Rômeo",
    countDown: 0,
    role: 2,
    shortDescription: "Send bot script",
    longDescription: "Send bot specified file ",
    category: "owner",
    guide: "{pn} file name. Ex: .{pn} filename"
  },

  onStart: async function ({ message, args, api, event }) {
    const permission = ["61551115508535"];
    if (!permission.includes(event.senderID)) {
      return api.sendMessage("⛔ 𝗡𝗢-𝗣𝗘𝗥𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n\nOnly Orochi Own Can Use This Command, XD Don't Try Use This Command Without Admin Permission....", event.threadID, event.messageID);
    }

    const fileName = args[0];
    if (!fileName) {
      return api.sendMessage("📝 𝗙𝗜𝗟𝗘 𝗦𝗬𝗦𝗧𝗘𝗠\n\n➪ Please provide a file name.", event.threadID, event.messageID);
    }

    const filePath = __dirname + `/${fileName}.js`;
    if (!fs.existsSync(filePath)) {
      return api.sendMessage(`📝 𝗙𝗜𝗟𝗘 𝗦𝗬𝗦𝗧𝗘𝗠\n\n➪ File not found: ${fileName}.js`, event.threadID, event.messageID);
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    api.sendMessage({ body: fileContent }, event.threadID);
  }
};