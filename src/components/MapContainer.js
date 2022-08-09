import { useState, useEffect, useRef } from "react";
import * as d3 from "d3-geo";

import geoJSON from "./data/Amtrak_Routes-simplified.geojson";
import stationJSON from "./data/Amtrak_Stations.geojson";
import statesJSON from "./data/us-states.geojson";
import stationList from "./data/stations.json";

import VectorMap from "./VectorMap";

function MapContainer({ selectedRoute, setSelectedRoute, searchParams }) {
  const margin = window.innerWidth > 800 ? 50 : 20;

  const containerRef = useRef();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  const [stateData, setStateData] = useState([]);
  const [routeData, setRouteData] = useState([]);
  const [stationData, setStationData] = useState([]);

  const [routes, setRoutes] = useState([]);
  const [stations, setStations] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const div = containerRef.current;
    const w = window.innerWidth > 800 ? div.clientWidth - 280 : div.clientWidth;
    const h = w * .75;
    setWidth(w);
    setHeight(h);

    fetch(stationJSON).then(response => response.json())
      .then(stations => {
        const trainsOnly = stations.features
          .filter(s => s.properties.stntype === "TRAIN");
        setStationData(trainsOnly)
      });

    fetch(geoJSON).then(response => response.json())
      .then(data => {
        setRouteData(data.features);
      });

    fetch(statesJSON).then(response => response.json())
      .then(stateData => {
        setStateData(stateData.features);
      });

      // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!stateData.length || !stationData.length || !routeData.length) return;
    // try to get everything loaded before selecting a route
    const route = searchParams.get("route");
    if (route) setSelectedRoute(route);
    // eslint-disable-next-line
  }, [stationData, stateData, routeData])

  useEffect(() => {
    if (!stateData.length || !stationData.length || !routeData.length) return;

    let object;
    if (selectedRoute) {
      object = routeData.find(d => d.properties.NAME === selectedRoute);
    } else {
      object = { "type": "FeatureCollection", "features": routeData };
    }

    const projection = d3.geoAlbers()
      .fitExtent([[0, 0], [width - margin*2, height - margin*2]], object);
    const path = d3.geoPath(projection);

    const newRoutes = routeData.map(r => ({
      name: r.properties.NAME,
      d: path(r)
    }));
    setRoutes(newRoutes);

    const newStates = stateData.map(d => ({
      d: path(d),
      name: d.properties.name
    }));
    setStates(newStates);

    /* begin station code */
    const bounds = d3.geoBounds(object);
    const aspect = [bounds[1][0] - bounds[0][0], bounds[1][1] - bounds[0][1]];
    const isHorizontalish = aspect[0] > aspect[1];

    const stationsOnRoute = [...stationList].filter(s => {
      if (s.routes.indexOf(selectedRoute) !== -1)
        return true;
      else return false;
    });
    const stationCodes = stationsOnRoute.map(s => s.station_code);

    const newStations = [...stationData].filter(s => {
      if (stationCodes.indexOf(s.properties.code) !== -1) return true;
      else return false;
    }).map(s => {
      const index = stationCodes.indexOf(s.properties.code);

      s.point = projection(s.geometry.coordinates);
      s.routes = stationsOnRoute[index].routes;
      return s;
    }).sort((a,b) => {
      if (isHorizontalish) return a.point[0] - b.point[0];
      else return a.point[1] - b.point[1]; 
    })
    setStations(newStations);

  // eslint-disable-next-line
  }, [stateData, routeData, stationData, selectedRoute]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }} ref={containerRef}>
      <VectorMap
        width={width}
        height={height}
        margin={margin}
        stations={stations}
        routes={routes}
        states={states}
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
    </div>
  );
}

export default MapContainer;
