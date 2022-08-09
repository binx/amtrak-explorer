import { useState, useEffect } from "react";

import MapSVG from "./MapSVG";
import HoverStation from "./HoverStation";
import ClickStation from "./ClickStation";
import StationList from "./StationList";

function VectorMap({ states, routes, stations, width, height, margin, selectedRoute, setSelectedRoute }) {

  const [hoverStation, setHoverStation] = useState();
  const [clickStation, setClickStation] = useState();

  useEffect(() => {
    setClickStation();
  }, [selectedRoute]);

  const highlightColor = selectedRoute && routes.find(r => r.name === selectedRoute).color;

  return (
    <>
      <div style={{ position: "relative", height }}>
        <MapSVG 
          width={width}
          height={height}
          margin={margin}
          stations={stations}
          routes={routes}
          states={states}
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
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
            setSelectedRoute={setSelectedRoute}
            selectedRoute={selectedRoute}
          />
        )}
      </div>
      { !!stations.length && (
        <StationList
          stations={stations}
          selectedRoute={selectedRoute}
          hoverStation={hoverStation}
          color={highlightColor}
          setHoverStation={setHoverStation}
          setClickStation={setClickStation}
        />
      )}
    </>
  );
}

export default VectorMap;
