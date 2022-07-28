import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
// import moment from "moment";
// import bbox from '@turf/bbox';

function MapGL({ track, waypoints }) {
  let map = useRef();

  useEffect(() => {
    mapboxgl.accessToken = 'pk.eyJ1IjoiYmlueCIsImEiOiJpYW1hellFIn0.x99nCD3EGjCukCS24aop8g';
    map.current = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/binx/ckc0l5q1l54861hqr8ircl4k3',
      attributionControl: false
    });

    var nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'top-right');

  }, [])

  // useEffect(() => {
  //   if (!track) return;

  //   var mapLayer = map.current.getLayer('route');

  //   // i hate u leaflet
  //   if (typeof mapLayer !== 'undefined') {
  //     // Remove map layer & source.
  //     map.current.removeLayer('route').removeSource('route');
  //   }

  //   map.current.addSource('route', {
  //     'type': 'geojson',
  //     'data': track
  //   });
  //   map.current.addLayer({
  //     'id': 'route',
  //     'type': 'line',
  //     'source': 'route',
  //     'paint': {
  //       'line-color': '#FF69B4',
  //       'line-width': 5
  //     },
  //     'layout': {
  //       'line-cap': 'round',
  //       'line-join': 'round'
  //     },
  //     'filter': ['==', '$type', 'LineString']
  //   });

  //   var xx = bbox(track);
  //   map.current.fitBounds(xx, { padding: 100 });

  // }, [track])

  // const markerify = m => (`
  //   <h3>${m.properties.name}</h3>
  //   <p>${moment(m.properties.time).format("YYYY-MM-DD")}</p>
  // `);

  // useEffect(() => {
  //   if (!waypoints) return;

  //   waypoints.features.forEach(function(marker) {
  //     var el = document.createElement('div');
  //     el.className = 'marker';

  //     new mapboxgl.Marker(el)
  //       .setLngLat(marker.geometry.coordinates)
  //       .setPopup(
  //         new mapboxgl.Popup({ offset: 10 })
  //         .setHTML(markerify(marker))
  //       ).addTo(map.current);
  //   });

  // }, [waypoints]);

  return (
    <div id="map" style={{ width: "1400px", height: "700px" }} />
  );
}

export default MapGL;