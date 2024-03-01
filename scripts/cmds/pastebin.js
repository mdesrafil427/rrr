const PastebinAPI = require('pastebin-js');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "pastebin",
    version: "1.0",
    author: "Rômeo",
    countDown: 0,
    role: 2,
    shortDescription: {
      en: "Upload files to pastebin for send cmd link"
    },
    longDescription: {
      en: "This command allows you to upload files to pastebin and sends the link to the file."
    },
    category: "cmd",
    guide: {
      en: "To use this command, type !pastebin <filename>. The file must be located in the 'cmds' folder."
    }
  },

  onStart: async function({ api, event, args }) {
    const pastebin = new PastebinAPI({
      api_dev_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
      api_user_key: 'LFhKGk5aRuRBII5zKZbbEpQjZzboWDp9',
    });

    const fileName = args[0];
    const filePathWithoutExtension = path.join(__dirname, '..', 'cmds', fileName);
    const filePathWithExtension = path.join(__dirname, '..', 'cmds', fileName + '.js');

    if (!fs.existsSync(filePathWithoutExtension) && !fs.existsSync(filePathWithExtension)) {
      return api.sendMessage('⛔ 𝗖𝗠𝗗 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\n\n➤ Command not exist.Please check your command list type .help to see all available commands', event.threadID);
    }

    const filePath = fs.existsSync(filePathWithoutExtension) ? filePathWithoutExtension : filePathWithExtension;

    fs.readFile(filePath, 'utf8', async (err, data) => {
      if (err) throw err;

      const paste = await pastebin
        .createPaste({
          text: data,
          title: fileName,
          format: null,
          privacy: 1,
        })
        .catch((error) => {
          console.error(error);
        });

      const rawPaste = paste.replace("pastebin.com", "pastebin.com/raw");

      api.sendMessage(`👑 𝗖𝗠𝗗 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡\n\n✅ 𝚂𝚞𝚌𝚌𝚎𝚜𝚜𝚏𝚞𝚕𝚕𝚢 𝙲𝚛𝚎𝚝𝚎𝚍 𝚢𝚘𝚞𝚛 𝚌𝚘𝚖𝚖𝚊𝚗𝚍 𝚙𝚊𝚜𝚝𝚎𝚋𝚒𝚗 𝚕𝚒𝚗𝚔\n\n🔍 𝙿𝙰𝚂𝚃𝙴𝙱𝙸𝙽 𝙻𝙸𝙽𝙺\n➤ ${rawPaste}\n\n📝 𝗔𝗕𝗢𝗨𝗧 𝗣𝗔𝗦𝗧𝗘𝗕𝗜𝗡\n♻️ 𝚈𝚘𝚞𝚛 𝚙𝚊𝚜𝚝𝚎𝚋𝚒𝚗 𝚞𝚙𝚕𝚘𝚊𝚍𝚎𝚍 𝚝𝚘\n➤ pastebin.com`, event.threadID);
    });
  },
};