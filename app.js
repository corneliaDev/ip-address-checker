import 'regenerator-runtime/runtime';
import 'core-js/stable';
const dotenv = require('dotenv').config();
import axios from 'axios';

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
  url = `${
    checkIpAddress.test(address)
      ? (state.IPAddress = address)
      : checkDomain.test(address)
      ? (state.domain = address)
      : ``
  }`;
  // return url;
};

//////////////////////////////////////
//IPiFy

export const loadIP = async function (data) {
  if (!data) url = `/.netlify/functions/getIP`;
  if (data.domain) url = `/.netlify/functions/getIPDomain?domain=${data}`;
  if (data.IPAddress) url = `/.netlify/functions/getIPAdd?ipAddress=${data}`;

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
