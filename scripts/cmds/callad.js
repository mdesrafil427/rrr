const { getStreamsFromAttachment, log } = global.utils;
const mediaTypes = ["photo", 'png', "animated_image", "video", "audio"];

module.exports = {
  config: {
    name: "callad",
    version: "1.0",
    author: "Rômeo",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "send message to admin bot"
    },
    longDescription: {
      en: "send report, feedback, bug,... to admin bot"
    },
    category: "contacts admin",
    guide: {
      en: "   {pn} <message>"
    }
  },

  langs: {
    en: {
      missingMessage: "⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗜𝗡𝗣𝗨𝗧\n┏━━━━━━━━━━━━❀\n✅ Please enter the message you want to send to admins\n┗━━━━━━━━━━━━❀",
      sendByGroup: "👑 𝗚𝗥𝗢𝗨𝗣 𝗙𝗘𝗘𝗗𝗕𝗔𝗖𝗞\n┏━━━━━━━━━━━━❀\n📍𝐅𝐞𝐞𝐝𝐁𝐚𝐜𝐤 𝐅𝐫𝐨𝐦 𝐆𝐫𝐨𝐮𝐩\n𝐆𝐫𝐨𝐮𝐩 𝐍𝐚𝐦𝐞\n➤ %1\n𝐆𝐫𝐨𝐮𝐩 𝐓𝐈𝐃\n➤ %2\n┗━━━━━━━━━━━━❀",
      sendByUser: "📍𝗨𝗦𝗘𝗥 𝗙𝗘𝗘𝗗𝗕𝗔𝗖𝗞\n┏━━━━━━━━━━━━❀\n💘 𝐒𝐞𝐧𝐝 𝐅𝐫𝐨𝐦 𝐔𝐬𝐞𝐫",
      content: "\n\n💜 𝐔𝐬𝐞𝐫 𝐅𝐞𝐞𝐝𝐁𝐚𝐜𝐤 𝐌𝐞𝐬𝐬𝐚𝐠𝐞\n━━━━━━━━━━━━━━━\n➤ %1\n━━━━━━━━━━━━━━━\nReply this message to send message to user\n┗━━━━━━━━━━━━❀",
      success: "✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗦𝗘𝗡𝗗\n┏━━━━━━━━━━━━❀\nSent your message \n𝐓𝐨 𝐀𝐝𝐦𝐢𝐧 \n➤ %1 \nSend message to admin successfully!\n%2\n┗━━━━━━━━━━━━❀",
      failed: "⛔ 𝗘𝗥𝗥𝗢𝗥 𝗙𝗢𝗨𝗡𝗗\n┏━━━━━━━━━━━━❀\nAn error occurred while sending your message to\n➤ %1 \nAdmin\n➤ %2\n👑 Check console for more details\n┗━━━━━━━━━━━━❀",
      reply: "😱 𝗔𝗗𝗠𝗜𝗡 𝗥𝗘𝗣𝗟𝗬\n┏━━━━━━━━━━━━❀\n📌𝐀𝐝𝐦𝐢𝐧 𝐅𝐞𝐞𝐝𝐛𝐚𝐜𝐤\n💜 𝐀𝐝𝐦𝐢𝐧 𝐍𝐚𝐦𝐞\n➤ %1:\n━━━━━━━━━━━━━━━\n➤ %2\n━━━━━━━━━━━━━━━\n➤ 💎 Reply this message to continue send message to admin\n┗━━━━━━━━━━━━❀",
      replySuccess: "✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗦𝗘𝗡𝗗\n┏━━━━━━━━━━━━❀\n➤ Sent your reply to admin successfully!\n┗━━━━━━━━━━━━❀",
      feedback: "👑 𝗙𝗘𝗘𝗗𝗙𝗔𝗖𝗞 𝗙𝗥𝗢𝗠 𝗨𝗦𝗘𝗥\n┏━━━━━━━━━━━━❀\n📝 Feedback from user\n𝗨𝗦𝗘𝗥 𝗡𝗔𝗠𝗘  \n➤ %1:\n𝗨𝗦𝗘𝗥 𝗨𝗜𝗗\n➤ %2%3\n𝗨𝗦𝗘𝗥 𝗙𝗘𝗘𝗗𝗕𝗔𝗖𝗞\n━━━━━━━━━━━━━━━\n➤ %4\n━━━━━━━━━━━━━━━\n➤ Reply this message to send message to user\n┗━━━━━━━━━━━━❀",
      replyUserSuccess: "✅ 𝗦𝗨𝗖𝗖𝗘𝗦𝗦𝗙𝗨𝗟𝗟𝗬 𝗦𝗘𝗡𝗗\n┏━━━━━━━━━━━━❀\n➤ 🟡 Sent your reply to user successfully!\n┗━━━━━━━━━━━━❀",
      noAdmin: "𝗡𝗢 𝗔𝗗𝗠𝗜𝗡𝗦 𝗙𝗢𝗨𝗡𝗗\n\nBot has no admin at the moment"
    }
  },

  onStart: async function ({ args, message, event, usersData, threadsData, api, commandName, getLang }) {
    const { config } = global.GoatBot;
    if (!args[0])
      return message.reply(getLang("missingMessage"));
    const { senderID, threadID, isGroup } = event;
    if (config.adminBot.length == 0)
      return message.reply(getLang("noAdmin"));
    const senderName = await usersData.getName(senderID);
    const msg = "━━━━━━━━━━━━━━━\n📍𝗖𝗔𝗟𝗟 𝗔𝗗𝗠𝗜𝗡𝗦\n━━━━━━━━━━━━━━━"
      + `\n👑 𝗦𝗘𝗡𝗗𝗘𝗥 𝗡𝗔𝗠𝗘\n➤ ${senderName}`
      + `\n⚙️ 𝗦𝗘𝗡𝗗𝗘𝗥 𝗨𝗜𝗗\n➤ ${senderID}`
      + (isGroup ? getLang("sendByGroup", (await threadsData.get(threadID)).threadName, threadID) : getLang("sendByUser"));

    const formMessage = {
      body: msg + getLang("content", args.join(" ")),
      mentions: [{
        id: senderID,
        tag: senderName
      }],
      attachment: await getStreamsFromAttachment(
        [...event.attachments, ...(event.messageReply?.attachments || [])]
          .filter(item => mediaTypes.includes(item.type))
      )
    };

    const successIDs = [];
    const failedIDs = [];
    const adminNames = await Promise.all(config.adminBot.map(async item => ({
      id: item,
      name: await usersData.getName(item)
    })));

    for (const uid of config.adminBot) {
      try {
        const messageSend = await api.sendMessage(formMessage, uid);
        successIDs.push(uid);
        global.GoatBot.onReply.set(messageSend.messageID, {
          commandName,
          messageID: messageSend.messageID,
          threadID,
          messageIDSender: event.messageID,
          type: "userCallAdmin"
        });
      }
      catch (err) {
        failedIDs.push({
          adminID: uid,
          error: err
        });
      }
    }

    let msg2 = "";
    if (successIDs.length > 0)
      msg2 += getLang("success", successIDs.length,
        adminNames.filter(item => successIDs.includes(item.id)).map(item => ` <@${item.id}> (${item.name})`).join("\n")
      );
    if (failedIDs.length > 0) {
      msg2 += getLang("failed", failedIDs.length,
        failedIDs.map(item => ` <@${item.adminID}> (${adminNames.find(item2 => item2.id == item.adminID)?.name || item.adminID})`).join("\n")
      );
      log.err("CALL ADMIN", failedIDs);
    }
    return message.reply({
      body: msg2,
      mentions: adminNames.map(item => ({
        id: item.id,
        tag: item.name
      }))
    });
  },

  onReply: async ({ args, event, api, message, Reply, usersData, commandName, getLang }) => {
    const { type, threadID, messageIDSender } = Reply;
    const senderName = await usersData.getName(event.senderID);
    const { isGroup } = event;

    switch (type) {
      case "userCallAdmin": {
        const formMessage = {
          body: getLang("reply", senderName, args.join(" ")),
          mentions: [{
            id: event.senderID,
            tag: senderName
          }],
          attachment: await getStreamsFromAttachment(
            event.attachments.filter(item => mediaTypes.includes(item.type))
          )
        };

        api.sendMessage(formMessage, threadID, (err, info) => {
          if (err)
            return message.err(err);
          message.reply(getLang("replyUserSuccess"));
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            messageIDSender: event.messageID,
            threadID: event.threadID,
            type: "adminReply"
          });
        }, messageIDSender);
        break;
      }
      case "adminReply": {
        let sendByGroup = "";
        if (isGroup) {
          const { threadName } = await api.getThreadInfo(event.threadID);
          sendByGroup = getLang("sendByGroup", threadName, event.threadID);
        }
        const formMessage = {
          body: getLang("feedback", senderName, event.senderID, sendByGroup, args.join(" ")),
          mentions: [{
            id: event.senderID,
            tag: senderName
          }],
          attachment: await getStreamsFromAttachment(
            event.attachments.filter(item => mediaTypes.includes(item.type))
          )
        };

        api.sendMessage(formMessage, threadID, (err, info) => {
          if (err)
            return message.err(err);
          message.reply(getLang("replySuccess"));
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            messageIDSender: event.messageID,
            threadID: event.threadID,
            type: "userCallAdmin"
          });
        }, messageIDSender);
        break;
      }
      default: {
        break;
      }
    }
  }
};