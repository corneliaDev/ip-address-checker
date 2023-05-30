// require('dotenv').config();

const axios = require('axios');

exports.handler = async (event, context) => {
  try {
    let response = await axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.API_KEY}&`, {
      headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' },
      params: { trophies: true },
    });

    let url = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
