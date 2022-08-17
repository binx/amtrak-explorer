import styled from "styled-components";

const Circle = styled.circle`
  fill: ${props => props.hovered ? "white" : "#222"};
  stroke: ${props => (props.hasConnection ? "white" : props.color)};
  stroke-width: 3;
  cursor: pointer;
  &:hover { fill: white; }
`;

function DisplayStations({
  isSmall,
  routes,
  stations,
  selectedItem,
  setSelectedItem,
  hoverStation,
  setHoverStation,
  setClickStation
}) {  
  let circleColor = "#888";
  if (selectedItem && selectedItem.type === "route")
    circleColor = routes.find(r => r.name === selectedItem.value).routeColor;

  return (
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
          onClick={() => {
            if (selectedItem && selectedItem.type === "station")
              setSelectedItem({ type: "station", value: d.properties.station_code })
            else
              setClickStation(d)
          }}
        />
      ))}
    </g>
  );
}

export default DisplayStations;
