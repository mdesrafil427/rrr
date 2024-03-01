const DIG = require("discord-image-generation");
const fs = require("fs-extra");

module.exports = {
  config: {
    name: "wanted",
    version: "1.10",
    author: "Orochi Team",
    countDown: 1,
    role: 0,
    shortDescription: "wanted image",
    longDescription: "wanted image",
    category: "image",
    guide: {
      en: "{pn} @tag"
    }
  },

  langs: {
    en: {
      noTag: "😘 𝗧𝗔𝗚 𝗦𝗢𝗠𝗘𝗢𝗡𝗘\n\n┏━━━━━━━━━━━━━❀\n➤ You must tag the person you want to wanted\n┗━━━━━━━━━━━━━❀"
    }
  },

  onStart: async function ({ event, message, usersData, args, getLang }) {
    const uid1 = event.senderID;
    const uid2 = Object.keys(event.mentions)[0];
    if (!uid2)
      return message.reply(getLang("noTag"));
    const avatarURL2 = await usersData.getAvatarUrl(uid2);
    const img = await new DIG.Wanted().getImage(avatarURL2);
    const pathSave = `${__dirname}/tmp/${uid2}_Wanted.png`;
    fs.writeFileSync(pathSave, Buffer.from(img));
    const content = args.join(' ').replace(Object.keys(event.mentions)[0], "");
    message.reply({
      body: `𝗠𝗜𝗦𝗦𝗜𝗡𝗚 𝗣𝗘𝗥𝗦𝗢𝗡\n\n┏━━━━━━━━━━━━━❀\n${(content || "wanted moment!")}\n┗━━━━━━━━━━━━━❀`,
      attachment: fs.createReadStream(pathSave)
    }, () => fs.unlinkSync(pathSave));
  }
};