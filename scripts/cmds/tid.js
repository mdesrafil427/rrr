module.exports = {
	config: {
		name: "tid",
    aliases: [`t`],
		version: "1.0",
		author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
		countDown: 0,
		role: 0,
		shortDescription: {
			vi: "Xem threadID",
			en: "View threadID"
		},
		longDescription: {
			vi: "Xem id nhóm chat của bạn",
			en: "View threadID of your group chat"
		},
		category: "info",
		guide: {
			en: "{pn}"
		}
	},

	onStart: async function ({ message, event }) {
		message.reply(`💦𝗧𝗛𝗥𝗘𝗔𝗗 𝗨𝗜𝗗\n\n🔘 𝖧𝖾𝗋𝖾 𝖨𝗌 𝖸𝗈𝗎𝗋 𝖦𝗋𝗈𝗎𝗉 𝖴𝖨𝖣\n\n\n➤  ${event.threadID.toString()}`);
	}
};