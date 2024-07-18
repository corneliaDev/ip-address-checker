import icon from 'url:../images/icon-location.svg';

class LocationView {
  _parentEl = document.querySelector('.search');
  _searchInput = document.querySelector('.search__input');
  _dataSection = document.querySelector('.data');
  // _map = document.querySelector('#map');

  _data;
  _map;

  getQuery() {
    const query = this._parentEl.querySelector('.search__input').value;

    return query;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__input').value = '';
  }

  loadMapHandler(handler) {
    window.addEventListener('load', handler);
  }

  searchHandler(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.search__button');
      if (!btn) return;
      // e.preventDefault();
      handler();
    });
  }

  _generateMarkup(data) {
    return `<div class="data__col">
      <h2 class="data__header">IP Address</h2>
      <p class="data__text" id="IPAddress">${data.ip}</p>
      <div class="data__line"></div>
    </div>
    <div class="data__col">
      <h2 class="data__header">Location</h2>
      <p class="data__text" id="location">${data.region}, ${data.city} ${data.postalCode}</p>
      <div class="data__line"></div>
    </div>
    <div class="data__col">
      <h2 class="data__header">Timezone</h2>
      <p class="data__text" id="timezone">UTC ${data.timezone}</p>
      <div class="data__line"></div>
    </div>
    <div class="data__col">
      <h2 class="data__header">ISP</h2>
      <p class="data__text" id="isp">${data.isp}</p>
    </div>`;
  }

  _renderLocation(data) {
    this._dataSection.innerHTML = '';
    let html = this._generateMarkup(data);
    this._dataSection.insertAdjacentHTML('afterbegin', html);
  }

  _renderMap(coords) {
    if (this._map) this._map.remove();
    this._map = L.map('map').setView(coords, 15);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this._map);
    this._renderMarker(coords);
  }

  _renderMarker(coords) {
    const myIcon = L.icon({
      iconUrl: `${icon}`,
      iconSize: [40, 45],
    });

    L.marker(coords, { icon: myIcon }).addTo(this._map);
  }

  _renderError(err) {
    this._dataSection.innerHTML = '';
    let html = `<div>
    <p class="error"> ${err} </p>
                </div>`;
    this._dataSection.insertAdjacentHTML('afterbegin', html);
  }
}

export default new LocationView();
