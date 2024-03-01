const fs = require("fs-extra");

module.exports = {
	config: {
		name: "restart",
    aliases: [`r`],
		version: "1.0",
		author: "Orochi Team",
		countDown: 1,
		role: 0,
		shortDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		longDescription: {
			vi: "Khởi động lại bot",
			en: "Restart bot"
		},
		category: "Owner",
		guide: {
			vi: "   {pn}: Khởi động lại bot",
			en: "   {pn}: Restart bot"
		}
	},

	langs: {
		vi: {
			restartting: "🔄 | Đang khởi động lại bot..."
		},
		en: {
			restartting: "🔄 𝗥𝗘𝗦𝗧𝗔𝗥𝗧𝗜𝗡𝗚 𝗦𝗬𝗦𝗧𝗘𝗠\n┏━━━━━━━━━━━━━❀\n➤ ✅ Successfully Sent Msg To Restart System\n➤ 🔄 Orochi Is Now Restarting Please wait for Few minutes\n➤ Server is Take New Moments\n➤ Have A Great Time UwU 🥀💘\n┗━━━━━━━━━━━━━❀"
		}
	},

	onLoad: function ({ api }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		if (fs.existsSync(pathFile)) {
			const [tid, time] = fs.readFileSync(pathFile, "utf-8").split(" ");
			api.sendMessage(`✅ 𝗥𝗘𝗦𝗧𝗔𝗥𝗧𝗘𝗗\n\n🤖 OROCHI AI Has Been Successfully Restarted\n\n🔴𝗧𝗔𝗞𝗘 𝗧𝗜𝗠𝗘\n➤  ❍ ?? ❍\n\n💞 𝗧𝗛𝗔𝗡𝗞𝗦 𝗔 𝗟𝗢𝗧\n➤ Thank you soo much for restaring Orochi Ai now Orochi will wake for 10 minutes.If you wanna to orochi he will stay with you.So do nothing but use restart Command every 10 minutes.Thank you for your support 🥀`, tid);
			fs.unlinkSync(pathFile);
		}
	},

	onStart: async function ({ message, event, getLang }) {
		const pathFile = `${__dirname}/tmp/restart.txt`;
		fs.writeFileSync(pathFile, `${event.threadID} ${Date.now()}`);
		await message.reply(getLang("restartting"));
		process.exit(2);
	}
};