import 'regenerator-runtime/runtime';
import 'core-js/stable';

let url = '';

export const state = {
  ipData: {},
  coords: [],
  query: '',
  IPAddress: '',
  domain: '',
};

////CHECK SEARCH Query ///////////

export const checkAddress = function (address) {
  if (!address) return;

  const checkIPAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain = /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;
  url = `${
    checkIPAddress.test(address)
      ? (state.IPAddress = address)
      : checkDomain.test(address)
      ? (state.domain = address)
      : ``
  }`;
};

///////////////LOAD IP DATA //////////////

export const loadIP = async function (data) {
  if (!data) url = `/.netlify/functions/getIP`;
  if (!state.IPAddress && state.domain) url = `/.netlify/functions/getIPDomain?domain=${data}`;
  if (state.IPAddress && !state.domain) url = `/.netlify/functions/getIPAdd?IpAddress=${data}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { accept: 'application/json' },
    });
    const data = await res.json();

    if (!res.ok) throw new Error(`💥💥Problem getting the IP Information ${res.status} 💥💥`);
    state.ipData = {
      ip: data.url.ip,
      region: data.url.location.region,
      city: data.url.location.city,
      postalCode: data.url.location.postalCode,
      lat: data.url.location.lat,
      lng: data.url.location.lng,
      timezone: data.url.location.timezone,
      isp: data.url.isp,
    };
    state.coords = [data.url.location.lat, data.url.location.lng];
  } catch (err) {
    throw err;
  }
};
