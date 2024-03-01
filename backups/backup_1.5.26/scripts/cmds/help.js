const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "        \n      ";
const characters = "";

module.exports = {
  config: {
    name: "help",
    version: "2.0",
    author: "Orochi Team",
    countDown: 1,
    role: 0,
    shortDescription: {
      vi: "Xem cách dùng lệnh",
      en: "View command usage"
    },
    longDescription: {
      en: "View command usage"
    },
    category: "info",
    guide: {
      en: "{pn} [empty | <page number> | <command name>]"
    },
    priority: 1
  },

  langs: {
    en: {
      help: "📍| 𝗔𝗟𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦\n\n🆕 LEGENDS SYMBOL\n👑 - For only limited Access \n🆓 - For Free Users\n⚙ - Command Tools\n💬 - Chat Box\n\n💬⚙ [ .chi ] - Powerful Oroch\n🆓⚙ [ .help ] - No discription\n👑⚙ [ .admin ] - add/remove admins\n👑⚙ [ .acp ] - accept friends request\n🆓⚙ [.uid ] no discription\n🆓⚙  [ .unsend ] - no discription\n🆓⚙ [ .ban ] - ban user from thread\n👑⚙ [ .callad  ] - join our gc\n👑⚙ [ .leave  ] - Remove Orochi from box chat\n👑⚙ [ .pin ] - search pictures from pinterest\n🆓⚙ [ .sing ] - play song from YouTube\n👑⚙ [ .noti ] - send notification to all boxchats\n🆓⚙ [ .rules ] - Box Rules\n👑⚙ [ .onlyadminbox ] - on /off\n👑⚙ [ .warn ] - warn people\n🆓⚙ [ .ping ] - Orochi system ping show\n🆓⚙ [ .callad ] - contact to Orochi Admins\n👑⚙ [ .cmd ] - install/load/unload cmds\n👑⚙ [ .update ] - update Orochi Project\n🆓⚙ [ .restart ] - restart Orochi System\n🆓⚙ [ .tid ] - check Your group uid\n🆓⚙ [ .uid ] - check your profile uid\n👑⚙ [ .pending ] - check all pending threads\n👑⚙ [ .delete ] - delete command from project\n🆓⚙ [ .status ] - check your status\n🆓⚙ [ .bal ] - check your balance\n🆓⚙ [ .set ] - set user balance data\n🆓⚙ [ .slot ] - slot your money\n👑⚙ [ .kick ] - kick user from your boxchat \n🆓⚙ [ .clear ] - clear unwanted files/temp\n🆓⚙ [ .rank ] - check your rank\n🆓⚙ [ .wife ] - find your anime girl wife \n🆓⚙ [ .groupinfo ] - check details about your grouo \n🆓⚙ [ .a2v ] - convert audio to video \n🆓⚙ [ .userinfo ] - get user information \n🆓⚙ [ .v2a ] - convert video to audio\n🆓⚙ [ .richest ] - check richest users\n🆓⚙ [ .trans ] - translate sentence from different language\n🆓⚙ [ .adduser ] - add user from your boxchat\n🆓⚙ [ .wholesome ] - No description\n🆓⚙ [ .picklines ] - get random pick lines\n🆓⚙ [ .elone ] - No Discription\n🆓⚙ [ .marry ] - marry with taged user\n🆓⚙ [ .married ] - married with taged user\n🆓⚙ [ .milf ] - No discription\n🆓⚙ [ .gif ] - get random gif with catagorey\n🆓⚙ [ .obama ] - No description\n🆓⚙ [ .pair ] - pair with random users\n🆓⚙ [ .pronhub ] - No discription\n🆓⚙ [ .post ] - No discription\n🆓⚙ [ .propose ] - propose someone \n🆓⚙ [ .fun ] - No discription\n🆓⚙ [ .fact ] - Get random facts\n🆓⚙ [ .joke ] - get random jones\n🆓⚙ [ .quote ] - get random quotes\n🆓⚙ [ .ramos ] - No discription\n🆓⚙ [ .bank ] - economy bank system\n🆓⚙[ .random ] - No discription\n🆓⚙ [ .say ] - convert text to audio\n🆓⚙ [ .setrole ] - set/change commands role\n🆓⚙ [ .spidermain ] - No discription\n🆓⚙ [ .us ] - No discription\n🆓⚙ [ .thunder - Convert text to thunder text\n🆓⚙ [ .willsmith ] - No discription\n🆓⚙ [ .mark ] - No discription\n🆓⚙ [ . wanted ] - mention someone\n🆓⚙ [ .ugly ] - check your uglyness status\n🆓⚙ [ .cr7 ] - get random Cristiano Ronaldo images\n🆓⚙ [ .wishcard ] - create wish card\n🆓⚙ [ .shoti ] - get random tiktok videos\n🆓⚙ [ .art ] - create image to Art\n🆓⚙ [ .lyrics ] - Get lyrics of songs\n🆓⚙ [ .imgur ] - Create images to link\n🆓⚙ [ .autogreet ] - No Discription\n\n🆓⚙ [ .count ] - Check Your message in your chatbox\n👑⚙  [ .tempmail ] - Generat Temporary Tempmail\n🆓⚙  [ .imagine ] - Generat Your imagination images\n🆓⚙  [ .sdxl ] - No Description\n🆓⚙  [ .gen ] - No discription\n👑⚙  [ .leave ] - Leave Orochi from Chatbox\n🆓⚙  [ .dalle ] - Create Image using dalle \n✅ Total Commands 86\n📌Page [ 1 / 1 ] \n⚙️ FOR MORE GUIDES, TYPE THESE: \n⚙️ .HELP (commandname) To show command description and how to use",
      help2: "⚙ [ .richest ] - check richest users\n🆓⚙ [ .trans ] - translate sentence from different language\n🆓⚙ [ .adduser ] - add user from your boxchat\n🆓⚙ [ .wholesome ] - No description\n🆓⚙ [ .picklines ] - get random pick lines\n🆓⚙ [ .elone ] - No Discription\n🆓⚙",
      commandNotFound: "⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗\n\n✦•···················•✦•···················•✦\n➤ Command \n🆓⚙\ %1 \ \n❌ does not exist in system please check your command\n✦•···················•✦•···················•✦",
      getInfoCommand: "😘𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢\n\n➤🆓 %1\n✦•···················•✦•···················•✦\n👒𝗖𝗠𝗗 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡 \n➤ %2\n\n🧮𝗢𝗧𝗛𝗘𝗥 𝗡𝗔𝗠𝗘\n➤ %3\n\n🎎𝗢𝗧𝗛𝗘𝗥 𝗡𝗔𝗠𝗘 𝗜𝗡 𝗖𝗛𝗔𝗧𝗕𝗢𝗫\n➤ %4\n\n💎𝗖𝗠𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡\n➤ %5\n\n🎲𝗖𝗠𝗗 𝗥𝗢𝗟𝗘\n➤ %6\n\n⏰𝗖𝗠𝗗 𝗧𝗜𝗠𝗘\n➤ %7s\n\n😈 𝗖𝗠𝗗 𝗔𝗨𝗧𝗛𝗢𝗥\n➤ %8\n\n📝𝗖𝗠𝗗 𝗚𝗨𝗜𝗗𝗘\n➤ %9\n✦•···················•✦•···················•✦",
      doNotHave: "DON'T HAVE NAME",
      roleText0: "🆓 FREE COMMAND",
      roleText1: "👑 PRO COMMAMD",
      roleText2: "💎 LEGEND COMMAND",
      roleText0setRole: "🆓 FREE COMMAND",
      roleText1setRole: "👑 PRO COMMAND",
      pageNotFound: ""
    }
  },

  onStart: async function ({ message, args, event, threadsData, getLang, role }) {
    const langCode = await threadsData.get(event.threadID, "data.lang") || global.GoatBot.config.language;
    let customLang = {};
    const pathCustomLang = path.join(__dirname, "..", "..", "languages", "cmds", `${langCode}.js`);
    if (fs.existsSync(pathCustomLang))
      customLang = require(pathCustomLang);
    const { threadID } = event;
    const threadData = await threadsData.get(threadID);
    const prefix = getPrefix(threadID);
    let sortHelp = threadData.settings.sortHelp || "name";
    if (!["category", "name"].includes(sortHelp))
      sortHelp = "name";
    const commandName = (args[0] || "").toLowerCase();
    const command = commands.get(commandName) || commands.get(aliases.get(commandName));
    // ———————————————— LIST ALL COMMAND ——————————————— //
    if (!command && !args[0] || !isNaN(args[0])) {
      const arrayInfo = [];
      let msg = "";
      if (sortHelp == "name") {
        const page = parseInt(args[0]) || 1;
        const numberOfOnePage = 30;
        for (const [name, value] of commands) {
          if (value.config.role > 1 && role < value.config.role)
            continue;
          let describe = name;
          let shortDescription;
          const shortDescriptionCustomLang = customLang[name]?.shortDescription;
          if (shortDescriptionCustomLang != undefined)
            shortDescription = checkLangObject(shortDescriptionCustomLang, langCode);
          else if (value.config.shortDescription)
            shortDescription = checkLangObject(value.config.shortDescription, langCode);
          if (shortDescription && shortDescription.length < 40)
            describe += `: ${shortDescription.charAt(0).toUpperCase() + shortDescription.slice(1)}`;
          arrayInfo.push({
            data: describe,
            priority: value.priority || 0
          });
        }
        arrayInfo.sort((a, b) => a.data - b.data);
        arrayInfo.sort((a, b) => a.priority > b.priority ? -1 : 1);
        const { allPage, totalPage } = global.utils.splitPage(arrayInfo, numberOfOnePage);
        if (page < 1 || page > totalPage)
          return message.reply(getLang("pageNotFound", page));
        const returnArray = allPage[page - 1];
        const startNumber = (page - 1) * numberOfOnePage + 1;
        msg += (returnArray || []).reduce((text, item, index) => text += `${index + startNumber}/ ${item.data}\n`, '');
        await message.reply(getLang("help", characters, msg, page, totalPage, commands.size, prefix, doNotDelete));
      }
      else if (sortHelp == "category") {
        for (const [, value] of commands) {
          if (value.config.role > 1 && role < value.config.role)
            continue;
          if (arrayInfo.some(item => item.category == value.config.category.toLowerCase())) {
            const index = arrayInfo.findIndex(item => item.category == value.config.category.toLowerCase());
            arrayInfo[index].names.push(value.config.name);
          }
          else
            arrayInfo.push({
              category: value.config.category.toLowerCase(),
              names: [value.config.name]
            });
        }
        arrayInfo.sort((a, b) => (a.category < b.category ? -1 : 1));
        for (const data of arrayInfo) {
          const categoryUpcase = `━━━ ${data.category.toUpperCase()} ━━━`;
          data.names.sort();
          msg += `${categoryUpcase}\n${data.names.join(", ")}\n\n`;
        }
        message.reply(getLang("help2", msg, characters, commands.size, prefix, doNotDelete));
      }
    }
    // ———————————— COMMAND DOES NOT EXIST ———————————— //
    else if (!command && args[0]) {
      return message.reply(getLang("commandNotFound", args[0]));
    }
    // ————————————————— INFO COMMAND ————————————————— //
    else {
      const configCommand = command.config;
      const author = configCommand.author;

      const nameUpperCase = configCommand.name.toUpperCase();
      const title = `${characters}\n${nameUpperCase}\n${characters}`;

      const descriptionCustomLang = customLang[configCommand.name]?.longDescription;
      let description;
      if (descriptionCustomLang != undefined)
        description = checkLangObject(descriptionCustomLang, langCode);
      else if (configCommand.longDescription)
        description = checkLangObject(configCommand.longDescription, langCode);
      const aliasesString = configCommand.aliases ? configCommand.aliases.join(", ") : getLang("doNotHave");
      const aliasesThisGroup = threadData.data.aliases ? (threadData.data.aliases[configCommand.name] || []).join(", ") : getLang("doNotHave");
      let roleOfCommand = configCommand.role;
      let roleIsSet = false;
      if (threadData.data.setRole?.[configCommand.name]) {
        roleOfCommand = threadData.data.setRole[configCommand.name];
        roleIsSet = true;
      }

      const roleText = roleOfCommand == 0 ?
        (roleIsSet ? getLang("roleText0setRole") : getLang("roleText0")) :
        roleOfCommand == 1 ?
          (roleIsSet ? getLang("roleText1setRole") : getLang("roleText1")) :
          getLang("roleText2");

      let guide;
      if (customLang[configCommand.name]?.guide != undefined)
        guide = customLang[configCommand.name].guide;
      else
        guide = configCommand.guide[langCode] || configCommand.guide["en"];
      guide = guide || {
        body: ""
      };
      if (typeof guide == "string")
        guide = { body: guide };
      const guideBody = guide.body
        .replace(/\{prefix\}|\{p\}/g, prefix)
        .replace(/\{name\}|\{n\}/g, configCommand.name)
        .replace(/\{pn\}/g, prefix + configCommand.name);

      const formSendMessage = {
        body: getLang("getInfoCommand", title, description, aliasesString, aliasesThisGroup, configCommand.version, roleText, configCommand.countDown || 1, author || "", guideBody)
      };

      if (guide.attachment) {
        if (typeof guide.attachment == "object") {
          formSendMessage.attachment = [];
          for (const pathFile in guide.attachment) {
            if (!fs.existsSync(pathFile)) {
              const cutFullPath = pathFile.split("/");
              cutFullPath.pop();
              for (let i = 0; i < cutFullPath.length; i++) {
                const path = cutFullPath.slice(0, i + 1).join('/');
                if (!fs.existsSync(path))
                  fs.mkdirSync(path);
              }
              const getFile = await axios.get(guide.attachment[pathFile], { responseType: 'arraybuffer' });
              fs.writeFileSync(pathFile, Buffer.from(getFile.data));
            }
            formSendMessage.attachment.push(fs.createReadStream(pathFile));
          }
        }
      }
      return message.reply(formSendMessage);
    }
  }
};

function checkLangObject(data, langCode) {
  if (typeof data == "string")
    return data;
  if (typeof data == "object" && !Array.isArray(data))
    return data[langCode] || data.en || "";
  return "";
}