import { useState, useEffect } from "react";
import styled from "styled-components";

import trainSVG from "../ui/train.svg";

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  width: 240px;
  @media only screen and (max-width: 800px) {
    padding: 20px 10px 0;
  }
`;
const RouteName = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  &:hover span { text-decoration: underline; }
`;
const Train = styled.div`
  background-color: ${props => props.color};
  mask: url(${trainSVG}) no-repeat 50% 50%;
  mask-size: contain;
  width: 25px;
  height: 25px;
  margin-right: 5px;

  @media only screen and (max-width: 600px) {
    width: 20px;
    height: 20px;
  }
`;

function RouteList({ station, routes, setSelectedItem, setHoverRoute }) {
  const [routeColors, setRouteColors] = useState([]);

  useEffect(() => {
    if (!station || !routes) return;

    const newRouteColors = routes
      .filter(r => station.properties.routes.indexOf(r.name) !== -1);
    setRouteColors(newRouteColors);
  }, [station, routes]);

  return (
    <Flex>
      { routeColors.map((r,i) => (
        <RouteName key={`route${i}`} style={{ color: r.routeColor }}
          onClick={() => setSelectedItem({ type: "route", value: r.name})}
          onMouseEnter={() => setHoverRoute(r.name)}
          onMouseLeave={() => setHoverRoute()}
        >
          <Train color={r.routeColor} />
          <span>{r.name}</span>
        </RouteName>
      ))}
    </Flex>
  );
}

export default RouteList;
