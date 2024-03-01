const axios = require('axios');

module.exports.styled = async (content, title, contentFont, titleFont) => {
  try {
    const response = await axios.post('https://lianeapi.onrender.com/api/styler', {
      content,
      title,
      contentFont,
      titleFont,
    });

    if (!response.data) {
      throw new Error('Failed to fetch or style the content');
    }

    const result = response.data.message;
    return result;
  } catch (error) {
    console.error('An error occurred:', error.message);
    return content;
  }
}
