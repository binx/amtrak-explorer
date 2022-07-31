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
  stroke-width: ${props => props.selected ? 5 : 2};
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
  stroke: white;
  cursor: pointer;
  &:hover { fill: white; }
`;

function MapSVG({ states, routes, stations, width, height, margin, selectedRoute, setSelectedRoute, hoverStation, setHoverStation }) {
  const colors = ["#DFFF00", "#FFBF00", "#FF7F50", "#DE3163", "#9FE2BF", "#40E0D0", "#6495ED", "#CCCCFF"];
  const isSmall = window.innerWidth < 800;

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
              stroke={colors[i%colors.length]} 
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
              hovered={hoverStation && hoverStation.properties.code === d.properties.code}
              onMouseEnter={() => setHoverStation(d)}
              onMouseLeave={() => setHoverStation()}
            />
          ))}
        </g>
      </g>
    </SVG>
  );
}

export default MapSVG;
