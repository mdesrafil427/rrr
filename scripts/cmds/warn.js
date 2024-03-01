const { getTime } = global.utils;

module.exports = {
  config: {
    name: "warn",
    version: "2.0",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "warn group users"
    },
    longDescription: {
      en: "warn member in group, if they have 3 warns, they will be banned"
    },
    category: "box chat",
    guide: {
      en: "   {pn} @tag <reason>: warn member"
        + "\n   {pn} list: view list of warned members"
        + "\n   {pn} listban: view list of banned members"
        + "\n   {pn} info [@tag | <uid> | reply | leave blank]: view warning information of tagged person or uid or yourself"
        + "\n   {pn} unban [@tag | <uid> | reply | leave blank]: unban member, at the same time remove all warnings of that member"
        + "\n   {pn} unwarn [@tag | <uid> | reply | leave blank] [<number> | leave blank]: remove warning of member by uid and number of warning, if leave blank will remove the last warning"
        + "\n   {pn} reset: reset all warn data"
        + "\n⚠️ You need to set admin for bot to auto kick banned members"
    }
  },

  langs: {
    en: {
      list: "📚 𝗪𝗔𝗥𝗡𝗘𝗗 𝗨𝗦𝗘𝗥𝗦 𝗟𝗜𝗦𝗧\n┏━━━━━━━━━━━━━━❀\n➤ List of members who have been warned:\n➤ %1\n\nTo view the details of the warnings, use the \"%2warn info [@tag | <uid> | leave blank]\" command: to view the warning information of the tagged person or uid or yourself \n┗━━━━━━━━━━━━━━❀",
      listBan: "📒 𝗕𝗔𝗡𝗡𝗘𝗗 𝗨𝗦𝗘𝗥 𝗟𝗜𝗦𝗧\n┏━━━━━━━━━━━━━━❀\nList of members who have been warned 3 times and banned from the box\n\n➤ %1\n┗━━━━━━━━━━━━━━❀",
      listEmpty: "❌ 𝗡𝗢 𝗪𝗔𝗥𝗡 𝗟𝗜𝗦𝗧\n┏━━━━━━━━━━━━━━❀\n➤ Your group has no members who have been warned\n┗━━━━━━━━━━━━━━❀",
      listBanEmpty: "🔴 𝗡𝗢 𝗕𝗔𝗡 𝗨𝗦𝗘𝗥𝗦 𝗟𝗜𝗦𝗧\n\n➤ Your group has no members banned from the box",
      invalidUid: "❌ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗜𝗗\n┏━━━━━━━━━━━━━━❀\nPlease enter a valid uid of the person you want to view information\n┗━━━━━━━━━━━━━━❀",
      noData: "No data",
      noPermission: "⛔ 𝗡𝗢 𝗣𝗘𝗥𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n┏━━━━━━━━━━━━━━❀\n❌ Only group administrators can unban members banned from the box\n┗━━━━━━━━━━━━━━❀",
      invalidUid2: "❌ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗜𝗗\n┏━━━━━━━━━━━━━━❀\n⚠️ Please enter a valid uid of the person you want to unbanned\n┗━━━━━━━━━━━━━━❀",
      notBanned: "⛔ 𝗨𝗦𝗘𝗥 𝗡𝗢𝗧 𝗕𝗔𝗡\n┏━━━━━━━━━━━━━━❀\n⚠️ The user with id %1 has not been banned from your box\n┗━━━━━━━━━━━━━━❀",
      unbanSuccess: "🌼 𝗨𝗡𝗕𝗔𝗡𝗘𝗗 𝗨𝗦𝗘𝗥\n┏━━━━━━━━━━━━━━❀\n✅ Successfully unbanned member [%1 | %2], currently this person can join your chat box\n┗━━━━━━━━━━━━━━❀",
      noPermission2: "⛔ 𝗡𝗢 𝗣𝗥𝗘𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n┏━━━━━━━━━━━━━━❀\n❌ Only group administrators can remove warnings from members in the Group\n┗━━━━━━━━━━━━━━❀",
      invalidUid3: "❌ 𝗜𝗡𝗩𝗔𝗜𝗟𝗘𝗗 𝗧𝗔𝗚\n┏━━━━━━━━━━━━━━❀\n⚠️ Please enter a uid or tag the person you want to remove the warning\n┗━━━━━━━━━━━━━━❀",
      noData2: "✨ 𝗡𝗢 𝗪𝗔𝗥𝗡𝗜𝗡𝗚\n┏━━━━━━━━━━━━━━❀\n⚠️ The user with id %1 has no warning Data\n┗━━━━━━━━━━━━━━❀",
      notEnoughWarn: "⚙️ 𝗨𝗦𝗘𝗥 𝗪𝗔𝗥𝗡𝗜𝗡𝗚 𝗖𝗢𝗨𝗡𝗧\n┏━━━━━━━━━━━━━━❀\n❌ The user %1 only has %2 warnings\n┗━━━━━━━━━━━━━━❀",
      unwarnSuccess: "✨ 𝗨𝗡𝗪𝗔𝗥𝗡𝗘𝗗 𝗨𝗦𝗘𝗥\n┏━━━━━━━━━━━━━━❀\n✅ Successfully removed the %1 warning of member [%2 | %3]\n┗━━━━━━━━━━━━━━❀",
      noPermission3: "🛑 𝗡𝗢 𝗣𝗘𝗥𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n┏━━━━━━━━━━━━━━❀\n❌ Only group administrators can reset warning data\n┗━━━━━━━━━━━━━━❀",
      resetWarnSuccess: "🔘 𝗥𝗘𝗦𝗘𝗧𝗘𝗗 𝗪𝗔𝗥𝗡𝗜𝗡𝗚\n┏━━━━━━━━━━━━━━❀\n✅ Successfully reset warning data\n┗━━━━━━━━━━━━━━❀",
      noPermission4: "🛑 𝗡𝗢 𝗣𝗥𝗘𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n┏━━━━━━━━━━━━━━❀\n❌ Only group administrators can warn members in the group\n┗━━━━━━━━━━━━━━❀",
      invalidUid4: "❌ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗨𝗦𝗘𝗚𝗦\n┏━━━━━━━━━━━━━━❀\n⚠️ You need to tag or reply to the message of the person you want to warn\n┗━━━━━━━━━━━━━━❀",
      warnSuccess: "✅ 𝗪𝗔𝗥𝗡𝗘𝗗 𝗨𝗦𝗘𝗥\n┏━━━━━━━━━━━━━━❀\n⚠️ Warned member %1 times %2\n- Uid: %3\n- Reason: %4\n- Date Time: %5\nThis member has been warned 3 times and banned from the box, to unban use the command \"%6warn unban <uid>\" (with uid is the uid of the person you want to unban)\n┗━━━━━━━━━━━━━━❀",
      noPermission5: "⚙️ 𝗡𝗘𝗘𝗗𝗘𝗗 𝗣𝗥𝗘𝗠𝗜𝗦𝗦𝗜𝗢𝗡\n┏━━━━━━━━━━━━━━❀\n➤ ⚠️ Bot needs administrator permissions to kick banned members\n┗━━━━━━━━━━━━━━❀",
      warnSuccess2: "⛔ 𝗪𝗔𝗥𝗡𝗘𝗗 𝗨𝗦𝗘𝗥\n┏━━━━━━━━━━━━━━❀\n⚠️ 𝐖𝐚𝐫𝐧𝐞𝐝 𝐔𝐬𝐞𝐫\n➤ %1 \n𝐓𝐨𝐭𝐚𝐥 𝐖𝐚𝐫𝐧𝐬\n➤ %2\n𝐔𝐒𝐄𝐑 𝐔𝐈𝐃\n➤ %3 \n𝐑𝐄𝐀𝐒𝐎𝐍\n➤ %4\n𝐃𝐀𝐓𝐄/𝐓𝐈𝐌𝐄\n➤ %5\n𝐈𝐅 𝐓𝐇𝐈𝐒 𝐏𝐄𝐑𝐒𝐎𝐍 𝐕𝐈𝐎𝐋𝐀𝐓𝐄𝐒\n➤ %6\n more times, they will be banned from the box\n┗━━━━━━━━━━━━━━❀",
      hasBanned: "🛑 𝗪𝗔𝗥𝗡𝗘𝗗 𝗔𝗟𝗘𝗥𝗧\n┏━━━━━━━━━━━━━━❀\n⚠️ The following members have been warned 3 times before and banned from the box:\n%1",
      failedKick: "┏━━━━━━━━━━━━━━❀⚠️ An error occurred when kicking the following members:\n%1\n┗━━━━━━━━━━━━━━❀",
      userNotInGroup: "❌ 𝗨𝗦𝗘𝗥 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\n┏━━━━━━━━━━━━━━❀\n⚠️ The user \"%1\" is currently not in your Group\n┗━━━━━━━━━━━━━━❀"
    }
  },

  onStart: async function ({ message, api, event, args, threadsData, usersData, prefix, role, getLang }) {
    if (!args[0])
      return message.SyntaxError();
    const { threadID, senderID } = event;
    const warnList = await threadsData.get(threadID, "data.warn", []);

    switch (args[0]) {
      case "list": {
        const msg = await Promise.all(warnList.map(async user => {
          const { uid, list } = user;
          const name = await usersData.getName(uid);
          return `${name} (${uid}): ${list.length}`;
        }));
        message.reply(msg.length ? getLang("list", msg.join("\n"), prefix) : getLang("listEmpty"));
        break;
      }
      case "listban": {
        const result = (await Promise.all(warnList.map(async user => {
          const { uid, list } = user;
          if (list.length >= 3) {
            const name = await usersData.getName(uid);
            return `${name} (${uid})`;
          }
        }))).filter(item => item);
        message.reply(result.length ? getLang("listBan", result.join("\n")) : getLang("listBanEmpty"));
        break;
      }
      case "check":
      case "info": {
        let uids, msg = "";
        if (Object.keys(event.mentions).length)
          uids = Object.keys(event.mentions);
        else if (event.messageReply?.senderID)
          uids = [event.messageReply.senderID];
        else if (args.slice(1).length)
          uids = args.slice(1);
        else
          uids = [senderID];

        if (!uids)
          return message.reply(getLang("invalidUid"));
        msg += (await Promise.all(uids.map(async uid => {
          if (isNaN(uid))
            return null;
          const dataWarnOfUser = warnList.find(user => user.uid == uid);
          let msg = `Uid: ${uid}`;
          const userName = await usersData.getName(uid);

          if (!dataWarnOfUser || dataWarnOfUser.list.length == 0)
            msg += `\n  Name: ${userName}\n  ${getLang("noData")}`;
          else {
            msg += `\nName: ${userName}`
              + `\nWarn list:` + dataWarnOfUser.list.reduce((acc, warn) => {
                const { dateTime, reason } = warn;
                return acc + `\n  - Reason: ${reason}\n    Time: ${dateTime}`;
              }, "");
          }
          return msg;
        }))).filter(msg => msg).join("\n\n");
        message.reply(msg);
        break;
      }
      case "unban": {
        if (role < 1)
          return message.reply(getLang("noPermission"));
        let uidUnban;
        if (Object.keys(event.mentions).length)
          uidUnban = Object.keys(event.mentions)[0];
        else if (event.messageReply?.senderID)
          uidUnban = event.messageReply.senderID;
        else if (args.slice(1).length)
          uidUnban = args.slice(1);
        else
          uidUnban = senderID;

        if (!uidUnban || isNaN(uidUnban))
          return message.reply(getLang("invalidUid2"));

        const index = warnList.findIndex(user => user.uid == uidUnban && user.list.length >= 3);
        if (index === -1)
          return message.reply(getLang("notBanned", uidUnban));

        warnList.splice(index, 1);
        await threadsData.set(threadID, warnList, "data.warn");
        const userName = await usersData.getName(uidUnban);
        message.reply(getLang("unbanSuccess", uidUnban, userName));
        break;
      }
      case "unwarn": {
        if (role < 1)
          return message.reply(getLang("noPermission2"));
        let uid, num;
        if (Object.keys(event.mentions)[0]) {
          uid = Object.keys(event.mentions)[0];
          num = args[args.length - 1];
        }
        else if (event.messageReply?.senderID) {
          uid = event.messageReply.senderID;
          num = args[1];
        }
        else {
          uid = args[1];
          num = parseInt(args[2]) - 1;
        }

        if (isNaN(uid))
          return message.reply(getLang("invalidUid3"));

        const dataWarnOfUser = warnList.find(u => u.uid == uid);
        if (!dataWarnOfUser?.list.length)
          return message.reply(getLang("noData2", uid));

        if (isNaN(num))
          num = dataWarnOfUser.list.length - 1;

        const userName = await usersData.getName(uid);
        if (num > dataWarnOfUser.list.length)
          return message.reply(getLang("notEnoughWarn", userName, dataWarnOfUser.list.length));

        dataWarnOfUser.list.splice(parseInt(num), 1);
        if (!dataWarnOfUser.list.length)
          warnList.splice(warnList.findIndex(u => u.uid == uid), 1);
        await threadsData.set(threadID, warnList, "data.warn");
        message.reply(getLang("unwarnSuccess", num + 1, uid, userName));
        break;
      }
      case "reset": {
        if (role < 1)
          return message.reply(getLang("noPermission3"));
        await threadsData.set(threadID, [], "data.warn");
        message.reply(getLang("resetWarnSuccess"));
        break;
      }
      default: {
        if (role < 1)
          return message.reply(getLang("noPermission4"));
        let reason, uid;
        if (event.messageReply) {
          uid = event.messageReply.senderID;
          reason = args.join(" ").trim();
        }
        else if (Object.keys(event.mentions)[0]) {
          uid = Object.keys(event.mentions)[0];
          reason = args.join(" ").replace(event.mentions[uid], "").trim();
        }
        else {
          return message.reply(getLang("invalidUid4"));
        }
        if (!reason)
          reason = "No reason";
        const dataWarnOfUser = warnList.find(item => item.uid == uid);
        const dateTime = getTime("DD/MM/YYYY hh:mm:ss");
        if (!dataWarnOfUser)
          warnList.push({
            uid,
            list: [{ reason, dateTime, warnBy: senderID }]
          });
        else
          dataWarnOfUser.list.push({ reason, dateTime, warnBy: senderID });

        await threadsData.set(threadID, warnList, "data.warn");

        const times = dataWarnOfUser?.list.length ?? 1;

        const userName = await usersData.getName(uid);
        if (times >= 3) {
          message.reply(getLang("warnSuccess", userName, times, uid, reason, dateTime, prefix), () => {
            api.removeUserFromGroup(uid, threadID, async (err) => {
              if (err) {
                const members = await threadsData.get(event.threadID, "members");
                if (members.find(item => item.userID == uid)?.inGroup) // check if user is still in group
                  return message.reply(getLang("userNotInGroup", userName));
                else
                  return message.reply(getLang("noPermission5"), (e, info) => {
                    const { onEvent } = global.GoatBot;
                    onEvent.push({
                      messageID: info.messageID,
                      onStart: async ({ event }) => {
                        if (event.logMessageType === "log:thread-admins" && event.logMessageData.ADMIN_EVENT == "add_admin") {
                          const { TARGET_ID } = event.logMessageData;
                          if (TARGET_ID == api.getCurrentUserID()) {
                            const warnList = await threadsData.get(event.threadID, "data.warn", []);
                            if ((warnList.find(user => user.uid == uid)?.list.length ?? 0) <= 3)
                              global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID);
                            else
                              api.removeUserFromGroup(uid, event.threadID, () => global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID));
                          }
                        }
                      }
                    });
                  });
              }
            });
          });
        }
        else
          message.reply(getLang("warnSuccess2", userName, times, uid, reason, dateTime, 3 - (times)));
      }
    }
  },

  onEvent: async ({ event, threadsData, usersData, message, api, getLang }) => {
    const { logMessageType, logMessageData } = event;
    if (logMessageType === "log:subscribe") {
      return async () => {
        const { data, adminIDs } = await threadsData.get(event.threadID);
        const warnList = data.warn || [];
        if (!warnList.length)
          return;
        const { addedParticipants } = logMessageData;
        const hasBanned = [];

        for (const user of addedParticipants) {
          const { userFbId: uid } = user;
          const dataWarnOfUser = warnList.find(item => item.uid == uid);
          if (!dataWarnOfUser)
            continue;
          const { list } = dataWarnOfUser;
          if (list.length >= 3) {
            const userName = await usersData.getName(uid);
            hasBanned.push({
              uid,
              name: userName
            });
          }
        }

        if (hasBanned.length) {
          await message.send(getLang("hasBanned", hasBanned.map(item => `  - ${item.name} (uid: ${item.uid})`).join("\n")));
          if (!adminIDs.includes(api.getCurrentUserID()))
            message.reply(getLang("noPermission5"), (e, info) => {
              const { onEvent } = global.GoatBot;
              onEvent.push({
                messageID: info.messageID,
                onStart: async ({ event }) => {
                  if (
                    event.logMessageType === "log:thread-admins"
                    && event.logMessageData.ADMIN_EVENT == "add_admin"
                    && event.logMessageData.TARGET_ID == api.getCurrentUserID()
                  ) {
                    const threadData = await threadsData.get(event.threadID);
                    const warnList = threadData.data.warn;
                    const members = threadData.members;
                    removeUsers(hasBanned, warnList, api, event, message, getLang, members);
                    global.GoatBot.onEvent = onEvent.filter(item => item.messageID != info.messageID);
                  }
                }
              });
            });
          else {
            const members = await threadsData.get(event.threadID, "members");
            removeUsers(hasBanned, warnList, api, event, message, getLang, members);
          }
        }
      };
    }
  }
};

async function removeUsers(hasBanned, warnList, api, event, message, getLang, members) {
  const failed = [];
  for (const user of hasBanned) {
    if (members.find(item => item.userID == user.uid)?.inGroup) { // check if user is still in group
      try {
        if (warnList.find(item => item.uid == user.uid)?.list.length ?? 0 >= 3)
          await api.removeUserFromGroup(user.uid, event.threadID);
      }
      catch (e) {
        failed.push({
          uid: user.uid,
          name: user.name
        });
      }
    }
  }
  if (failed.length)
    message.reply(getLang("failedKick", failed.map(item => `  - ${item.name} (uid: ${item.uid})`).join("\n")));
}