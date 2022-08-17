import { useState, useEffect } from "react";
import styled from "styled-components";

import { scaleLog, scaleLinear } from "d3-scale";
import { extent } from "d3-array";

const RoutePath = styled.path`
  fill: none;
  stroke-linecap: round;
  cursor: pointer;
`;

function DisplayRoutes({ routes, visType, selectedItem, setSelectedItem, hoverRoute }) {
  const [sortedRoutes, setSortedRoutes] = useState([]);

  useEffect(() => {
    const typeExtent = extent(routes, d => d[visType]);
    let scale;

    if (visType === "passengers" || visType === "weekly_trips")
      scale = scaleLog().domain(typeExtent).range(["#6495ED", "#DE3163"]);
    else if (visType === "normalized")
      scale = scaleLinear().domain(typeExtent).range(["#6495ED", "#DE3163"]);

    const newSortedRoutes = routes.map(r => {
      r.visColor = scale ? scale(r[visType]) : r.routeColor;
      return r;
    }).sort((a,b) => {
      if (selectedItem && a.name === selectedItem.value) return 1;
      else if (hoverRoute && a.name === hoverRoute) return 1;
      else return (a[visType] - b[visType])/typeExtent[1];
    })

    setSortedRoutes(newSortedRoutes);

  }, [routes, visType, selectedItem, hoverRoute]);

  return (
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

        const color = visType !== "default" ? d.visColor : d.routeColor;
        return (
          <RoutePath
            key={`route${i}`}
            d={d.d}
            className={d.name} 
            stroke={color}
            strokeWidth={lineWidth}
            opacity={opacity}
            onClick={() => setSelectedItem({ type: "route", value: d.name })}
          />
        );
      })}
    </g>
  );
}

export default DisplayRoutes;