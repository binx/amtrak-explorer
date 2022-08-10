import { useState, useEffect, useRef } from "react";
import * as d3 from "d3-geo";

import geoJSON from "../../data/Amtrak_Routes-simplified.geojson";
import stationJSON from "../../data/Amtrak_Stations.geojson";
import statesJSON from "../../data/us-states.geojson";
import stationList from "../../data/stations.json";

import RouteHeader from "./RouteHeader";
import VectorMap from "./VectorMap";

function MapContainer({ selectedRoute, setSelectedRoute, searchParams, setSearchParams }) {
  const margin = window.innerWidth > 800 ? 50 : 20;
  const colors = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF"];

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
    const h = w * .7;
    setWidth(w);
    setHeight(h);

    fetch(stationJSON).then(response => response.json())
      .then(stations => {
        const trainsOnly = stations.features
          .filter(s => s.properties.stntype === "TRAIN");

        console.log(trainsOnly.length, stations.features.length)
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

    const newRoutes = routeData.map((r,i) => ({
      name: r.properties.NAME,
      color: colors[i%colors.length],
      d: path(r)
    }));
    setRoutes(newRoutes);

    const newStates = stateData.map(d => ({
      d: path(d),
      name: d.properties.name
    }));
    setStates(newStates);

    /* begin station code */

    const stationsOnRoute = [...stationList].filter(s => (
      s.routes.indexOf(selectedRoute) !== -1
    ));
    const stationCodes = stationsOnRoute.map(s => s.station_code);

    const newStations = [...stationData].filter(s => {
      if (stationCodes.indexOf(s.properties.code) !== -1) return true;
      else return false;
    }).map(s => {
      const index = stationCodes.indexOf(s.properties.code);

      s.point = projection(s.geometry.coordinates);
      s.routes = stationsOnRoute[index].routes;
      return s;
    })
    setStations(newStations);

  // eslint-disable-next-line
  }, [stateData, routeData, stationData, selectedRoute]);

  return (
    <div ref={containerRef}>
      { selectedRoute && (
        <RouteHeader
          selectedRoute={selectedRoute} 
          setSelectedRoute={setSelectedRoute}
          setSearchParams={setSearchParams}
          color={routes.find(r => r.name === selectedRoute).color}
        />
      )}
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
