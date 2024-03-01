const axios = require ("axios");
const fs = require ("fs-extra");

module.exports = {
  config: {
    name: "pair",
    version: "1.0",
    author: "Rômeo",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: "Find Your Wife ",
    longDescription: "Non - description",
    category: "Pair",
    guide: "/pair"
  },

  onStart: async function({ api, event, threadsData, usersData }) {

    const { threadID, messageID, senderID } = event;
    const { participantIDs } = await api.getThreadInfo(threadID);
    var tle = Math.floor(Math.random() * 101);
    var namee = (await usersData.get(senderID)).name
    const botID = api.getCurrentUserID();
    const listUserID = participantIDs.filter(ID => ID != botID && ID != senderID);
    var id = listUserID[Math.floor(Math.random() * listUserID.length)];
    var name = (await usersData.get(id)).name
    var arraytag = [];
    arraytag.push({ id: senderID, tag: namee });
    arraytag.push({ id: id, tag: name });

    let Avatar = (await axios.get(`https://graph.facebook.com/${senderID}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt.png", Buffer.from(Avatar, "utf-8"));

    let gifLove = (await axios.get(`https://i.imgur.com/HXhHI8y.gif`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/giflove.png", Buffer.from(gifLove, "utf-8"));

    let Avatar2 = (await axios.get(`https://graph.facebook.com/${id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(__dirname + "/cache/avt2.png", Buffer.from(Avatar2, "utf-8"));

    var imglove = [];

    imglove.push(fs.createReadStream(__dirname + "/cache/avt.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/giflove.png"));
    imglove.push(fs.createReadStream(__dirname + "/cache/avt2.png"));

    var msg = {
      body: `❣ 𝗖𝗢𝗡𝗚𝗥𝗔𝗧𝗨𝗟𝗔𝗧𝗜𝗢𝗕𝗦 𝗖𝗨𝗧𝗘 𝗖𝗢𝗨𝗣𝗟𝗘\n\n┏━━━━━━━━━━━━♥\n😽 𝗬𝗢𝗨𝗥 𝗟𝗢𝗩𝗘 𝗣𝗥𝗘𝗖𝗘𝗡𝗧𝗔𝗚𝗘\n➤ ${tle}%\n┗━━━━━━━━━━━━💝\n┏━━━━━━━━━━━━💛\n👑 𝗟𝗢𝗩𝗘𝗥 𝗡𝗔𝗠𝗘\n➤ ${namee}\n┗━━━━━━━━━━━━💚\n┏━━━━━━━━━━━━💜\n😘 𝗜 𝗟𝗢𝗩𝗘 𝗬𝗢𝗨\n➤  ${name}\n┗━━━━━━━━━━━━💙\n┏━━━━━━━━━━━━❀\n😻 𝗟𝗢𝗩𝗘 𝗤𝗨𝗢𝗧𝗘\n➤ 𝖬𝗒 𝗅𝗈𝗏𝖾 ${name} 𝖿𝗈𝗋 𝗒𝗈𝗎 𝗂𝗌 𝗅𝗂𝗄𝖾 𝖺 𝗇𝖾𝗏𝖾𝗋-𝖾𝗇𝖽𝗂𝗇𝗀 𝖽𝖺𝗇𝖼𝖾, 𝗀𝗋𝖺𝖼𝖾𝖿𝗎𝗅𝗅𝗒 𝗆𝗈𝗏𝗂𝗇𝗀 𝗍𝗁𝗋𝗈𝗎𝗀𝗁 𝗍𝗁𝖾 𝗁𝗂𝗀𝗁𝗌 𝖺𝗇𝖽 𝗅𝗈𝗐𝗌 𝗈𝖿 𝗅𝗂𝖿𝖾. 💃🕺💞\n┗━━━━━━━━━━━━💛\n┏━━━━━━━━━━━━😗\n😞 𝗨𝗡𝗗𝗘𝗥𝗦𝗧𝗔𝗗𝗜𝗡𝗚\n➤ 𝖫𝗈𝗏𝖾 𝗂𝗌 𝖺 𝗅𝖺𝗇𝗀𝗎𝖺𝗀𝖾 𝗌𝗉𝗈𝗄𝖾𝗇 𝖻𝗒 𝖾𝗏𝖾𝗋𝗒𝗈𝗇𝖾 𝖻𝗎𝗍 𝗎𝗇𝖽𝖾𝗋𝗌𝗍𝗈𝗈𝖽 𝗈𝗇𝗅𝗒 𝖻𝗒 𝗍𝗁𝖾 𝗁𝖾𝖺𝗋𝗍. ❤✨\n┗━━━━━━━━━━━━🍒`,
      mentions: arraytag,
      attachment: imglove
    };

    return api.sendMessage(msg, event.threadID, event.messageID);
  }
};