import { useState, useEffect } from "react";
import styled from "styled-components";

import { Button } from "grommet";
import trainSVG from "./train.svg";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: ${props => props.color};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    @media only screen and (max-width: 900px) {
      width: 100%;
    }
  }
  a {
    font-size: 14px;
    color: white;
    text-decoration: none;
    margin-left: 40px;
    span {
      display: inline-block;
      transform: rotate(90deg);
      margin-left: 8px;
      font-size: 22px;
    }
    @media only screen and (max-width: 900px) {
      margin: 10px 0 20px 0;
    }
  }
`;
const ResetButton = styled(Button)`
  margin-right: 15px;
  border-radius: 4px;
  color: white;
  padding: 4px 12px;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const RouteName = styled.div`
  display: flex;
  align-items: center;
  margin: 0 30px 20px 0;
  span {
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
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

function StationHeader({ stations, routes, selectedItem, setSelectedItem, setSearchParams }) {
  const [station, setStation] = useState();
  const [routeColors, setRouteColors] = useState([]);

  useEffect(() => {
    const newStation = stations.find(s => s.properties.station_code === selectedItem.value);
    setStation(newStation);

    const newRouteColors = routes
      .filter(r => newStation.properties.routes.indexOf(r.properties.NAME) !== -1)
      .map(r => (
        { color: r.color, name: r.properties.NAME }
      ));
    setRouteColors(newRouteColors);
  }, [stations, routes, selectedItem]);

  const resetStation = () => {
    setSelectedItem();
    setSearchParams({});
  }
  // eslint-disable-next-line
  const href = `https://www.amtrak.com/stations/${selectedItem.value}.html`;

  if (!station) return null;

  return (
    <div>
      <Wrapper>
        <Flex>
          <h2>{station.properties.station_name}</h2>
          <a target="_blank" rel="noreferrer" href={href}>
            view on amtrak.com<span>⇱</span>
          </a>
        </Flex>
        <Flex>
          <ResetButton onClick={resetStation} 
            outline label="reset map"
            size="small"
          />
        </Flex>
      </Wrapper>
      <Flex>
        { routeColors.map((r,i) => (
          <RouteName key={`route${i}`} style={{ color: r.color }}>
            <Train color={r.color} />
            <span
              onClick={() => setSelectedItem({ type: "route", value: r.name})}
            >{r.name}</span>
          </RouteName>
        ))}
      </Flex>
    </div>
  );
}

export default StationHeader;
