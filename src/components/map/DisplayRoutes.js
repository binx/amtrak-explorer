import { useState, useEffect } from "react";
import styled from "styled-components";

import { scaleLog, scaleLinear } from "d3-scale";
import { getScaleInfo } from "../util";

const RoutePath = styled.path`
  fill: none;
  stroke-linecap: round;
  cursor: pointer;
`;

function DisplayRoutes({
  isSmall,
  margin,
  routes,
  visType, 
  selectedItem,
  setSelectedItem,
  hoverRoute,
  setHoverLabel
}) {
  const [sortedRoutes, setSortedRoutes] = useState([]);

  useEffect(() => {
    const scaleInfo = getScaleInfo(visType, routes);
    const scale = scaleInfo.scaleType &&
      (scaleInfo.scaleType === "scaleLinear" ? scaleLinear() : scaleLog());

    if (scale)
      scale.domain(scaleInfo.extent).range(scaleInfo.colorRange);

    const newSortedRoutes = routes.map(r => {
      r.visColor = scale ? scale(r[visType]) : r.routeColor;
      return r;
    }).sort((a,b) => {
      if (selectedItem && a.name === selectedItem.value) return 1;
      else if (hoverRoute && a.name === hoverRoute) return 1;
      else return (a[visType] - b[visType])/scaleInfo.extent[1];
    })

    setSortedRoutes(newSortedRoutes);

  }, [routes, visType, selectedItem, hoverRoute]);

  return (
    <>
      <g>
        {routes.map((d,i) => (
          <path
            key={`routeBehind${i}`}
            d={d.d}
            stroke="transparent"
            strokeWidth="10"
            fill="none"
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedItem({ type: "route", value: d.name })}
            onMouseEnter={e => {
            !selectedItem && setHoverLabel({
                point: [e.nativeEvent.offsetX - margin, e.nativeEvent.offsetY - 40],
                value: d.name
              })
            }}
            onMouseLeave={() => setHoverLabel()}
          />
        ))}
      </g>
      <g>
        {sortedRoutes.map((d,i) => {
          const hasRouteSelection = (selectedItem && selectedItem.type === "route") || hoverRoute;
          const hasStationSelection = (selectedItem && selectedItem.type === "station")
          const isSelected = (selectedItem && d.name === selectedItem.value) || hoverRoute === d.name;

          let lineWidth = 2;
          let opacity = 1;

          if (visType !== "default") {
            lineWidth = 4;
          } else if (hasRouteSelection || hasStationSelection ) {
            lineWidth = isSelected ? 5 : 3.5;
          }
          if (hasRouteSelection)
            opacity = isSelected ? 1 : .2;

          const color = (visType !== "default" && !hasRouteSelection)
            ? d.visColor : d.routeColor;
            
          return (
            <RoutePath
              key={`route${i}`}
              d={d.d}
              className={d.name} 
              stroke={color}
              strokeWidth={isSmall ? lineWidth/2 : lineWidth}
              opacity={opacity}
              onClick={() => setSelectedItem({ type: "route", value: d.name })}
              onMouseEnter={e => {
                !selectedItem && setHoverLabel({
                  point: [e.nativeEvent.offsetX - margin, e.nativeEvent.offsetY - 40],
                  value: d.name
                })
              }}
              onMouseLeave={() => setHoverLabel()}
            />
          );
        })}
      </g>
    </>
  );
}

export default DisplayRoutes;