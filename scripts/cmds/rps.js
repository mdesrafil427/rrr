module.exports = {
 config: {
 name: "rps",
 version: "1.0",
 author: "Rômeo",
 shortDescription: "Play rock-paper-scissors game with the bot.",
 category: "fun",
 guide: "{prefix}rps <rock|paper|scissors>"
 },
 onStart: async function ({ message, args }) {
 const choices = ["rock", "paper", "scissors"];
 const userChoice = args[0];
 if (!userChoice || !choices.includes(userChoice.toLowerCase())) {
 return message.reply("💬 𝗖𝗛𝗢𝗢𝗦𝗘 𝗢𝗡𝗘\n┏━━━━━━━━━━━━❀\nPlease choose either \n➤ rock ✊ \n➤ paper ✋\n➤ scissors! ✌️\n┗━━━━━━━━━━━━❀");
 }

 const botChoice = choices[Math.floor(Math.random() * choices.length)];

 message.reply(`👑 𝗥,𝗣,𝗖 𝗥𝗘𝗦𝗨𝗟𝗧\n┏━━━━━━━━━━━━❀\n𝐘𝐨𝐮 𝐂𝐡𝐨𝐨𝐬𝐞\n➤ ${userChoice} \n\n𝐈 𝐂𝐡𝐨𝐨𝐬𝐞\n➤ ${botChoice}\n┗━━━━━━━━━━━━❀`);

 if (userChoice.toLowerCase() === botChoice) {
 message.reply("𝗥.𝗣.𝗦 𝗥𝗘𝗦𝗨𝗟𝗧\n┏━━━━━━━━━━━━❀\n 🤝 It's a tie!\n┗━━━━━━━━━━━━❀");
 } else if (
 (userChoice.toLowerCase() === "rock" && botChoice === "scissors") ||
 (userChoice.toLowerCase() === "paper" && botChoice === "rock") ||
 (userChoice.toLowerCase() === "scissors" && botChoice === "paper")
 ) {
 message.reply("Congratulations! You won!");
 } else {
 message.reply("I win! Better luck next time!");
 }
 },
};module.exports = {
 config: {
 name: "rps",
 version: "1.0",
 author: "Orochi Team",
 shortDescription: "Play rock-paper-scissors game with the bot using emoji.",
 category: "fun",
 guide: "{prefix}rps <✊|✋|✌️>"
 },
 onStart: async function ({ message, args }) {
 const choices = ["✊", "✋", "✌️"];
 const userChoice = args[0];
 if (!userChoice || !choices.includes(userChoice)) {
 return message.reply("💬 𝗖𝗛𝗢𝗢𝗦𝗘 𝗢𝗡𝗘\n┏━━━━━━━━━━━━❀\nPlease choose either \n➤ rock ✊ \n➤ paper ✋\n➤ scissors! ✌️\n┗━━━━━━━━━━━━❀");
 }

 const botChoice = choices[Math.floor(Math.random() * choices.length)];

 message.reply(`👑 𝗥,𝗣,𝗖 𝗥𝗘𝗦𝗨𝗟𝗧\n┏━━━━━━━━━━━━❀\n𝐘𝐨𝐮 𝐂𝐡𝐨𝐨𝐬𝐞\n➤ ${userChoice} \n\n𝐈 𝐂𝐡𝐨𝐨𝐬𝐞\n➤ ${botChoice}\n┗━━━━━━━━━━━━❀`);

 if (userChoice === botChoice) {
 message.reply("🎲 𝗥.𝗣.𝗦 𝗥𝗘𝗦𝗨𝗟𝗧\n┏━━━━━━━━━━━━❀\n 🤝 It's a tie!\n┗━━━━━━━━━━━━❀");
 } else if (
 (userChoice === "✊" && botChoice === "✌️") ||
 (userChoice === "✋" && botChoice === "✊") ||
 (userChoice === "✌️" && botChoice === "✋")
 ) {
 message.reply("🥰 𝗥.𝗣.𝗦 𝗥𝗘𝗦𝗨𝗟𝗧\n┏━━━━━━━━━━━━❀\n➤ 🎉Congratulations! You won!\n┗━━━━━━━━━━━━❀");
 } else {
 message.reply("😢 𝗥𝗣𝗦 𝗥𝗘𝗦𝗨𝗟𝗧\n┏━━━━━━━━━━━━❀\n➤ I win! Better luck next time!\n┗━━━━━━━━━━━━❀");
 }
 },
};