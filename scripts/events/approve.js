const fs = require('fs');
const langs = {
  vi: {
    rubishapproval: `
⚠ | This group isn't approved

You can't use bot without owner permission 🙅

Bot will leave this group between 30 seconds🏃‍♂️

Inbox my owner to get approval❤️‍🔥
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

Owner FB ➠www.facebook.com/mdromeoislamrasel.5`
  },
  en: {
    rubishapproval: `
⚠ | This group isn't approved

You can't use bot without owner permission 🙅

Bot will leave this group between 30 seconds🏃‍♂️

Inbox my owner to get approval❤️‍🔥
﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏﹏

Owner FB 
➠www.facebook.com/mdromeoislamrasel.5`
  }
};
module.exports = {
  'config': {
    'name': "approve",
    'version': "2.0",
    'author': "RUBISH",
    'category': "events"
  },
  'langs': langs,
  'onStart': async ({
    event: _0x481b88,
    api: _0x3c2696,
    getLang: _0x4e5ed8
  }) => {
    if (_0x481b88.logMessageType == "log:subscribe") {
      return async function () {
        const {
          threadID: _0xb7b10d
        } = _0x481b88;
        const _0x416276 = JSON.parse(fs.readFileSync("threadApproved.json"));
        if (!_0x416276.includes(_0xb7b10d)) {
          const _0x28d62d = _0x3c2696.getCurrentUserID();
          _0x3c2696.sendMessage({
            'body': _0x4e5ed8("rubishapproval"),
            'mentions': [{
              'tag': "Admin",
              'id': _0x28d62d
            }]
          }, _0xb7b10d);
          setTimeout(() => {
            _0x3c2696.removeUserFromGroup(_0x28d62d, _0xb7b10d);
          }, 30000);
        }
      };
    }
  }
};