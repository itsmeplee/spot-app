import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoidHJlbnRnb2luZyIsImEiOiJjam11bDQwdGwyeWZ5M3FqcGFuaHRxd3Q2In0.UyaQAvC0nx08Ih7-vq3wag';

const addSpot = function (spot, map, claimSpot) {
  if(!(map.getSource(`${spot.id}`))) {
    let geojson = {
      "type": "FeatureCollection",
      "features": [{
          "type": "Feature",
          "properties": {
            "spot_id": spot.id,
          },
          "geometry": {
              "type": "Point",
              "coordinates": [spot.lng, spot.lat]
          }
      }]
    };
    map.addSource(`${spot.id}`, {
      "type": "geojson",
      "data": geojson
    });
    map.addLayer({
      "id": `${spot.id}`,
      "type": "symbol",
      "source": `${spot.id}`,
      "layout": {
        "icon-image": `${spot.type === 1 ? 'blue-meter' : 'green-meter'}`,
        "icon-size": 0.25,
        "icon-allow-overlap": true
    }
      // "paint": {
      //     "circle-radius": 10,
      //     "circle-color": `${spot.type === 1 ? '#f4f142' : '#f44242'}`
      // }
    });

    map.on('mouseenter', `${spot.id}`, () => {
      map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    map.on('mouseleave', `${spot.id}`, () => {
      map.getCanvas().style.cursor = '';
    });

    map.on('click', `${spot.id}`, () => {
      claimSpot(spot);
    });
  }
};

const removeSpot = function(spot, map) {
  if((map.getSource(`${spot.id}`))) {
    try{
      map.removeLayer(spot.id);
      map.removeSource(spot.id);
    } catch(err) {
      console.log(err);
    }
  }
};

const initializeMap = function(lat, lng, zoom, mapContainer, moveHandler, clickHandler) {
  const map = new mapboxgl.Map({
    container: mapContainer,
    style: 'mapbox://styles/trentgoing/cjn3k897e04832ro1m1uospzy',
    center: [lng, lat],
    zoom
  });

  map.on('move', () => {
    const { lng, lat } = map.getCenter();
    moveHandler(lng.toFixed(4), lat.toFixed(4), map.getZoom().toFixed(2) );
  });

  map.loadImage('/parking-meter-blue.png', function(error, image) {
      if (error) console.log(error);
      map.addImage('blue-meter', image);
  })

  map.loadImage('/parking-meter-green.png', function(error, image) {
    if (error) console.log(error);
    map.addImage('green-meter', image);
  })

  map.on('click', 'places', (e) => {
    var coordinates = e.features[0].geometry.coordinates.slice();
    var description = e.features[0].properties.description;
    // Ensure that if the map is zoomed out such that multiple copies of the feature are visible, 
    // the popup appears over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(description)
        .addTo(map);
  });

  map.on('click', 'point', (e) => {
    clickHandler(e.lngLat.lat, e.lngLat.lng);
    // this.setState({
    //   listSpotLat: e.lngLat.lat,
    //   listSpotLng: e.lngLat.lng
    // })
    // this.props.history.push({
    //   pathname: '/addSpot',
    //   state: { lng: this.state.listSpotLng, lat: this.state.listSpotLat }
    // });
  });

  // Change the cursor to a pointer when the mouse is over the places layer.
  map.on('mouseenter', 'places', () => {
    map.getCanvas().style.cursor = 'pointer';
  });

  // Change it back to a pointer when it leaves.
  map.on('mouseleave', 'places', () => {
    map.getCanvas().style.cursor = '';
  });

  map.on('mouseenter', 'point', () => {
    map.setPaintProperty('point', 'circle-color', '#3bb2d0');
    map.getCanvas().style.cursor = 'pointer';
  });

  map.on('mouseleave', 'point', () => {
    map.setPaintProperty('point', 'circle-color', '#3887be');
    map.getCanvas().style.cursor = '';
  });

  map.on('click', (e) =>  {
    if (map.getZoom() < 17) {
      let newZoom = map.getZoom() + 2;
      map.flyTo({center: e.lngLat, zoom: newZoom});
      moveHandler(e.lngLat.lng, e.lngLat.lat, newZoom );
    }
    else {
      if (map.getSource('point')) {
        let geojson = {
          "type": "FeatureCollection",
          "features": [{
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [e.lngLat.lng, e.lngLat.lat]
              }
          }]
        };
        map.getSource('point').setData(geojson);
      }
      else {
        let geojson = {
          "type": "FeatureCollection",
          "features": [{
              "type": "Feature",
              "geometry": {
                  "type": "Point",
                  "coordinates": [e.lngLat.lng, e.lngLat.lat]
              }
          }]
        };
        map.addSource('point', {
          "type": "geojson",
          "data": geojson
        });

        map.addLayer({
          "id": "point",
          "type": "circle",
          "source": "point",
          "paint": {
              "circle-radius": 10,
              "circle-color": "#3887be"
          }
        });
      }
    }
    // map.flyTo({center: e.lngLat});
  });

  return map;
}

export {
  addSpot, 
  removeSpot, 
  initializeMap
};