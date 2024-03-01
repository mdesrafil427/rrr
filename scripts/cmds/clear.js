const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "clear",
    version: "1.0",
    author: "Rômeo",//Command modified by Aryan Chauhan don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: "Delete all files in subdirectories",
    longDescription: "Delete all files in subdirectories",
    category: "owner",
    guide: "{pn}"
  },

  onStart: async function ({ args, message, api, event }) {
    const directoriesToDelete = ['cache', 'tmp'];

    try {
      console.log("Starting deletion process...");
      for (const directory of directoriesToDelete) {
        const directoryPath = path.join(__dirname, directory);
        const files = fs.readdirSync(directoryPath);

        for (const file of files) {
          const filePath = path.join(directoryPath, file);
          const fileStat = fs.statSync(filePath);

          if (fileStat.isFile()) {
            fs.unlinkSync(filePath);
            console.log(`Deleted file: ${filePath}`);
          }
        }
      }
      console.log("✅ 𝐒𝐔𝐂𝐂𝐄𝐒𝐒𝐅𝐔𝐋𝐋𝐘 𝐃𝐄𝐋𝐄𝐓𝐄𝐃\n\n🍒 Deletion process completed successfully!");

      const deletedFilesCount = directoriesToDelete.reduce((total, dir) => {
        const directoryPath = path.join(__dirname, dir);
        const files = fs.readdirSync(directoryPath);
        return total + files.length;
      }, 0);

      api.sendMessage(`Deleted All Unwanted Caches And Temp File(s) From Project`, event.threadID);
    } catch (err) {
      console.error(err);
      api.sendMessage(`An error occurred while deleting files: ${err.message}`, event.threadID);
    }
  }
};