const axios = require('axios');

module.exports = {
	config: {
		name: "wife",
		version: "1.0",
		author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
		countDown: 0,
		role: 0,
		shortDescription: "get random waifu",
		longDescription: "Get waifu neko: waifu, neko, shinobu, megumin, bully, cuddle, cry, kiss, lick, hug, awoo, pat, smug, bonk, yeet, blush, smile, wave, highfive, handhold, nom, bite, glomp, slap, kill, kick, happy, wink, poke, dance, cringe",
		category: "anime",
		guide: "{pn} {{<name>}}"
	},

	onStart: async function ({ message, args }) {
		const name = args.join(" ");
		if (!name)

			try {
				let res = await axios.get(`https://api.waifu.pics/sfw/waifu`)


				let res2 = res.data
				let img = res2.url

				const form = {
					body: `💙 𝗥𝗔𝗡𝗗𝗢𝗠 𝗔𝗡𝗜𝗠𝗘 𝗚𝗜𝗥𝗟 𝗣𝗜𝗖\n┏━━━━━━━━━━━━❀\n🍒 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐂𝐮𝐭𝐞 𝐖𝐢𝐟𝐞 \n🤩 𝐈 𝐡𝐨𝐩𝐞 𝐘𝐨𝐮 𝐥𝐨𝐯𝐞 𝐢𝐭 \n😘 𝐄𝐧𝐣𝐨𝐲 𝐖𝐢𝐭𝐡 𝐘𝐨𝐮𝐫 𝐂𝐮𝐭𝐞 𝐖𝐢𝐟𝐞}n𝐑𝐚𝐧𝐝𝐨𝐦 𝐋𝐨𝐯𝐞 𝐐𝐮𝐨𝐭𝐞\n➤ 𝖫𝗈𝗏𝖾 𝗂𝗌 𝗅𝗂𝗄𝖾 𝖺 𝖿𝗅𝗈𝗐𝖾𝗋; 𝗂𝗍 𝗇𝖾𝖾𝖽𝗌 𝗍𝗈 𝖻𝖾 𝗐𝖺𝗍𝖾𝗋𝖾𝖽 𝗐𝗂𝗍𝗁 𝖼𝖺𝗋𝖾 𝖺𝗇𝖽 𝖺𝗍𝗍𝖾𝗇𝗍𝗂𝗈𝗇🌹🌷\n┗━━━━━━━━━━━━❀\n𝐒𝐞𝐧𝐝𝐞𝐫 𝐔𝐈𝐃\n➤ ${event.senderID}  `

				};
				if (img)
					form.attachment = await global.utils.getStreamFromURL(img);
				message.reply(form);
			} catch (e) {
				message.reply(`⛔ 𝗡𝗢 𝗔𝗡𝗜𝗠𝗘 𝗚𝗜𝗥𝗟 𝗙𝗢𝗨𝗡𝗗\n┏━━━━━━━━━━━━❀\n😘 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐖𝐢𝐟𝐞 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲\n➤ waifu\n➤ neko\n➤ shinobu\n➤ megumin\n➤ bully\n➤ cuddle\n➤ cry\n➤ kiss\n➤ lick\n➤ hug\n➤ awoo\n➤ pat\n➤ smug\n➤ bonk\n➤ yeet\n ➤ blush\n➤ smile\n➤ wave\n➤ highfive \n➤ handhold\n➤ nom\n➤ bite glomp\n➤ slap\n➤ kill\n➤ kick\n➤ happy\n➤ wink\n➤ poke\n➤ dance\n➤ cringe\n\n🍒 𝐂𝐡𝐨𝐨𝐬𝐞 𝐨𝐧𝐞 𝐚𝐧𝐢𝐦𝐞 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲\n┗━━━━━━━━━━━━❀`)
			}


		else {

			try {
				let res = await axios.get(`https://api.waifu.pics/sfw/${name}`)


				let res2 = res.data
				let img1 = res2.url

				const form = {
					body: `💙 𝗥𝗔𝗡𝗗𝗢𝗠 𝗔𝗡𝗜𝗠𝗘 𝗚𝗜𝗥𝗟 𝗣𝗜𝗖\n┏━━━━━━━━━━━━❀\n🍒 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐲𝐨𝐮𝐫 𝐂𝐮𝐭𝐞 𝐖𝐢𝐟𝐞 \n🤩 𝐈 𝐡𝐨𝐩𝐞 𝐘𝐨𝐮 𝐥𝐨𝐯𝐞 𝐢𝐭 \n😘 𝐄𝐧𝐣𝐨𝐲 𝐖𝐢𝐭𝐡 𝐘𝐨𝐮𝐫 𝐂𝐮𝐭𝐞 𝐖𝐢𝐟𝐞\n👑 𝐑𝐚𝐧𝐝𝐨𝐦 𝐋𝐨𝐯𝐞 𝐐𝐮𝐨𝐭𝐞\n➤ 𝖫𝗈𝗏𝖾 𝗂𝗌 𝗅𝗂𝗄𝖾 𝖺 𝖿𝗅𝗈𝗐𝖾𝗋; 𝗂𝗍 𝗇𝖾𝖾𝖽𝗌 𝗍𝗈 𝖻𝖾 𝗐𝖺𝗍𝖾𝗋𝖾𝖽 𝗐𝗂𝗍𝗁 𝖼𝖺𝗋𝖾 𝖺𝗇𝖽 𝖺𝗍𝗍𝖾𝗇𝗍𝗂𝗈𝗇🌹🌷\n┗━━━━━━━━━━━━❀`

				};
				if (img1)
					form.attachment = await global.utils.getStreamFromURL(img1);
				message.reply(form);
			} catch (e) { message.reply(`⛔ 𝗡𝗢 𝗔𝗡𝗜𝗠𝗘 𝗚𝗜𝗥𝗟 𝗙𝗢𝗨𝗡𝗗\n┏━━━━━━━━━━━━❀\n😘 𝐇𝐞𝐫𝐞 𝐢𝐬 𝐖𝐢𝐟𝐞 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲\n➤ waifu\n➤ neko\n➤ shinobu\n➤ megumin\n➤ bully\n➤ cuddle\n➤ cry\n➤ kiss\n➤ lick\n➤ hug\n➤ awoo\n➤ pat\n➤ smug\n➤ bonk\n➤ yeet\n ➤ blush\n➤ smile\n➤ wave\n➤ highfive \n➤ handhold\n➤ nom\n➤ bite glomp\n➤ slap\n➤ kill\n➤ kick\n➤ happy\n➤ wink\n➤ poke\n➤ dance\n➤ cringe\n\n🍒 𝐂𝐡𝐨𝐨𝐬𝐞 𝐨𝐧𝐞 𝐚𝐧𝐢𝐦𝐞 𝐜𝐚𝐭𝐞𝐠𝐨𝐫𝐲\n┗━━━━━━━━━━━━❀`) }

		}
	}
};