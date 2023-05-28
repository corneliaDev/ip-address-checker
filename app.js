// import dotenv from './node_modules/dotenv';
import 'regenerator-runtime/runtime';
import 'core-js/stable';

// dotenv.config();
let url = '';

export const state = {
  ipData: {},
  coords: [],
  query: '',
  IPAddress: '',
  domain: '',
};

export const checkAddress = function (address) {
  if (!address) return;
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  url = ` https://geo.ipify.org/api/v2/country,city?apiKey=<KEY>&${
    checkIpAddress.test(address) ? `IpAddress=${address}` : checkDomain.test(address) ? `domain=${address}` : ``
  }`;
  return url;
};

//////////////////////////////////////
//IPiFy

export const loadIP = async function (url) {
  try {
    if (!url) url = 'https://geo.ipify.org/api/v2/country,city?apiKey=<KEY>&';
    url = url.replace('<KEY>', process.env.API_KEY);
    console.log(url);
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(`💥💥Problem getting the IP Information ${res.status} 💥💥`);
    state.ipData = {
      ip: data.ip,
      region: data.location.region,
      city: data.location.city,
      postalCode: data.location.postalCode,
      lat: data.location.lat,
      lng: data.location.lng,
      timezone: data.location.timezone,
      isp: data.isp,
    };
    state.coords = [data.location.lat, data.location.lng];
  } catch (err) {
    throw err;
  }
};
