import { useState, useEffect } from "react";
import styled from "styled-components";

import orderedStations from "../../data/route_segments.json";

import StationLineVis from "./StationLineVis";

const Wrapper = styled.div`
  width: 240px;
  @media only screen and (max-width: 800px) {
    padding: 20px 10px;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: 25px;
  font-size: 14px;

  span {
    cursor: pointer;
    text-decoration: underline;
    text-decoration-color: ${props => props.hovered ? props.color : "transparent"};
  }
`;
const Spacer = styled.div`
  height: 25px;
  margin-left: ${props => (props.depth) * 20}px;
  flex: 0;
  display: flex;
  align-items: center;
`;

function StationList({ stations, selectedItem, hoverStation, color, setHoverStation, setClickStation }) {

  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    const getStations = list => (
      list.map(d => stations.find(s => s.properties.station_name === d))
    );

    // flattened list for rendering
    const pushToList = (obj) => {
      newStationList.push({
        depth: obj.depth,
        linksUp: obj.linksUp,
        splitsOff: obj.splitsOff,
        endOfLine: obj.endOfLine,
        stations: getStations(obj.stations)
      });
    }

    // parse nested structure of station list
    const parseObj = obj => {
      if (obj.stations)
        pushToList(obj);
      else
        obj.segments.forEach(o => parseObj(o));
    }

    const selectedStations = orderedStations
      .find(s => s.route === selectedItem.value);
      
    let newStationList = [];
    selectedStations.segments.forEach(s => parseObj(s))

    setStationList(newStationList);

    // eslint-disable-next-line
  }, [stations]);


  return (
    <Wrapper>
      <StationLineVis stationList={stationList} color={color} />
      <div>
        {stationList.map((segment, j) => (
          <div key={`seg${j}`} style={{ marginBottom: '10px'}}>
            { ((segment.depth === 2 || segment.depth === 1) && j !== 0) && (
              <div style={{ marginTop: "40px"}} />
            )}
            { segment.stations.map((d,i) => (
              <Flex key={`station${i}`}
                onMouseEnter={() => setHoverStation(d)}
                onMouseLeave={() => setHoverStation()}
                onClick={() => setClickStation(d)}
                hovered={hoverStation && hoverStation.properties.station_code === d.properties.station_code} 
                color={color}
              >
                <Spacer depth={segment.depth} />
                <span>{d && d.properties.station_name}</span>
              </Flex>
            ))}
          </div>
        ))}
      </div>
    </Wrapper>
  );
}

export default StationList;
