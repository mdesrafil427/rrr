const axios = require('axios');

module.exports.config = {
  name: "tempmail",
  aliases: ["tm"],
  version: "1.0",
  role: 0,
  countdown: 1,
  author: "Orochi Team",
  usePrefix: true,
  description: "create tempmail",
  category: "media",
};

const TEMP_MAIL_URL = 'https://api-samir.onrender.com/tempmail/get';

module.exports.onStart = async ({ api, event, args }) => {
  try {
    if (args[0] === 'inbox') {
      if (!args[1]) {
        return api.sendMessage("⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗧𝗘𝗠𝗣𝗠𝗔𝗜𝗟\n\n❍➤ Please provide an email address for the inbox\n\n♻️ 𝗠𝗔𝗜𝗟 𝗗𝗘𝗧𝗔𝗜𝗟𝗦\n❍➤ Your Temporary mail is created under on\n🛶 𝗪𝗘𝗕 𝗨𝗥𝗟\n❍➤ https://temp-mail.org", event.threadID);
      }

      const emailAddress = args[1];
      const inboxResponse = await axios.get(`https://api-samir.onrender.com/tempmail/inbox/${emailAddress}`);
      const messages = inboxResponse.data.messages;

      if (!messages || messages.length === 0) {
        return api.sendMessage(`⛔ 𝗡𝗢 𝗗𝗔𝗧𝗔 𝗙𝗢𝗨𝗡𝗗\n\n❍➤ No messages found in your currently temporary e-tempmail\n\n📊 𝗬𝗢𝗨𝗥 𝗠𝗔𝗜𝗟 \n🎀 ${emailAddress}\n\n♻️ 𝗠𝗔𝗜𝗟 𝗗𝗘𝗧𝗔𝗜𝗟𝗦\n❍➤ Your Temporary mail is created under on\n🛶 𝗪𝗘𝗕 𝗨𝗥𝗟\n❍➤ https://temp-mail.org`, event.threadID);
      }

      let messageText = '📬 IᑎᗷO᙭ ᗰᗴՏՏᗩᘜᗴ 📬\n\n';
      for (const message of messages) {
        messageText += `💎 Տᗴᑎᗪᗴᖇ ᗪᗴTᗩIᒪՏ\n\n${message.sender}\n`;
        messageText += `♂️ ᗰᗩIᒪ ՏᑌᗷᒍᗴᑕT\n\n ${message.subject || '👉 NO SUBJECT'}\n`;
        messageText += `♻️ ᗰᗩIᒪ IᑎᖴOᖇᗰᗩTIOᑎ\n\n ${message.message.replace(/<style([\s\S]*?)<\/style>|<script([\s\S]*?)<\/script>|<\/div>|<div>|<[^>]*>/gi, '')}\n\n`;
      }

      api.sendMessage(messageText, event.threadID);
    } else {
      const tempMailResponse = await axios.get(TEMP_MAIL_URL);
      const tempMailData = tempMailResponse.data;

      if (!tempMailData.email) {
        return api.sendMessage("⛔𝗘𝗥𝗥𝗢𝗥 𝗙𝗢𝗨𝗡𝗗\n\n❍➤ Failed to generate temporary email\n\n♻️ 𝗠𝗔𝗜𝗟 𝗗𝗘𝗧𝗔𝗜𝗟𝗦\n❍➤ Your Temporary mail is created under on\n🛶 𝗪𝗘𝗕 𝗨𝗥𝗟\n❍➤ https://temp-mail.org", event.threadID);
      }

      api.sendMessage(`📍 𝗧𝗘𝗠𝗣𝗢𝗥𝗔𝗥𝗬 𝗠𝗔𝗜𝗟\n\n❍➤ ՏᑌᑕᑕᗴՏՏᖴᑌᒪᒪY ᘜᗴᑎᗴᖇᗩTᗴᗪ YOYᖇ TᗴᗰᑭOᖇᗩᖇY ᗴ-TᗴᗰᑭᗰᗩIᒪ\n\n📊 𝗠𝗔𝗜𝗟\n❍➤ ${tempMailData.email}\n\n♻️ 𝗠𝗔𝗜𝗟 𝗗𝗘𝗧𝗔𝗜𝗟𝗦\n❍➤ Your Temporary mail is created under on\n🛶 𝗪𝗘𝗕 𝗨𝗥𝗟\n❍➤ https://temp-mail.org`, event.threadID);
    }
  } catch (error) {
    console.error('Error:', error);
    api.sendMessage("📩 𝗧𝗘𝗠𝗣𝗠𝗔𝗜𝗟 𝗜𝗡𝗕𝗢𝗫\n\n❍➤ No messages found in the current email)\n\n♻️ 𝗠𝗔𝗜𝗟 𝗗𝗘𝗧𝗔𝗜𝗟𝗦\n❍➤ Your Temporary mail is created under on\n🛶 𝗪𝗘𝗕 𝗨𝗥𝗟\n❍➤ https://temp-mail.org", event.threadID);
  }
};