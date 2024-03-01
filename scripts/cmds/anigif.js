const fetch = require('node-fetch');
const fs = require('fs-extra');

module.exports = {
    config: {
        name: "gif",
        version: "1.0",
        author: "Rômeo",
        role: 0,
        category: "Fun",
        shortDescription: "bot will send you anime gif based on tag.",
        longDescription: "bot will send you anime gif based on tag.",
        guide: {
            en: "{pn} <tag> |type only {pn} to see tag list",
        }
    },

    onStart: async function ({ api, args, message, event }) {
        const availableTags = ["bite", "blush", "comfy", "cry", "cuddle", "dance", "eevee", "fluff", "holo", "hug", "icon", "kiss", "kitsune", "lick", "neko", "okami", "pat", "poke", "senko", "sairo", "slap", "smile", "tail", "tickle", "anal", "blowjob", "cum", "fuck", "pussylick", "solo", "threesome_fff", "threesome_ffm", "threesome_mmf", "yaio", "yuri"];

        const tag = args[0];

        if (!availableTags.includes(tag)) {
            let invalidTagMessage = `𝗜𝗡𝗩𝗔𝗟𝗜𝗗 𝗧𝗔𝗚 :\n\nYou has been type wrong Tag\n\n 🍒 𝗣𝗟𝗘𝗔𝗦𝗘 𝗨𝗦𝗘 𝗧𝗛𝗘𝗦𝗘 𝗚𝗜𝗙 𝗧𝗔𝗚'𝘀\n`;
            invalidTagMessage += "1. ➤【 𝗯𝗶𝘁𝗲 】\n2. ➤【 𝗯𝗹𝘂𝘀𝗵 】\n3. ➤【 𝗰𝗼𝗺𝗳𝘆 】\n4. ➤【 𝗰𝗿𝘆 】\n5. ➤【 𝗰𝘂𝗱𝗱𝗹𝗲 】\n6. ➤【 𝗲𝗲𝘃𝗲𝗲 】\n7. ➤【 𝗱𝗮𝗻𝗰𝗲 】\n8. ➤【 𝗳𝘂𝗹𝗳𝗳 】\n9. ➤【 𝗵𝘂𝗴 】\n10. ➤【 𝗵𝗼𝗹𝗮 】\n11. ➤【 𝗶𝗰𝗼𝗻 】\n12. ➤【 𝗸𝗶𝘀𝘀 】\n13. ➤【 𝗹𝗶𝗰𝗸 】\n14. ➤【 𝗻𝗲𝗸𝗼 】\n15. ➤【 𝗸𝗶𝘁𝘀𝘂𝗻𝗲 】\n16. ➤【 𝗽𝗮𝘁 】\n17. ➤【 𝗼𝗸𝗮𝗺𝗶 】\n18. ➤【 𝗽𝗼𝗸𝗲 】\n19. ➤【 𝘀𝗲𝗻𝗸𝗼 】\n20. ➤【 𝘀𝗮𝗶𝗿𝗼 】\n21. ➤【 𝘀𝗹𝗮𝗽 】\n22. ➤【 𝘀𝗺𝗶𝗹𝗲 】\n23. ➤【 𝘁𝗮𝗶𝗹 】\n24. ➤【 𝘁𝗶𝗰𝗸𝗹𝗲 】";
            return message.reply(invalidTagMessage);
        }

        const isNsfw = ["anal", "blowjob", "cum", "fuck", "pussylick", "solo", "threesome_fff", "threesome_ffm", "threesome_mmf", "yaio", "yuri"].includes(tag);

        setTimeout(async () => {
            await message.unsend();
        }, 100000);

        const endpoint = isNsfw
            ? `https://purrbot.site/api/img/nsfw/${tag}/gif`
            : `https://purrbot.site/api/img/sfw/${tag}/gif`;

        const response = await fetch(endpoint);

        if (response.status !== 200) {
            return message.reply("Failed to get image.");
        }

        const data = await response.json();
        const gif = data.link;

        const gifResponse = await fetch(gif);
        const buffer = await gifResponse.buffer();

        fs.writeFileSync(`${tag}_anime.gif`, buffer);

        message.reply({
            body: `💌𝗛𝗲𝗿𝗲 𝗶𝘀 𝗬𝗼𝘂𝗿 ${tag} 𝗴𝗶𝗳  \n\n🍒 𝗣𝗹𝗲𝗮𝘀𝗲 𝗘𝗻𝗷𝗼𝘆!...`,
            attachment: fs.createReadStream(`${tag}_anime.gif`)
        }).then(() => fs.unlinkSync(`${tag}_anime.gif`));
    }
};