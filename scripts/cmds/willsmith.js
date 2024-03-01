const axios = require('axios');
	const request = require('request');
	const fs = require("fs");

module.exports = {
	config: {
		name: "willsmith",
		version: "1.0",
		author: "Orochi Team",
		countDown: 1,
		role: 0,
		shortDescription: "slap",
		longDescription: "",
		category: "write",
		guide: {
			vi: "{pn} text | text",
			en: "{pn} text | text"
		}
	},

	onStart: async function ({ message, api, event, args, getText }) {
      
  const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	 const { threadID, messageID, senderID, body } = event;
	 let text = args.join(" ")
  if (!text) return api.sendMessage('🔴 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗦𝗘\n\n┏━━━━━━━━━━━━━❀\nPlease enter the correct format [text1 | text2 ]!\n┗━━━━━━━━━━━━━❀', event.threadID, event.messageID);
  const length_0 = parseInt(text.length)
  const text1 = text.substr(0, text.indexOf("|")); 
  if (!text1) return api.sendMessage('⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗧𝗬𝗣𝗘\n\n┏━━━━━━━━━━━━━❀\nPlease enter the correct format [text1 | text2 ]!\n┗━━━━━━━━━━━━━❀', event.threadID, event.messageID);
  const length = parseInt(text1.length)
  const text2 = text.split("|").pop()
  if (!text2) return api.sendMessage('⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗧𝗘𝗫𝗧\n\n┏━━━━━━━━━━━━━❀\n✌️ Please enter the correct format [text1 | text2 ]!\n┗━━━━━━━━━━━━━❀', event.threadID, event.messageID);
  const length_2 = parseInt(text2.length)
  
	 var callback = () => api.sendMessage({body:``,attachment: fs.createReadStream(__dirname + "/assets/any.png")}, event.threadID, () => fs.unlinkSync(__dirname + "/assets/any.png"),event.messageID);
	 return request(encodeURI(`https://api.memegen.link/images/slap/${text1}/${text2}.png`)).pipe(fs.createWriteStream(__dirname+'/assets/any.png')).on('close',() => callback());  
}
};