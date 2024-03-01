const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");
const maxLimits = 15;
const userDataFile = "aryan.json";

module.exports = {
  config: {
    name: "imgsearch",
    version: "1.0",
    author: "Rômeo", // Command modified by Aryan Chauhan, don't change my author name
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "get wallpaper",
    },
    longDescription: {
      en: "get ",
    },
    category: "wallpaper",
    guide: {
      en: "search query for wallpaper",
    },
  },

  onStart: async function ({ api, event, args }) {
    if (args.length === 0) {
      api.sendMessage(
        "⛔ 𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗜𝗡𝗣𝗨𝗧\n\n🤦🏻‍♂️ Please provide a query to search for images.",
        event.threadID,
        event.messageID
      );
      return;
    }

    const userData = getUserData(event.senderID);
    if (userData.limits === undefined || userData.limits < maxLimits) {
      const apiKey = "39178311-acadeb32d7e369897e41dba06";
      const query = encodeURIComponent(args.join(" "));
      const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${query}&image_type=photo&per_page=200`;

      try {
        const response = await axios.get(apiUrl);
        const wallpapers = response.data.hits.filter(function (wallpaper) {
          const imageUrl = wallpaper.largeImageURL;
          const imageExtension = path.extname(imageUrl);
          return (
            imageExtension === ".jpg" || imageExtension === ".png"
          );
        });

        if (wallpapers.length === 0) {
          api.sendMessage(
            "⛔ 𝗡𝗢𝗧 𝗪𝗦 𝗙𝗢𝗨𝗡𝗗𝗘𝗗\n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 10\n➤  ❌ No wallpapers found for the given query.Please Provide Other Query .",
            event.threadID,
            event.messageID
          );
          return;
        }

        let streams = [];
        let counter = 0;

        for (const wallpaper of wallpapers) {
          if (counter >= 6) {
            break;
          }

          const imageUrl = wallpaper.largeImageURL;
          const imageExtension = path.extname(imageUrl);

          let imagePath = path.join(
            __dirname,
            `/cache/wallpaper${counter}${imageExtension}`
          );
          let hasError = false;

          try {
            const imageResponse = await axios.get(imageUrl, {
              responseType: "arraybuffer",
            });
            fs.writeFileSync(
              imagePath,
              Buffer.from(imageResponse.data, "binary")
            );
          } catch (error) {
            console.error(error);
            hasError = true;
          }

          if (!hasError) {
            streams.push(
              fs
                .createReadStream(imagePath)
                .on("end", function () {
                  if (fs.existsSync(imagePath)) {
                    fs.unlink(imagePath, function (err) {
                      if (err) console.error(err);
                    });
                  }
                })
            );

            counter += 1;
          }
        }

        if (streams.length > 0) {
          let msg = {
            body: `🖼️ 𝗛𝗘𝗥𝗘 𝗜𝗦 𝗬𝗢𝗨𝗥 𝗪𝗦\n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 10\n➤  📷 𝖥𝗈𝗎𝗇𝖽𝖾𝖽 𝖱𝖾𝗌𝗎𝗅𝗍𝗌 👇\n\n`,
            attachment: streams,
          };

          api.sendMessage(
            msg,
            event.threadID,
            async (error, info) => {
              if (!error) {
                // Increment the user's limit
                incrementUserLimit(event.senderID);
              }
            }
          );
        } else {
          api.sendMessage(
            "⛔ 𝗘𝗥𝗥𝗢𝗥 𝗙𝗢𝗨𝗡𝗗\n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 15\n➤  ❌ An error occurred while fetching the please try again",
            event.threadID,
            event.messageID
          );
        }
      } catch (error) {
        console.error(error);
        api.sendMessage(
          "⛔ 𝗘𝗥𝗥𝗢𝗥 𝗙𝗢𝗨𝗡𝗗\n\n𝐃𝐚𝐢𝐥𝐲 𝐋𝐢𝐦𝐢𝐭𝐬\n➡️ 10\n➤  ❌ An error occurred while fetching wallpapers.",
          event.threadID,
          event.messageID
        );
      }
    } else {
      api.sendMessage(
        "⛔𝗖𝗠𝗗 𝗔𝗟𝗘𝗥𝗧:\n\n ✅ You have reached the daily Limits of 【 10 】Questions\n\n❌ 𝗪𝗵𝘆 𝗬𝗼𝘂 𝗖𝗮𝗻'𝘁 𝗨𝘀𝗲 𝗧𝗵𝗶𝘀 𝗖𝗼𝗺𝗺𝗮𝗻𝗱\n You are a free user so you get daily limits If you do not want daily limits then buy our membership\n\n⁉ \n\n𝗪𝗵𝘆 𝗬𝗼𝘂 𝗕𝘂𝘆 𝗢𝘂𝗿 𝗠𝗲𝗺𝗯𝗲𝗿𝘀𝗵𝗶𝗽\n If you buy our membership then you will not get daily limit. infinite If you buy our membership So you will not get daily limit, you can use it infinitely for life time.And you will also get gifts from Our Team\n\n👑 𝗧𝗵𝗮𝗻𝗸 𝗢𝗿𝗼𝗰𝗵𝗶 𝗧𝗲𝗮𝗺(𝗢𝗧):\nThank you, Orochi Team (OT), for your incredible contributions to my scripting and development. I greatly appreciate the effort you've put into making me a helpful and efficient virtual assistant\n\n🔵𝗗𝗮𝗶𝗹𝘆 𝗖𝗼𝗺𝗺𝗮𝗻𝗱 𝗟𝗶𝗺𝗶𝘁𝘀\n You are given [ 15 ] daily limits for free users from the Orochi team.Your Limits is Over Your limits is 【 10 】. Now You can't use this Command\n\n🔄 𝗪𝗵𝗲𝗻 𝗧𝗵𝗲 𝗗𝗮𝗶𝗹𝘆 𝗟𝗶𝗺𝗶𝘁𝘀 𝗕𝗲 𝗥𝗲𝘀𝗲𝘁\n The limits will be reset daily the next day for all users.\n\n😚 𝗧𝗛𝗔𝗡𝗞 𝗬𝗢𝗨 𝗔𝗡𝗗 𝗘𝗡𝗝𝗢𝗬.",
        event.threadID,
        event.messageID
      );
    }
  },
};

function getUserData(userId) {
  let userData = {};
  // Check if the user data file exists
  if (fs.existsSync(userDataFile)) {
    userData = fs.readJsonSync(userDataFile);
  }
  // If the limit doesn't exist for the user, initialize it to 0
  if (userData[userId] === undefined) {
    userData[userId] = { limits: 0 };
  }
  return userData[userId];
}

function incrementUserLimit(userId) {
  let userData = getUserData(userId);
  userData.limits += 1;
  fs.writeJsonSync(userDataFile, userData);
}