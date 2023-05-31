import * as app from '../app.js';
import locationView from './locationView.js';

const controlSearchResults = async function () {
  try {
    const query = locationView.getQuery();
    app.checkAddress(query);
    if (app.state.IPAddress && !app.state.domain) await app.loadIP(`IpAddress=${app.state.IPAddress}`);
    if (!app.state.IPAddress && app.state.domain) await app.loadIP(`domain=${app.state.domain}`);
    if (!app.state.IPAddress && !app.state.domain)
      throw new Error(`"${query}" please enter a correct domain or ip address`);

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
