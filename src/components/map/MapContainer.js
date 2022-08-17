import { useState, useEffect, useRef } from "react";
import * as d3 from "d3-geo";

import geoJSON from "../../data/Amtrak_Routes-simplified.geojson";
import stationJSON from "../../data/Amtrak_Stations.geojson";
import statesJSON from "../../data/us-states.geojson";
import ridershipData from "../../data/amtrak_ridership.json";

import RouteHeader from "../ui/RouteHeader";
import StationHeader from "../ui/StationHeader";
import VectorMap from "./VectorMap";

function MapContainer({
    selectedItem,
    setSelectedItem,
    searchParams,
    setSearchParams
  }) {
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
        setStationData(stations.features)
      });

    fetch(geoJSON).then(response => response.json())
      .then(data => {
        const newRouteDate = data.features.map((d,i) => {
          d.routeColor = colors[i%colors.length];
          
          const ridershipDatum = ridershipData
            .find(route => route.name === d.properties.NAME);

          d.passengers = ridershipDatum.passengers;
          d.weekly_trips = ridershipDatum.weekly_trips;
          d.normalized = ridershipDatum.weekly_trips ? ridershipDatum.passengers/ridershipDatum.weekly_trips : null;

          return d;
        });

        setRouteData(newRouteDate);
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
    if (route) setSelectedItem({type: "route", value: route });

    const station = searchParams.get("station");
    if (station) setSelectedItem({type: "station", value: station });

    // eslint-disable-next-line
  }, [stationData, stateData, routeData])

  useEffect(() => {
    if (!stateData.length || !stationData.length || !routeData.length) return;

    let object;
    if (selectedItem && selectedItem.type === "route") {
      object = routeData.find(d => d.properties.NAME === selectedItem.value);
    } else if (selectedItem && selectedItem.type === "station") {
      const station = stationData.find(d => d.properties.station_code === selectedItem.value);
      const p = station.geometry.coordinates;
      // let's make an extent lol
      const padding = 3;
      object = { "type": "LineString", "coordinates": [
        [p[0]-padding, p[1]-padding], [p[0]+padding, p[1]+padding]
      ] };
    } else {
      object = { "type": "FeatureCollection", "features": routeData };
    }

    const projection = d3.geoAlbers()
      .fitExtent([[0, 0], [width - margin*2, height - margin*2]], object);
    const path = d3.geoPath(projection);

    const newRoutes = routeData.map((r,i) => ({
      name: r.properties.NAME,
      routeColor: r.routeColor,
      passengers: r.passengers,
      weekly_trips: r.weekly_trips,
      normalized: r.normalized,
      d: path(r)
    }));
    setRoutes(newRoutes);

    const newStates = stateData.map(d => ({
      d: path(d),
      name: d.properties.name
    }));
    setStates(newStates);

    /* begin station code */

    const newStations = [...stationData].filter(s => {
      if (!selectedItem) return false;
      if (selectedItem.type === "station") return true;
      if (selectedItem.type === "route")
        return s.properties.routes.indexOf(selectedItem.value) !== -1;
      else return false;
    }).map(s => {
      s.point = projection(s.geometry.coordinates);
      return s;
    })
    setStations(newStations);

  // eslint-disable-next-line
  }, [stateData, routeData, stationData, selectedItem]);

  return (
    <div ref={containerRef}>
      { selectedItem && selectedItem.type === "route" && (
        <RouteHeader
          selectedItem={selectedItem} 
          setSelectedItem={setSelectedItem}
          setSearchParams={setSearchParams}
          color={routes.find(r => r.name === selectedItem.value).routeColor}
        />
      )}
      { selectedItem && selectedItem.type === "station" && (
        <StationHeader
          stations={stationData}
          selectedItem={selectedItem} 
          setSelectedItem={setSelectedItem}
          setSearchParams={setSearchParams}
        />
      )}
      <VectorMap
        width={width}
        height={height}
        margin={margin}
        stations={stations}
        routes={routes}
        states={states}
        selectedItem={selectedItem} 
        setSelectedItem={setSelectedItem}
      />
    </div>
  );
}

export default MapContainer;
