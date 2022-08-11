import { useState, useEffect } from "react";

import MapSVG from "./MapSVG";
import HoverStation from "./HoverStation";
import ClickStation from "./ClickStation";

import StationList from "../stations/StationList";
import RouteList from "../stations/RouteList";

function VectorMap({
    states, routes, stations,
    width, height, margin,
    selectedItem, setSelectedItem
  }) {

  const [hoverStation, setHoverStation] = useState();
  const [clickStation, setClickStation] = useState();

  useEffect(() => {
    setClickStation();
  }, [selectedItem]);

  const highlightColor = selectedItem && selectedItem.type === "route"
    && routes.find(r => r.name === selectedItem.value).color;

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      <div style={{ position: "relative", height }}>
        <MapSVG 
          width={width}
          height={height}
          margin={margin}
          stations={stations}
          routes={routes}
          states={states}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoverStation={hoverStation}
          setHoverStation={setHoverStation}
          setClickStation={setClickStation}
        />
        { hoverStation && (
          <HoverStation hoverStation={hoverStation} margin={margin} />
        )}
        { clickStation && (
          <ClickStation
            station={clickStation}
            margin={margin} height={height} 
            setClickStation={setClickStation}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        )}
      </div>
      { selectedItem && selectedItem.type === "route" && !!stations.length && (
        <StationList
          stations={stations}
          selectedItem={selectedItem}
          hoverStation={hoverStation}
          color={highlightColor}
          setHoverStation={setHoverStation}
          setClickStation={setClickStation}
        />
      )}
      { selectedItem && selectedItem.type === "station" && (
        <RouteList
          station={stations.find(s => s.properties.station_code === selectedItem.value)}
          routes={routes}
          setSelectedItem={setSelectedItem}
        />
      )}
    </div>
  );
}

export default VectorMap;
