async function checkShortCut(nickname, uid, usersData) {
	try {
		/\{userName\}/gi.test(nickname) ? nickname = nickname.replace(/\{userName\}/gi, await usersData.getName(uid)) : null;
		/\{userID\}/gi.test(nickname) ? nickname = nickname.replace(/\{userID\}/gi, uid) : null;
		return nickname;
	}
	catch (e) {
		return nickname;
	}
}

module.exports = {
	config: {
		name: "setname",
		version: "1.3",
		author: "Rômeo",
		countDown: 1,
		role: 0,
		shortDescription: {
			en: "Change nickname"
		},
		longDescription: {
			en: "Change nickname of all members in chat or members tagged by a format"
		},
		category: "box chat",
		guide: {
			en: {
				body: "   {pn} <nick name>: change nickname of yourself"
					+ "\n   {pn} @tags <nick name>: change nickname of members tagged"
					+ "\n   {pn} all <nick name>: change nickname of all members in chat"
					+ "\n\nWith available shortcuts:"
					+ "\n   + {userName}: name of member"
					+ "\n   + {userID}: ID of member"
					+ "\n\n   Example: (see image)",
				attachment: {
					[`${__dirname}/assets/guide/setname_1.png`]: "https://i.ibb.co/gFh23zb/guide1.png",
					[`${__dirname}/assets/guide/setname_2.png`]: "https://i.ibb.co/BNWHKgj/guide2.png"
				}
			}
		}
	},

	langs: {
		en: {
			error: "⛔ 𝗙𝗔𝗜𝗟𝗘𝗗 𝗧𝗢 𝗦𝗘𝗧 𝗡𝗔𝗠𝗘\n┏━━━━━━━━━━━━❀\n➤ An error has occurred, try turning off the invite link feature in the group and try again later\n┗━━━━━━━━━━━━❀"
		}
	},

	onStart: async function ({ args, message, event, api, usersData, getLang }) {
		const mentions = Object.keys(event.mentions);
		let uids = [];
		let nickname = args.join(" ");

		if (args[0] === "all" || mentions.includes(event.threadID)) {
			uids = (await api.getThreadInfo(event.threadID)).participantIDs;
			nickname = args[0] === "all" ? args.slice(1).join(" ") : nickname.replace(event.mentions[event.threadID], "").trim();
		}
		else if (mentions.length) {
			uids = mentions;
			const allName = new RegExp(Object.values(event.mentions).join("|"), "g");
			nickname = nickname.replace(allName, "").trim();
		}
		else {
			uids = [event.senderID];
			nickname = nickname.trim();
		}

		try {
			const uid = uids.shift();
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
		}
		catch (e) {
			return message.reply(getLang("error"));
		}

		for (const uid of uids)
			await api.changeNickname(await checkShortCut(nickname, uid, usersData), event.threadID, uid);
	}
};