const axios = require('axios');
const jimp = require("jimp");
const fs = require("fs");

module.exports = {
  config: {
    name: "wholesome",
    version: "1.0",
    author: "Orochi Team",
    countDown: 1,
    role: 0,
    shortdescription: "wholesome",
    longDescription: "wholesome avatar for crush/lover",
    category: "fun",
    guide: ""
  },

  onStart: async function ({ message, event, args }) {
    const mention = Object.keys(event.mentions);
    if (mention.length == 0) {
      message.reply("⛔ 𝗧𝗔𝗚 𝗦𝗢𝗠𝗘𝗢𝗡𝗘\n\n┏━━━━━━━━━━━━━❀\n➤ You must tag a person\n┗━━━━━━━━━━━━━❀");
      return;
    }

    let one;
    if (mention.length == 1) {
      one = mention[0];
    } else {
      one = mention[0];
    }

    try {
      const imagePath = await createImage(one);
      await message.reply({
        body: "🤧 𝗜𝗧𝗦 𝗧𝗥𝗨𝗘\n\n┏━━━━━━━━━━━━━❀\n➤ Is this true or not? 🤧\n┗━━━━━━━━━━━━━❀",
        attachment: fs.createReadStream(imagePath)
      });
    } catch (error) {
      console.error("⛔ 𝗘𝗥𝗥𝗢𝗥 𝗜𝗡 𝗖𝗠𝗗\n\n┏━━━━━━━━━━━━━❀\nError while running command\n┗━━━━━━━━━━━━━❀", error);
      await message.reply("🔴 𝗦𝗬𝗦𝗧𝗘𝗠 𝗘𝗥𝗥𝗢𝗥\n\n┏━━━━━━━━━━━━━❀\nAn error occurred\n┗━━━━━━━━━━━━━❀");
    }
  }
};

async function createImage(one) {
  const avatarone = await jimp.read(`https://graph.facebook.com/${one}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`);
  const image = await jimp.read("https://i.imgur.com/BnWiVXT.jpg");
  image.resize(512, 512).composite(avatarone.resize(173, 173), 70, 186);
  const imagePath = "wholesome.png";
  await image.writeAsync(imagePath);
  return imagePath;
}