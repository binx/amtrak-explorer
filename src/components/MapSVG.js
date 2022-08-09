import styled from "styled-components";

const SVG = styled.svg`
  border: 1px solid white;
  margin: 0 20px 0 0;
  flex-shrink: 0;
  
  @media only screen and (max-width: 600px) {
    margin: 0 0 20px 0;
  }
`;
const Path = styled.path`
  fill: none;
  stroke-linecap: round;
  cursor: pointer;
  stroke-width: ${props => props.hasSelection ? (props.selected ? 5 : 3.5) : 2};
  opacity: ${props => props.hasSelection ? (props.selected ? 1 : .2) : 1};
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
  stroke-width: 2;
  cursor: pointer;
  &:hover { fill: white; }
`;

function MapSVG({ states, routes, stations, width, height, margin, selectedRoute, setSelectedRoute, hoverStation, setHoverStation, setClickStation }) {
  const isSmall = window.innerWidth < 800;
  const circleColor = selectedRoute && routes.find(r => r.name === selectedRoute).color;

  return (
    <SVG width={width} height={height} >
      <g transform={`translate(${margin},${margin})`}>
        <g>
          {states.map((d,i) => (
            <StatePath d={d.d} key={`state${i}`} />
          ))}
        </g>
        <g>
          {routes.map((d,i) => (
            <path
              key={`routeBehind${i}`}
              d={d.d}
              stroke="transparent"
              strokeWidth="10"
              fill="none"
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedRoute(d.name)}
            />
          ))}
        </g>
        <g>
          {routes.map((d,i) => (
            <Path
              key={`route${i}`}
              d={d.d}
              className={d.name} 
              stroke={d.color} 
              hasSelection={!!selectedRoute}
              selected={d.name === selectedRoute}
              onClick={() => setSelectedRoute(d.name)}
            />
          ))}
        </g>
        <g>
          {stations.map((d,i) => (
            <Circle key={`station${i}`}
              cx={d.point[0]} cy={d.point[1]}
              r={isSmall ? 4 : 6}
              strokeWidth={isSmall ? 1 : 2}
              color={circleColor}
              hasConnection={d.routes.length > 1}
              hovered={hoverStation && hoverStation.properties.code === d.properties.code}
              onMouseEnter={() => setHoverStation(d)}
              onMouseLeave={() => setHoverStation()}
              onClick={() => setClickStation(d)}
            />
          ))}
        </g>
      </g>
    </SVG>
  );
}

export default MapSVG;
