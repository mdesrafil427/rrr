function convert(time){
  var date = new Date(`${time}`);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var formattedDate = `${ day < 10 ? "0" + day : day}` + "/" +`${ month < 10 ? "0" + month : month}` + "/" + year + "||" + `${ hours < 10 ? "0" + hours : hours}` + ":" + `${ minutes < 10 ? "0" + minutes : minutes}` + ":" + `${ seconds < 10 ? "0" + seconds : seconds}`;
  return formattedDate;
}

module.exports = {
  config: {
    name: "info",
    author: "Rômeo",
    version: "1.0",
    countDown: 5,
    role: 0,
    guide: "[reply/uid/@mention]",
    category: "info",
    shortDescription: {
      en: "Get info using uid/mention/reply to a message"
    }
  },

  onStart: async function({ api, event, args }) {
    const request = require("request");
    const axios = require("axios");
    const fs = require("fs");
    let path = __dirname + `/cache/info.png`;

    if (args.join().indexOf('@') !== -1) {
      var id = Object.keys(event.mentions);
    } else {
      var id = args[0] || event.senderID;
    }

    if (event.type == "message_reply") {
      var id = event.messageReply.senderID;
    }

    try {
      const resp = await axios.get(`https://useless-apis.replit.app/stalk?uid=${id}`);
      var name = resp.data.name;
      var link_profile = resp.data.link;
      var uid = resp.data.id;
      var first_name = resp.data.first_name;
      var username = resp.data.username || "No data!";
      var created_time = convert(resp.data.created_time);
      var web = resp.data.website || "No data!";
      var gender = resp.data.gender;
      var relationship_status = resp.data.relationship_status || "No data!";
      var love = resp.data.significant_other || "No data!";
      var bday = resp.data.birthday || "No data!";
      var follower = resp.data.subscribers.summary.total_count || "No data!";
      var is_verified = resp.data.is_verified;
      var quotes = resp.data.quotes || "No data!";
      var about = resp.data.about || "No data!";
      var locale = resp.data.locale || "No data!";
      var hometown = !!resp.data.hometown ? resp.data.hometown.name : "No Hometown";
      var cover = resp.data.source || "No Cover photo";
      var avatar = `https://graph.facebook.com/${id}/picture?width=1500&height=1500&access_token=1174099472704185|0722a7d5b5a4ac06b11450f7114eb2e9`;

      //callback
let cb = function() {
api.sendMessage({ body: `•——————𝗜𝗡𝗙𝗢——————•
𝖭𝖺𝗆𝖾 ${name}
𝖥𝗂𝗋𝗌𝗍 𝖭𝖺𝗆𝖾: ${first_name}
𝖢𝗋𝖾𝖺𝗍𝗂𝗈𝗇: ${created_time}
𝖯𝗋𝗈𝖿𝗂𝗅𝖾 𝖫𝗂𝗇𝗄: ${link_profile}
𝖦𝖾𝗇𝖽𝖾𝗋: ${gender}
𝖱𝖾𝗅𝖺𝗍𝗂𝗈𝗇𝗌𝗁𝗂𝗉 𝖲𝗍𝖺𝗍𝗎𝗌: ${relationship_status}
𝖡𝗂𝗋𝗍𝗁𝖽𝖺𝗒: ${bday}
𝖥𝗈𝗅𝗅𝗈𝗐𝖾𝗋(𝗌): ${follower}
𝖵𝖾𝗋𝖿𝗂𝖾𝖽: ${is_verified}
𝖧𝗈𝗆𝖾𝗍𝗈𝗐𝗇: ${hometown}
𝖫𝗈𝖼𝖺𝗅𝖾: ${locale}
•————————𝗘𝗡𝗗————————•`, attachment: fs.createReadStream(path)
        }, event.threadID, () => fs.unlinkSync(path), event.messageID);
      };

      request(encodeURI(avatar)).pipe(fs.createWriteStream(path)).on("close", cb);
    } catch (err) {
      api.sendMessage(`Error: ${err.message}`, event.threadID, event.messageID);
    }
  }
};