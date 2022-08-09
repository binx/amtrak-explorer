import { useState, useEffect } from "react";
import styled from "styled-components";

import orderedStations from "./data/route_segments.json";

import LineVis from "./LineVis";

const Table = styled.div`
  width: 240px;
  display: block;
  border-collapse: collapse;
  
  > div { cursor: pointer; }
  > div:hover td {
    border-bottom: 1px solid #48D5C6;
  }
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  height: 25px;
  font-size: 14px;

  span {
    text-decoration: underline;
    text-decoration-color: ${props => props.hovered ? props.color : "transparent"};
  }
`;
const Spacer = styled.div`
  height: 25px;
  // margin-right: 20px;
  margin-left: ${props => (props.depth) * 20}px;
  flex: 0;
  display: flex;
  align-items: center;
`;

function StationList({ stations, selectedRoute, hoverStation, color, setHoverStation, setClickStation }) {

  const [stationList, setStationList] = useState([]);

  // console.log(orderedStations)
  // const map = orderedStations.map(o => {
  //   return {
  //     route: o.route,
  //     segments: o.segments.map(list => {
  //       if (typeof list[0] === "string")
  //         return { stations: list };
  //       else
  //         return { segments: list.map(l => ({ stations: l })) }
  //     })
  //   }
  // })
  // console.log(JSON.stringify(map))

  useEffect(() => {
    const getStations = list => (
      list.map(d => {
        return stations.find(s => s.properties.stationnam === d);
      })
    )

    const selected = orderedStations.find(s => s.route === selectedRoute);
    let newStationList = [];

    const pushToList = (obj) => {
      newStationList.push({
        depth: obj.depth,
        linksUp: obj.linksUp,
        splitsOff: obj.splitsOff,
        endOfLine: obj.endOfLine,
        stations: getStations(obj.stations)
      });
    }

    const parseObj = obj => {
      if (obj.stations)
        pushToList(obj);
      else
        obj.segments.forEach(o => parseObj(o));
    }

    selected.segments.forEach(s => parseObj(s))

    setStationList(newStationList);

  }, [stations]);


  return (
    <div style={{ position: "relative" }}>
      <LineVis stationList={stationList} color={color} />
      <Table>
        {stationList.map((segment, j) => {
          return (
            <div key={`seg${j}`} style={{ marginBottom: '10px'}}>
              { ((segment.depth === 2 || segment.depth === 1) && j !== 0) && (
                <div style={{ marginTop: "40px"}} />
              )}
              { segment.stations.map((d,i) => {
                // hovered={hoverStation && hoverStation.properties.code === d.properties.code}
                return (
                  <Flex key={`station${i}`}
                    onMouseEnter={() => setHoverStation(d)}
                    onMouseLeave={() => setHoverStation()}
                    onClick={() => setClickStation(d)}
                    
                    color={color}
                  >
                    <Spacer depth={segment.depth} />
                    <span>{d && d.properties.stationnam}</span>
                  </Flex>
                );
              })}
            </div>
          )
        })}
      </Table>
    </div>
  );
}

export default StationList;
