import styled from "styled-components";

import DisplayRoutes from "./DisplayRoutes";
import DisplayStations from "./DisplayStations";

const SVG = styled.svg`
  border: 1px solid white;
  border-radius: 4px;
  margin: 0 20px 0 0;
  flex-shrink: 0;
  
  @media only screen and (max-width: 600px) {
    margin: 0 0 20px 0;
  }
`;
const StatePath = styled.path`
  fill: none;
  stroke: #888;
  stroke-dasharray: 2 2;
  stroke-width: 1;
  @media only screen and (max-width: 600px) {
    stroke-width: .5;
    stroke-dasharray: 1 1;
  }
`;

function MapSVG({
  states, routes, stations, width, height, margin, 
  selectedItem,
  setSelectedItem,
  hoverLabel,
  setHoverLabel,
  setClickStation,
  hoverRoute,
  visType
}) {
  const isSmall = window.innerWidth < 800;

  let triangleStation;
  if (selectedItem && selectedItem.type === "station") {
    const station = stations
      .find(s => s.properties.station_code === selectedItem.value);
    if (station && station.point) {
      const p = station.point;
      triangleStation = `M${p[0]},${p[1]} ${p[0]-18},${p[1]-35} ${p[0]+18},${p[1]-35}Z`
    }
  }

  return (
    <SVG width={width} height={height} >
      <g transform={`translate(${margin},${margin})`}>
        <g>
          {states.map((d,i) => (
            <StatePath d={d.d} key={`state${i}`} />
          ))}
        </g>
        <DisplayRoutes
          isSmall={isSmall}
          margin={margin}
          routes={routes}
          visType={visType}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          hoverRoute={hoverRoute}
          setHoverLabel={setHoverLabel}
        />
        <DisplayStations
          isSmall={isSmall}
          routes={routes}
          stations={stations}
          hoverLabel={hoverLabel}
          setHoverLabel={setHoverLabel}
          setClickStation={setClickStation}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
        {triangleStation && (
          <path d={triangleStation} fill="white" strokeWidth="3" stroke="#222" />
        )}
      </g>
    </SVG>
  );
}

export default MapSVG;
