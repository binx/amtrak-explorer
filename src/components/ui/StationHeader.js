import { useState, useEffect } from "react";
import styled from "styled-components";

import { Button } from "grommet";

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

function StationHeader({ stations, routes, selectedItem, setSelectedItem, setSearchParams }) {
  const [station, setStation] = useState();

  useEffect(() => {
    const newStation = stations.find(s => s.properties.station_code === selectedItem.value);
    setStation(newStation);
  }, [stations, selectedItem]);

  const resetStation = () => {
    setSelectedItem();
    setSearchParams({});
  }
  // eslint-disable-next-line
  const href = `https://www.amtrak.com/stations/${selectedItem.value}.html`;

  if (!station) return null;

  return (
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
  );
}

export default StationHeader;
