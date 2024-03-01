const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

 
module.exports = {
  config: {
    name: "pinterest",
    aliases: ["pin"],
    version: "1.0",
    author: "Rômeo",
    role: 0,
    countDown: 1,
    longDescription: {
      en: "Get Image From Pinterest",
    },
    category: "Search",
    guide: {
      en: "{pn} <search query> <number of images>\nExample: {pn} Tomozaki -5"
    }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const keySearch = args.join(" ");
      if (!keySearch.includes("-")) {
        return api.sendMessage(
          "⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗦𝗘\ \n❍➤ Please enter the search query and -number of images (1 - 20)",
          event.threadID,
          event.messageID
        );
      }
      const keySearchs = keySearch.substr(0, keySearch.indexOf("-"));
      let numberSearch = keySearch.split("-").pop() || 20;
      if (numberSearch > 20) {
        numberSearch = 20;
      }

      const apiUrl = `https://api-samirxyz.onrender.com/api/Pinterest?query=${encodeURIComponent(keySearchs)}& number=${numberSearch}&apikey=global`;

      const res = await axios.get(apiUrl);
      const data = res.data.result;
      const imgData = [];

      for (let i = 0; i < Math.min(numberSearch, data.length); i++) {
        const imgResponse = await axios.get(data[i], {
          responseType: "arraybuffer"
        });
        const imgPath = path.join(__dirname, "cache", `${i + 1}.jpg`);
        await fs.outputFile(imgPath, imgResponse.data);
        imgData.push(fs.createReadStream(imgPath));
      }

      await api.sendMessage({
        attachment: imgData,
      }, event.threadID, event.messageID);

      await fs.remove(path.join(__dirname, "cache"));
    } catch (error) {
      console.error(error);
      return api.sendMessage(
        `An error occurred.`,
        event.threadID,
        event.messageID
      );
    }
  }
};