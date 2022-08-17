import styled from "styled-components";

const Circle = styled.circle`
  fill: ${props => props.hovered ? "white" : "#222"};
  stroke: ${props => (props.hasConnection ? "white" : props.color)};
  cursor: pointer;
  &:hover { fill: white; }
`;

function DisplayStations({
  isSmall,
  routes,
  stations,
  selectedItem,
  setSelectedItem,
  hoverLabel,
  setHoverLabel,
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
          r={isSmall ? 3 : 6}
          strokeWidth={isSmall ? 2 : 3}
          color={circleColor}
          hasConnection={d.properties.routes.length > 1}
          hovered={hoverLabel && hoverLabel.value === d.properties.station_name}
          onMouseEnter={() => (
            setHoverLabel({
              point: d.point,
              value: d.properties.station_name
            })
          )}
          onMouseLeave={() => setHoverLabel()}
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
