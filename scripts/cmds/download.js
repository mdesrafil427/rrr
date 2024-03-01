const axios = require('axios');
const fs = require('fs');
const { shortenURL } = global.utils;
module.exports = {
  config: {
    name: "download", 
    version: "1.0.1",
    author: "0rochi Team",
    countDown: 0,
    role: 0,
    longDescription: {
      en: "Download video from tiktok, facebook, Instagram, YouTube, and more"
    },
    category: "media",
    guide: {
      en: "[video_link]"
    }
},

  onStart: async function ({ api, args, event, message }) {
    const dipto = args.join(" ");

    if (!dipto) {
      return message.reply("⛔ INVALID USE\n\nPlease send a video link to download video.")
    }
  try {

      { api.setMessageReaction("✅", event.messageID, (err) => {}, true);
      }
    const path = __dirname + `/cache/diptoo.mp4`;

    const aa = await axios.get(`https://d1pt0-all.onrender.com/xnxx?url=${encodeURI(dipto)}`);

    const bb = aa.data;
    const res = aa.data.result;
    const shortUrl = await shortenURL(res);
    const messageBody = `✅ SUCCESSFULLY DOWNLOAD\n\n🔗 VIDEO URL\n${shortUrl}`;

    const vid = (await axios.get(bb.result, { responseType: "arraybuffer", })).data;

    fs.writeFileSync(path, Buffer.from(vid, 'utf-8'));
    api.sendMessage({

        body: `
☂ ${bb.cp}
♻ AUTHOR\n${bb.author}\n📝 MESSAGE\n${messageBody}
            `,

      attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);

if (dipto.startsWith('https://i.imgur.com')){

  const dipto3 = dipto.substring(dipto.lastIndexOf('.'));

  const response = await axios.get(dipto, { responseType: 'arraybuffer' });

const filename = __dirname + `/cache/dipto${dipto3}`;

    fs.writeFileSync(filename, Buffer.from(response.data, 'binary'));
    api.sendMessage({body: `✅SUCCESSFULLY DOWNLOAD\n\n🟢Downloaded from link`,attachment: fs.createReadStream(filename)},event.threadID,

  () => fs.unlinkSync(filename),event.messageID)

}

} catch (e) {

api.sendMessage(`${e}`, event.threadID, event.messageID);
  }
  },
}