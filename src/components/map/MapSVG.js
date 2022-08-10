import styled from "styled-components";

const SVG = styled.svg`
  border: 1px solid white;
  border-radius: 4px;
  margin: 0 20px 0 0;
  flex-shrink: 0;
  
  @media only screen and (max-width: 600px) {
    margin: 0 0 20px 0;
  }
`;
const RoutePath = styled.path`
  fill: none;
  stroke-linecap: round;
  cursor: pointer;
  stroke-width: ${props => 
    (props.hasRouteSelection || props.hasStationSelection )
    ? (props.selected ? 5 : 3.5) 
    : 2
  };
  opacity: ${props => {
    if (props.hasRouteSelection) return (props.selected ? 1 : .2);
    else if (props.hasStationSelection) return 2;
    else return 1;
  }};
`;
const StatePath = styled.path`
  fill: none;
  stroke: #888;
  stroke-dasharray: 2 2;
  stroke-width: 1;
`;
const Circle = styled.circle`
  fill: ${props => props.hovered ? "white" : "#222"};
  stroke: ${props => (props.hasConnection ? "white" : props.color)};
  stroke-width: 3;
  cursor: pointer;
  &:hover { fill: white; }
`;

function MapSVG({
  states, routes, stations, width, height, margin, 
  selectedItem,
  setSelectedItem,
  hoverStation,
  setHoverStation,
  setClickStation
}) {
  const isSmall = window.innerWidth < 800;
  
  let circleColor = "#888";
  if (selectedItem && selectedItem.type === "route")
    circleColor = routes.find(r => r.name === selectedItem.value).color;

  const sortedRoutes = routes.sort((a,b) => {
    if (a.name === selectedItem.value) return 1;
    else return -1;
  });

  let triangleStation;
  if (selectedItem && selectedItem.value) {
    const station = stations
      .find(s => s.properties.station_code === selectedItem.value);
    if (station && station.point) {
      const p = station.point;
      triangleStation = `M${p[0]},${p[1]} ${p[0]-15},${p[1]-30} ${p[0]+15},${p[1]-30}Z`
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
        <g>
          {sortedRoutes.map((d,i) => (
            <path
              key={`routeBehind${i}`}
              d={d.d}
              stroke="transparent"
              strokeWidth="10"
              fill="none"
              style={{ cursor: "pointer" }}
              onClick={() => selectedItem({ type: "route", value: d.name })}
            />
          ))}
        </g>
        <g>
          {routes.map((d,i) => (
            <RoutePath
              key={`route${i}`}
              d={d.d}
              className={d.name} 
              stroke={d.color} 
              hasRouteSelection={(selectedItem && selectedItem.type === "route")}
              hasStationSelection={(selectedItem && selectedItem.type === "station")}
              selected={d.name === selectedItem.value}
              onClick={() => setSelectedItem({ type: "route", value: d.name })}
            />
          ))}
        </g>
        <g>
          {stations.map((d,i) => (
            <Circle
              key={`station${i}`}
              cx={d.point[0]} cy={d.point[1]}
              r={isSmall ? 4 : 6}
              strokeWidth={isSmall ? 1 : 2}
              color={circleColor}
              hasConnection={d.properties.routes.length > 1}
              hovered={hoverStation && hoverStation.properties.station_code === d.properties.station_code}
              onMouseEnter={() => setHoverStation(d)}
              onMouseLeave={() => setHoverStation()}
              onClick={() => setClickStation(d)}
            />
          ))}
        </g>
        {triangleStation && (
          <path d={triangleStation} fill="white" strokeWidth="3" stroke="black" />
        )}
      </g>
    </SVG>
  );
}

export default MapSVG;
