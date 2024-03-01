const axios = require('axios');

module.exports = {
	config: {
		name: "joke",
		version: "1.0",
		author: "Rômeo",
		countDown: 0,
		role: 0,
		shortDescription: {
			en: "Gets a random pun joke."
		},
		longDescription: {
			en: "Gets a random pun joke from JokeAPI (https://jokeapi.dev/)."
		},
		category: "fun",
		guide: "",
	},

	onStart: async function ({ message, event }) {
		try {
			const jokeResponse = await axios.get('https://v2.jokeapi.dev/joke/pun');
			const joke = jokeResponse.data;

			if (joke.type === 'single') {
				message.reply(joke.joke);
			} else if (joke.type === 'twopart') {
				message.reply(`😅 𝗥𝗔𝗡𝗗𝗢𝗠 𝗝𝗢𝗞𝗘\n\n┏━━━━━━━━━━━━━❀\n➤ ${joke.setup}\n\n➤ ${joke.delivery}\n┗━━━━━━━━━━━━━❀`);
			}
		} catch (error) {
			console.log(error);
			message.reply("⛔ 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\n\n┏━━━━━━━━━━━━━❀\n➤ Sorry, I couldn't think of a joke right now.\n┗━━━━━━━━━━━━━❀");
		}
	}
};