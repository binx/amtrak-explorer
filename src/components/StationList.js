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
    text-decoration-color: ${props => props.hovered ? "#48D5C6" : "transparent"};
  }
`;
const Spacer = styled.div`
  width: 80px;
  margin-right: 20px;
  flex: 0;
  display: flex;
  align-items: center;
`;
const Bar = styled.div`
  height: 25px;
  width: 5px;
  margin-left: ${props => (props.depth - 1) * 15}px;
  background-color: white;
  opacity: .1
`;

function StationList({ stations, selectedRoute, hoverStation, setHoverStation, setClickStation }) {

  const [stationList, setStationList] = useState([]);

  useEffect(() => {
    const selected = orderedStations.find(s => s.route === selectedRoute);

    const getStations = list => (
      list.map(d => {
        return stations.find(s => s.properties.stationnam === d);
      })
    )

    let newStationList = [];

    // lmaooooo
    // if 2 -> 3
    // if 1 -> 1
    // please please make this better
    const maxSegs = Math.max(selected.segments.map(s => s.length));

    /*
      if it's one just make it 1
      if it's 2 segmants, try to space bar
    */

    selected.segments.forEach(segment => {
      if (typeof segment[0] === "string") {
        // flat array of stations
        newStationList.push({
          depth: maxSegs === 1 ? 1 : 2,
          stations: getStations(segment)
        });
      } else {
        segment.forEach((s,i) => {
          // kill me
          newStationList.push({
            depth: i === 0 ? 1 : 3,
            stations: getStations(s)
          });
        })
      }
    })

    setStationList(newStationList);

  }, [stations]);


  return (
    <div style={{ position: "relative" }}>
      <LineVis stationList={stationList} />
      <Table>
        {stationList.map((segment, j) => {
          return (
            <div key={`seg${j}`}>
              { ((segment.depth === 2 || segment.depth === 1) && j !== 0) && (
                <div style={{ marginTop: "40px"}} />
              )}
              { segment.stations.map((d,i) => {
                const spacerDepth = segment.depth > 2 ? segment.depth + 1 : segment.depth;
                return (
                  <Flex key={`station${i}`}
                    onMouseEnter={() => setHoverStation(d)}
                    onMouseLeave={() => setHoverStation()}
                    onClick={() => setClickStation(d)}
                    hovered={hoverStation ? hoverStation.properties.code === d.properties.code : false}
                  >
                    <Spacer>
                      <Bar depth={spacerDepth} />
                    </Spacer>
                    <span>{d && d.properties.stationnam}</span>
                  </Flex>
                );
              })}
              <div style={{ marginBottom: '10px'}}></div>
            </div>
          )
        })}
      </Table>
    </div>
  );
}

export default StationList;
