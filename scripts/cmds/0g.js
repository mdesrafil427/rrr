module.exports = {
  config: {
    name: "onlyadminbox",
    aliases: ["onlyadbox", "adboxonly", "adminboxonly"],
    version: "1.2",
    author: "Rômeo",
    countDown: 0,
    role: 1,
    shortDescription: {
      en: "turn on/off only admin box can use bot"
    },
    longDescription: {
      en: "turn on/off only admin box can use bot"
    },
    category: "box chat",
    guide: {
      en: "   {pn} [on | off]: turn on/off the mode only admin of group can use bot"
        + "\n   {pn} noti [on | off]: turn on/off the notification when user is not admin of group use bot"
    }
  },

  langs: {
    en: {
      turnedOn: "👑 𝗢𝗡𝗟𝗬𝗔𝗗𝗠𝗜𝗡𝗕𝗢𝗫\n\nTurned on the mode only admin of group can use bot",
      turnedOff: "👑 𝗢𝗡𝗟𝗬𝗔𝗗𝗠𝗜𝗡𝗕𝗢𝗫\n\nTurned off the mode only admin of group can use bot",
      turnedOnNoti: "👑 𝗢𝗡𝗟𝗬𝗔𝗗𝗠𝗜𝗡𝗕𝗢𝗫\n\nTurned on the notification when user is not admin of group use bot",
      turnedOffNoti: "👑 𝗢𝗡𝗟𝗬𝗔𝗗𝗠𝗜𝗡𝗕𝗢𝗫\n\nTurned off the notification when user is not admin of group use bot",
      syntaxError: "👑 𝗢𝗡𝗟𝗬𝗔𝗗𝗠𝗜𝗡𝗕𝗢𝗫\n\nSyntaxes error, only use {pn} on or {pn} off"
    }
  },

  onStart: async function ({ args, message, event, threadsData, getLang }) {
    let isSetNoti = false;
    let value;
    let keySetData = "data.onlyAdminBox";
    let indexGetVal = 0;

    if (args[0] == "noti") {
      isSetNoti = true;
      indexGetVal = 1;
      keySetData = "data.hideNotiMessageOnlyAdminBox";
    }

    if (args[indexGetVal] == "on")
      value = true;
    else if (args[indexGetVal] == "off")
      value = false;
    else
      return message.reply(getLang("syntaxError"));

    await threadsData.set(event.threadID, isSetNoti ? !value : value, keySetData);

    if (isSetNoti)
      return message.reply(value ? getLang("turnedOnNoti") : getLang("turnedOffNoti"));
    else
      return message.reply(value ? getLang("turnedOn") : getLang("turnedOff"));
  }
};