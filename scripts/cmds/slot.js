const fs = require('fs');

module.exports = {
  config: {
    name: "slot",
    version: "1.1",
    author: "Orochi Team",//Command modified by Aryan Chauhan don't change my author name
    shortDescription: {
      en: "Game slot",
    },
    longDescription: {
      en: "Game slot.",
    },
    category: "𝗢𝗥𝗢𝗖𝗛𝗜 𝗦𝗟𝗢𝗧",
  },
  langs: {
    en: {
      invalid_amount: "🎲 𝗜𝗡𝗩𝗔𝗜𝗟𝗘𝗗 𝗜𝗡𝗣𝗨𝗧\n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 15\n💸 Please enter a valid amount.\n\n📝 Example:\n[ .slot ] < 1000 >",
      not_enough_money: "🎲 𝗠𝗢𝗡𝗘𝗬 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗 \n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 15\nYou don't have enough money. Check your balance and try again.\nType [ .bal ] to see your balance.",
      spin_message: "Spinning...",
      win_message: "🎲 𝗦𝗟𝗢𝗧 𝗪𝗢𝗡\n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 15\n📣 Congratulations! You won %1$! 💰",
      lose_message: "🎲 𝗦𝗟𝗢𝗧 𝗟𝗢𝗦𝗦 \n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 15\n🥺 Sorry, you lost %1$ 😞\nBetter luck next time!",
      jackpot_message: "💰 JACKPOT! You won %1$!",
    },
  },
  onStart: async function ({ args, message, event, envCommands, usersData, commandName, getLang }) {
    const { senderID } = event;
    const userData = await usersData.get(senderID);
    const amount = parseInt(args[0]);

    if (isNaN(amount) || amount <= 0) {
      return message.reply(getLang("invalid_amount"));
    }

    if (amount > userData.money) {
      return message.reply(getLang("not_enough_money"));
    }

    const currentDate = new Date();
    const limit = getDailyLimit(senderID, currentDate);

    if (limit >= 15) {
      return message.reply("⛔𝗖𝗠𝗗 𝗔𝗟𝗘𝗥𝗧:\n\n ✅ You have reached the daily Limits of 【 15 】Questions\n\n❌ 𝗪𝗵𝘆 𝗬𝗼𝘂 𝗖𝗮𝗻'𝘁 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱\n You are a free user so you get daily limits If you do not want daily limits then buy our membership\n\n⁉ \n\n𝗪𝗵𝘆 𝗬𝗼𝘂 𝗕𝘂𝘆 𝗢𝘂𝗿 𝗠𝗲𝗺𝗯𝗲𝗿𝘀𝗵𝗶𝗽\n If you buy our membership then you will not get daily limit. infinite If you buy our membership So you will not get daily limit, you can use it infinitely for life time.And you will also get gifts from Our Team\n\n👑 𝗧𝗵𝗮𝗻𝗸 𝗢𝗿𝗼𝗰𝗵𝗶 𝗧𝗲𝗮𝗺(𝗢𝗧):\nThank you, Orochi Team (OT), for your incredible contributions to my scripting and development. I greatly appreciate the effort you've put into making me a helpful and efficient virtual assistant\n\n🔵𝗗𝗮𝗶𝗹𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝗺𝗶𝘁𝘀\n You are given [ 15 ] daily limits for free users from the Orochi team.Your Limits is Over Your limits is 【 ${limit} 】. Now You can't use this Command\n\n🔄 𝗪𝗵𝗲𝗻 𝗧𝗵𝗲 𝗗𝗮𝗶𝗹𝘆 𝗟𝗶𝗺𝗶𝘁𝘀 𝗕𝗲 𝗥𝗲𝘀𝗲𝘁\n The limits will be reset daily the next day for all users.\n\n😚 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗔𝗡𝗗 𝗘𝗡𝗝𝗢𝗬");
    }

    const slots = ["❤", "🧡", "💚", "💙", "💝", "💛", "💜", "💓", "💔"];
    const slot1 = slots[Math.floor(Math.random() * slots.length)];
    const slot2 = slots[Math.floor(Math.random() * slots.length)];
    const slot3 = slots[Math.floor(Math.random() * slots.length)];

    const winnings = calculateWinnings(slot1, slot2, slot3, amount);

    await usersData.set(senderID, {
      money: userData.money + winnings,
      data: userData.data,
    });

    updateDailyLimit(senderID, currentDate, limit + 1);

    const messageText = getSpinResultMessage(slot1, slot2, slot3, winnings, getLang);

    return message.reply(messageText);
  },
};

function calculateWinnings(slot1, slot2, slot3, betAmount) {
  if (slot1 === "💜" && slot2 === "💜" && slot3 === "💜") {
    return betAmount * 10;
  } else if (slot1 === "❤" && slot2 === "❤" && slot3 === "❤") {
    return betAmount * 5;
  } else if (slot1 === slot2 && slot2 === slot3) {
    return betAmount * 3;
  } else if (slot1 === slot2 || slot1 === slot3 || slot2 === slot3) {
    return betAmount * 2;
  } else {
    return -betAmount;
  }
}

function getSpinResultMessage(slot1, slot2, slot3, winnings, getLang) {
  if (winnings > 0) {
    if (slot1 === "💜" && slot2 === "💜" && slot3 === "💜") {
      return getLang("jackpot_message", winnings);
    } else {
      return getLang("win_message", winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]`;
    }
  } else {
    return getLang("lose_message", -winnings) + `\n[ ${slot1} | ${slot2} | ${slot3} ]`;
  }
}

function getDailyLimit(senderID, currentDate) {
  let userLimits = {};
  if (fs.existsSync("aryan.json")) {
    userLimits = JSON.parse(fs.readFileSync("aryan.json"));
  }

  const today = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;

  if (!userLimits.hasOwnProperty(senderID)) {
    userLimits[senderID] = {};
  }

  if (!userLimits[senderID].hasOwnProperty(today)) {
    userLimits[senderID][today] = 0;
  }

  return userLimits[senderID][today];
}

function updateDailyLimit(senderID, currentDate, newLimit) {
  let userLimits = {};
  if (fs.existsSync("aryan.json")) {
    userLimits = JSON.parse(fs.readFileSync("aryan.json"));
  }

  const today = `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`;

  if (!userLimits.hasOwnProperty(senderID)) {
    userLimits[senderID] = {};
  }

  userLimits[senderID][today] = newLimit;

  fs.writeFileSync("aryan.json", JSON.stringify(userLimits, null, 2));
}