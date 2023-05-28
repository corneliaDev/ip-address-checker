import * as app from '../app.js';
import locationView from './locationView.js';

const controlSearchResults = async function () {
  try {
    const query = locationView.getQuery();
    const url = app.checkAddress(query);
    if (!url.includes('ip') || !url.includes('domain'))
      throw new Error(`"${query}" please enter a correct domain or ip address`);
    await app.loadIP(url);
    controlRender(app.state);
  } catch (err) {
    locationView._renderError(err);
  }
};

const controlLoadIP = async function () {
  try {
    await app.loadIP();
    controlRender(app.state);
  } catch (err) {
    locationView._renderError(err);
  }
};

const controlRender = function (data) {
  locationView._renderMap(data.coords);
  locationView._renderLocation(data.ipData);
};

const init = function () {
  locationView.loadMapHandler(controlLoadIP);
  locationView.searchHandler(controlSearchResults);
};
init();
