const fs = require("fs-extra");
const axios = require("axios");
const path = require("path");
const { getPrefix } = global.utils;
const { commands, aliases } = global.GoatBot;
const doNotDelete = "𝗢𝗥𝗢𝗖𝗛𝗜 𝗣𝗥𝗢𝗝𝗘𝗖𝗧";
const characters = "";

module.exports = {
  config: {
    name: "help10",
    version: "2.0",
    author: "Orochi Team",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "View command usage"
    },
    longDescription: {
      en: "View All Command List Or usages"
    },
    category: "𝗛𝗘𝗟𝗣 𝗖𝗘𝗡𝗧𝗘𝗥",
    guide: {
      en: "{pn} [empty | <page number> | <command name>]"
    },
    priority: 1
  },

  langs: {
    en: {
      help: "📍| 𝗔𝗟𝗟 𝗖𝗢𝗠𝗠𝗔𝗡𝗗𝗦 𝗟𝗜𝗦𝗧\n\n📚 LEGENDS HELP SYMBOL\n👑 - For Only Admins Use Commands\n🆓 - For Non Commands show\n⚙ - For Interact in Commands\n💬 - For Artificial Intelligence Commands\n🎨 - For Images Generator Commands\n🖼️ - For Images Search Commands\n🔶 - For Economy System\n\n𝗔 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n👑⚙ [ {p}admin ] - Add/Remove admins from Orochi System\n⚠️⚙ [ {p}abin ] - Make Pastebin Alert\n👑⚙ [ {p}acp ] - Accept/delete Peoples Friends Request\n💎⚙ [ {p}adduser ] - Add Users In the Groups\n💬⚙ [ {p}arc ] - Interact As Funny Arched AI\n🖼️⚙ [ {p}anigen ] - Make Images In Anime Styles\n🆓⚙ [ {p}autoseen ] - No Discrimination Found\n🆓⚙ [ {p}a2v ] - Convert Audio Into Video\n\n𝗕 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n💎⚙ [ {p}ban ] - ban user from thread\n🔶⚙ [ {p}bal ] - Check Your Economy Balance\n🔶⚙ [ {p}bank ] - Economy Bank Fun System\n\n𝗖 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}callad ] - Contact To Orochi Admins\n🆓⚙ [ {p}clear ] - Clean unwanted files From Catche file\n👑⚙ [ {p}cmd ] - Install/Load/Unload Commands\n💎⚙ [ {p}count ] - Check Your Message In The Groups\n💬⚙ [ {p}chi ] - A Powerful Advanced Orochi Chatbot Ai\n🆓⚙ [ {p}cr7 ] - Get Random Cristiano Ronaldo Images\n\n𝗗 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n👑⚙ [ {p}delete ] - Delete Unwanted Command s From The Project\n💬⚙ [ {p}doctor ] - A Advance Smart Orochi Doctor Ai \n\n𝗘 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}elone ] - No Discription Found\n\n𝗙 - 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}fact ] - Get Random Facts About World\n👑⚙ [ {p}file ] - Allow To Send Orochi System Commands File\n🆓⚙ [ {p}fun ] - No Discription Found\n\n𝗚 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}gif ] - Get Random Anime Gif Using Anime Category's\n💬⚙ [ {p}gemini ] - Gemini Ai Trained By Google\n💎⚙ [ {p}groupinfo ] - Check Informations Of Groups \n\n𝗛 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}help ] - See All Commands List In System\n💬⚙ [ {p}horny ] - A Horny Chatbot Assistance\n\n𝗜 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}imgur ] - Generate Images Into Link\n🎨⚙ [ {p}imagine ] - Generate Images with your prompts\n📔⚙ [ {p}info ] - Allows to Show User Details\n\n𝗝 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}joke ] - Get Random Jokes\n\n𝗞 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n💎⚙ [ {p}kick ] - Kick Peoples From Group Chat\n\n𝗟 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n💎⚙ [ {p}leave  ] - Out Orochi In the Groups\n🎶⚙ [ {p}lyrics ] - Get Lyrics Of Any Song's\n🎬⚙ [ {p}lv ] - Get Random Lyrical Music Videos\n\n𝗠 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n💎⚙ [ {p}marry ] - Get Marry With Taged Peoples\n💎⚙ [ {p}married ] - Get Married With Taged People's\n🆓⚙ [ {p}mark ] - No Discription Found\n🎨⚙ [ {p}mj ] - Generate Any Images Using MJ Ai\n🆓⚙ [ {p}milf ] - No Discription Found\n\n𝗡 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n👑⚙ [ {p}noti ] - Send Notification To All Groups\n\n𝗢 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}obama ] - No Description Found\n💎⚙ [ {p}onlyadminbox ] - Turn on/off Only Admin Can Use The Orochi Chatbot\n🔶⚙ [ {p}onlyadminbox ] - Trun On / off onlyadminbox box\n\n𝗣 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n💎⚙ [ {p}pair ] - Pair With Random Peoples\n👑⚙ [ {p}pastebin ] - Generate Any Command Pastebin Link\n👑⚙ [ {p}pending ] - Check All Pending Threads\n🖼️⚙ [ {p}pixart ] - Make Images in Pixart Style\n🆓⚙ [ {p}picklines ] - Get Random Pick Lines\n🖼️⚙ [ {p}pin ] - Search Pictures From Pinterest\n🆓⚙ [ {p}ping ] - Check Orochi System Ping View\n🆓⚙ [ {p}post ] - No Discription Found\n💎⚙ [ {p}propose ] - Propose Mentioned People's In Groups\n\n𝗤 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}quote ] - Get Random Quote From Quote Categories\n\n𝗥 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙[ {p}random ] - No Discription Found\n🆓⚙ [ {p}ramos ] - No Discription Found\n🆓⚙ [ {p}rank ] - Check Your Rank In System\n💬⚙ [ {p}recipe ] - Advance Food Recipes Related Ai\n🆓⚙ [ {p}restart ] - Restart Orochi Project System\n🖼️⚙ [ {p}render ] - Make 3D Animated Images\n🆓⚙ [ {p}richest ] - Check Richest People's In Economy System\n💎⚙ [ {p}rules ] - Add/Remove Groups Rules\n\n𝗦 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}say ] - Convert Text To Audio\n💎⚙ [ {p}setrole ] - Set/change Commands Role\n🎬⚙ [ {p}shoti ] - Get Random TikTok Girls Videos\n🆓⚙ [ {p}shortcut ] - Add/Remove Shortcuts\n🔶⚙ [ {p}slot ] - Try You Luck With Slot Your Money\n💭⚙ [ {p}sim ] - Chat With Orochi Simsimi\n🎶⚙ [ {p}sing ] - Play Song From YouTube\n🆓⚙ [ {p}spidermain ] - No Discription Found\n✅⚙ [ {p}supportgc ] - Join Orochi Support Group\n\n𝗧 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n📧⚙  [ {p}tempmail ] - Generat Temporary Tempmail\n💎⚙ [ {p}tid ] - Check Your Group ID\n🆓⚙ [ {p}trans ] - Translate Sentence From Different Languages\n\n𝗨 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n👑⚙ [ {p}set ] - Set User Balance Data\n🆓⚙ [ {p}uid ] - Check Your FB Profile Uid\n🆓⚙ [ {p}ugly ] - Check Your Uglyness Status\n💎⚙  [ {p}unsend ] - Unsend Orochi Messages in your group\n👑⚙ [ {p}update ] - Update Orochi Project System\n🆓⚙ [ {p}us ] - No Discription Found\n👑⚙ [ {p}user ] - Manage Orochi User's System\n💎⚙ [ {p}userinfo ] - Get User Information\n🆓⚙ [ {p}status ] - Check Your System Status\n\n𝗩 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n🆓⚙ [ {p}v2a ] - Convert Video To Audio\n\n𝗪 - 𝗪𝗢𝗥𝗗 𝗖𝗠𝗗𝗦 𝗟𝗜𝗦𝗧\n💎⚙ [ {p}warn ] - Warn Peoples In Group with reason\n🆓⚙ [ {p}wanted ] - Mention Missing People's or Someone\n🆓⚙ [ {p}wholesome ] - No Description Found\n\n🆓⚙ [ {p}wife ] - Get Your Anime Girlfriend\n🎬⚙ [ {p}wifey ] - Get Random Wifey Videos\n🆓⚙ [ {p}wishcard ] - Createate WishCard To Your Friend\n🆓⚙ [ {p}willsmith ] - No Discription Found\n\n✅ 𝗧𝗢𝗧𝗔𝗟 𝗖𝗢𝗠𝗠𝗔𝗠𝗗𝗦\n➤ Currently System Have 104 Cmds\n📌 𝗣𝗔𝗚𝗘 𝗡𝗢. [ 1 / 1 ] \n⚙️ FOR MORE GUIDES, TYPE THESE: \n⚙️ .𝗛𝗘𝗟𝗣 (𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗡𝗔𝗠𝗘) To show command description and how to use\n𝗦𝗨𝗣𝗣𝗢𝗥𝗧 𝗚𝗥𝗢𝗨𝗣\nFor Join Our Support Group Type ({p}𝘀𝘂𝗽𝗽𝗼𝗿𝘁𝗴𝗰) to join group",
      help2: "",
      commandNotFound: "⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗖𝗢𝗠𝗠𝗔𝗡𝗗\n\n🆓⚙%1 \n✦•···················•✦•···················•✦\n➤ Command  %1  does not exist in command system please check your keywords,then try it again,type {p}help to see all available commands\n𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 😊❤️\n✦•···················•✦•···················•✦",
      getInfoCommand: "✨ 𝗖𝗢𝗠𝗠𝗔𝗡𝗗 𝗜𝗡𝗙𝗢\n\n𒊹︎︎︎ 𝚆𝙴𝙻𝙲𝙾𝙼𝙴 𝚃𝙾 𝙲𝙾𝙼𝙼𝙰𝙼𝙳 𒊹︎︎︎\n\n✦•····················•✦•····················•✦\n𝗖𝗠𝗗 𝗡𝗔𝗠𝗘\n➤ 🆓⚙%1\n👒 𝗖𝗠𝗗 𝗗𝗘𝗦𝗖𝗥𝗜𝗣𝗧𝗜𝗢𝗡 \n➤ %2\n🧮 𝗢𝗧𝗛𝗘𝗥 𝗡𝗔𝗠𝗘\n➤ %3\n🎎 𝗢𝗧𝗛𝗘𝗥 𝗡𝗔𝗠𝗘 𝗜𝗡 𝗖𝗛𝗔𝗧𝗕𝗢𝗫\n➤ %4\n💎 𝗖𝗠𝗗 𝗩𝗘𝗥𝗦𝗜𝗢𝗡\n➤ %5\n🎲 𝗖𝗠𝗗 𝗥𝗢𝗟𝗘\n➤ %6\n⏰ 𝗖𝗠𝗗 𝗖𝗢𝗢𝗟𝗗𝗢𝗪𝗡\n➤ %7s\n🔥 𝗖𝗠𝗗 𝗔𝗨𝗧𝗛𝗢𝗥\n➤ %8\n📝 𝗖𝗠𝗗 𝗚𝗨𝗜𝗗𝗘\n➤ %9\n𝗦𝗨𝗣𝗣𝗢𝗥𝗧 𝗚𝗥𝗢𝗨𝗣\nFor Join Our Support Group Type ({p}𝘀𝘂𝗽𝗽𝗼𝗿𝘁𝗴𝗰) to join group\n✦•····················•✦•····················•✦",
      doNotHave: "🔶 DO NOT HAVE A NAME",
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