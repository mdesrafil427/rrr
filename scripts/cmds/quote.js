const axios = require('axios');
module.exports = {
 config: {
 name: "quote",
 author: "Rômeo",
 countDown: 1,
 role: 0,
 category: "boxchat",
 shortDescription: {
 en: "Get a random quote from a specific category",
 },
 },
 onStart: async function ({ api, event, args, message }) {
 try {
 if (!args[0]) {
   return api.sendMessage("📒 𝗤𝗨𝗢𝗧𝗘 𝗖𝗔𝗧𝗘𝗚𝗢𝗥𝗬\n┏━━━━━━━━━━━━❀\n👉 Please provide a category. Here are the available categories\n➤ age\n➤ alone\n➤ amazing\n➤ anger\n➤ architecture\n➤ art,\n➤ attitude,\n➤ beauty\n➤ best\n➤ birthday\n➤ business\n➤ car,\n➤ change,\n➤ communications,\n➤ computers\n➤ cool\n➤ courage,\n➤ dad,\n dating,\n➤ death\n, design,\n➤ dreams\n➤ education\n➤ environmental,\n➤ equality\n➤ experience\n➤ failure,\n➤ faith\n, family\n, famous\n➤ fear\n➤ fitness\n┗━━━━━━━━━━━━❀", event.threadID);
 }
 const category = args[0].toLowerCase();
 const response = await axios.get(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
 headers: {
 'X-Api-Key': 'A4drPDSMtprpmTnd1bEJ0w==5NZP88tykb5fXsVL'
 }
 });
 if (response.data.length === 0) {
   return api.sendMessage("No quotes found for this category. Please choose another one.", event.threadID);
 }
 const quote = response.data[0].quote;
 const author = response.data[0].author;
 const message = `🥀 𝗬𝗢𝗨𝗥 𝗤𝗨𝗢𝗧𝗘\n┏━━━━━━━━━━━━❀\n𝐐𝐮𝐨𝐭𝐞 \n➤ ${quote} \n𝐐𝐮𝐨𝐭𝐞 𝐀𝐮𝐭𝐡𝐨𝐫\n➤ ${author}\n┗━━━━━━━━━━━━❀`;
 return api.sendMessage(message, event.threadID);
 } catch (error) {
 console.error(error);
 }
 },
}