const axios = require('axios');
const fs = require('fs-extra');
const ytdl = require('ytdl-core');
const yts = require('yt-search');

module.exports = {
  config: {
    name: 'sing',
    aliases: [`s`],
    version: '2.0',
    role: 0,
    author: 'Orochi Team',//Command modified by Aryan Chauhan don't change my author name
    cooldowns: 0,
    shortDescription: 'Download music',
    longDescription: 'Download music',
    category: 'media',
    guide: {
          en: '{pn} <music>'
     },
    dependencies: {
      'fs-extra': '',
      'request': '',
      'axios': '',
      'ytdl-core': '',
      'yt-search': '',
    },
  },

  onStart: async function ({ api, args, event }) {
    const axios = require('axios');
    const fs = require('fs-extra');
    const ytdl = require('ytdl-core');
    const yts = require('yt-search');

    function formatFileSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
      else return (bytes / 1048576).toFixed(2) + ' MB';
    }

    const input = event.body;
    const text = input.substring(5);
    const data = input.split(' ');

    if (data.length < 2) {
      return api.sendMessage('💬 𝗣𝗥𝗢𝗩𝗜𝗗𝗘 𝗧𝗜𝗧𝗟𝗘\n\n🎶 Please specify a music name!', event.threadID);
    }

    data.shift();
    const musicName = data.join(' ');

    try {
      api.setMessageReaction('⏰', event.messageID, () => { }, true);

      const searchResults = await yts(musicName);
      if (!searchResults.videos.length) {
        api.sendMessage('💬 𝗡𝗢𝗧 𝗙𝗢𝗨𝗡𝗗\n\n❌ No music found.', event.threadID, event.messageID);
        return;
      }

      const music = searchResults.videos[0];
      const musicUrl = music.url;

      const stream = ytdl(musicUrl, { filter: 'audioonly' });

      const fileName = `${event.senderID}.mp3`;
      const filePath = __dirname + `/cache/${fileName}`;

      stream.pipe(fs.createWriteStream(filePath));

      stream.on('response', () => {
        console.info('[DOWNLOADER]', 'Starting download now!');
      });

      stream.on('info', (info) => {
        console.info('[DOWNLOADER]', `Downloading music: ${info.videoDetails.title}`);
      });

      stream.on('end', () => {
        console.info('[DOWNLOADER] Downloaded');

        const fileSize = formatFileSize(fs.statSync(filePath).size);
        const musicDuration = music.duration.timestamp;

        api.setMessageReaction('✅', event.messageID, () => { }, true);

        const message = {
          body: `🎶𝗬𝗧-𝗦𝗧𝗨𝗗𝗜𝗢\n\n🎵𝗧𝗜𝗧𝗟𝗘\n[ ${music.title} ]\n\n⏳𝗗𝗨𝗥𝗔𝗧𝗜𝗢𝗡\n[ ${musicDuration} ]\n\n🖇️ 𝗙𝗜𝗟𝗘 𝗦𝗜𝗭𝗘\n[ ${fileSize} ]`,
          attachment: fs.createReadStream(filePath),
        };

        api.sendMessage(message, event.threadID, () => {
          fs.unlinkSync(filePath);
        });
      });
    } catch (error) {
      console.error('[ERROR]', error);
      api.sendMessage('☹️𝗛𝗔𝗩𝗜𝗡𝗚 𝗔 𝗘𝗥𝗥𝗢𝗥\n\n 😔 Sorry, an error occurred while processing the command.', event.threadID);
    }
  },

  onChat: async function ({ api, event, args }) {
    if (event.body && event.body.toLowerCase().startsWith('sing')) {
      const musicName = event.body.substring(5).trim();

      event.args = musicName.split(' ');
      this.onStart({ api, event });
    }
  },
};