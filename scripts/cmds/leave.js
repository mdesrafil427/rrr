const axios = require("axios");
const fs = require("fs-extra");
const request = require("request");
module.exports = {
	config: {
		name: "leave",
		aliases: ["lv"],
		version: "1.0",
		author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
		countDown: 0,
		role: 2,
		shortDescription: "bot will leave gc",
		longDescription: "",
		category: "𝗔𝗗𝗠𝗜𝗡",
		guide: {
			vi: "{pn} [tid,blank]",
			en: "{pn} [tid,blank]"
		}
	},

	onStart: async function ({ api,event,args, message }) {
 var id;
 if (!args.join(" ")) {
 id = event.threadID;
 } else {
 id = parseInt(args.join(" "));
 }
 return api.sendMessage('😩 𝗚𝗢𝗢𝗗 𝗕𝗬𝗘 𝗚𝗬𝗦\n\n👋 bye Gys My admin Command me to leave your group,😞 Now I am leaving bye bye,😙 Have A great Time 😌', id, () => api.removeUserFromGroup(api.getCurrentUserID(), id))
		}
	};