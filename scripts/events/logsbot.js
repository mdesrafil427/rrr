const fs = require("fs");

const approvedThreadsFile = "threadApproved.json";

function loadApprovedThreads() {
  try {
    const data = fs.readFileSync(approvedThreadsFile);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading approved threads data:", err);
    return [];
  }
}

const vipFilePath = "vip.json";

function loadVIPData() {
  try {
    const data = fs.readFileSync(vipFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error loading VIP data:", err);
    return {};
  }
}

function saveVIPData(data) {
  try {
    fs.writeFileSync(vipFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error saving VIP data:", err);
  }
}

// Load VIP data
const vipData = loadVIPData();

const { getTime } = global.utils;

module.exports = {
  config: {
    name: "logsbot",
    isBot: true,
    version: "1.4",
    author: "NTKhang",
    envConfig: {
      allow: true,
    },
    category: "events",
  },

  langs: {
    vi: {
      title: "====== Nhật ký bot ======",
      added: "\n✅\nSự kiện: bot được thêm vào nhóm mới\n- Người thêm: %1",
      kicked: "\n❌\nSự kiện: bot bị kick\n- Người kick: %1",
      footer: "\n- User ID: %1\n- Nhóm: %2\n- ID nhóm: %3\n- Thời gian: %4",
    },
    en: {
      title: "━━━━━━━━━━━━━━━━━━━━━\n❍ 𝗡𝗘𝗪 𝗧𝗛𝗥𝗘𝗔𝗗 ❍━━━━━━━━━━━━━━━━━━━━━",
      added: "\n\n✅ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗢𝗡 ➤ 𝖮𝗋𝗈𝖼𝗁𝗂 𝖧𝖺𝗌 𝖡𝖾𝖾𝗇 𝖠𝖽𝖽𝖾𝖽 𝖳𝗈 𝖭𝖾𝗐 𝖦𝗋𝗈𝗎𝗉\n\n😗 𝗔𝗗𝗗𝗘𝗗 𝗕𝗬\n➤【 %1 】",
      kicked: "\n\n❌ 𝗜𝗡𝗙𝗢𝗥𝗠𝗔𝗧𝗜𝗡 \n\n➤  𝖮𝗋𝗈𝖼𝗁𝗂 𝖧𝖺𝗌 𝖡𝖾𝖾𝗇 𝖪𝗂𝖼𝗄𝖾𝖽\n\n⛔ 𝗞𝗜𝗖𝗞𝗘𝗗 𝗕𝗬 \n➤【 %1 】 ",
      footer: "\n\🍒 𝗨𝗦𝗘𝗥 𝗨𝗜𝗗\n➤  【 %1 】\n❣️ 𝗚𝗥𝗢𝗨𝗣 𝗡𝗔𝗠𝗘 \n➤【 %2 】\n💌 𝗚𝗥𝗢𝗨𝗣 𝗨𝗜𝗗 \n➤【 %3 】\n⏰ 𝗧𝗜𝗠𝗘 \n➤【 %4 】",
    },
  },

  onStart: async ({ usersData, threadsData, event, api, getLang }) => {
    const processLogEvent = async function () {
      let msg = getLang("title");
      const { author, threadID } = event;
      if (author == api.getCurrentUserID()) return;

      // Load the list of approved threads
      const approvedThreads = loadApprovedThreads();
      let threadName;
      const { config } = global.GoatBot;

      if (
        (event.logMessageType == "log:subscribe" &&
          event.logMessageData.addedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) ||
        (event.logMessageType == "log:unsubscribe" && event.logMessageData.leftParticipantFbId == api.getCurrentUserID())
      ) {
        if (event.logMessageType == "log:subscribe") {
          if (!event.logMessageData.addedParticipants.some((item) => item.userFbId == api.getCurrentUserID())) return;
          threadName = (await api.getThreadInfo(threadID)).threadName;
          const authorName = await usersData.getName(author);
          msg += getLang("added", authorName);

          // Check if the thread is in the approved list
          if (approvedThreads.includes(threadID)) {
            msg += "\n\n✅ 𝗔𝗣𝗣𝗥𝗢𝗩𝗘𝗗 𝗚𝗥𝗢𝗨𝗣\nThis is an approved thread.";
          } else {
            msg += "\n\n⛔ 𝗡𝗢𝗧 𝗔𝗣𝗣𝗥𝗢𝗩𝗘𝗗 𝗚𝗖\nThis thread is not approved.";
          }
        } else if (event.logMessageType == "log:unsubscribe") {
          if (event.logMessageData.leftParticipantFbId != api.getCurrentUserID()) return;
          const authorName = await usersData.getName(author);
          const threadData = await threadsData.get(threadID);
          threadName = threadData.threadName;
          msg += getLang("kicked", authorName);
        }
        const time = getTime("DD/MM/YYYY HH:mm:ss");
        msg += getLang("footer", author, threadName, threadID, time);

        for (const adminID of config.adminBot) api.sendMessage(msg, adminID);

        // Send logs to users in vipData
        for (const vipUserID in vipData) {
          if (vipData.hasOwnProperty(vipUserID)) {
            api.sendMessage(msg, vipUserID);
          }
        }
      }
    };

    processLogEvent();
  },
};
