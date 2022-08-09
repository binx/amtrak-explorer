import { useState, useEffect } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  overflow: visible;
  position: absolute;
  line {
    stroke: #48D5C6;
    stroke-width: 5;
  }
  path {
    stroke: #48D5C6;
    stroke-width: 5;
    fill: none;
  }
`;

function LineVis({ stationList }) {
  const [lines, setLines] = useState([]);
  const [connectors, setConnectors] = useState([]);

  useEffect(() => {
    let newLines = [];
    let newConnectors = [];

    let lastDepth = 0;
    let top = 0;
    const height = 25;
    const width = 20;
    const paddingBottom = 10;
    const spacerCurve = 10;

    stationList.forEach((s,i) => {
      let spacerHeight = 0;

      if (s.depth === 2 && lastDepth === 3) {
        // coming together
        spacerHeight = height*1.2;
        // top -= spacerHeight;
        newConnectors.push(`M${width*1},${top + spacerHeight} C${width*1},${top + spacerCurve} ${width*2},${top + spacerHeight - spacerCurve} ${width*2},${top}`)
        newConnectors.push(`M${width*1},${top + spacerHeight} C${width*1},${top + spacerCurve} ${width*0},${top + spacerHeight - spacerCurve} ${width*0},${top}`)
        
      } else if (s.depth === 1 && lastDepth === 2) {
        // splitting off
        spacerHeight = height*1.2;
        newConnectors.push(`M${width*0},${top + spacerHeight} C${width*0},${top + spacerCurve} ${width*1},${top + spacerHeight - spacerCurve} ${width*1},${top}`)
        newConnectors.push(`M${width*2},${top + spacerHeight} C${width*2},${top + spacerCurve} ${width*1},${top + spacerHeight - spacerCurve} ${width*1},${top}`)
      } 
      // else if (s.depth === 3) {
      //   top -= height*1.2;
      // }

      newLines.push({
        x: (s.depth - 1) * width,
        y1: top + spacerHeight,
        y2: top + (s.stations.length * height) + spacerHeight + paddingBottom
      })

      if (s.depth === 3) {
        newLines.push({
          x: 0,
          y1: top + spacerHeight,
          y2: top + (s.stations.length * height) + spacerHeight + paddingBottom
        })
      }

      top += (s.stations.length * height) + (spacerHeight*2) + paddingBottom;
      lastDepth = s.depth;
    })
    setLines(newLines);
    setConnectors(newConnectors);

  }, [stationList])

  return (
    <SVG>
      { lines.map((l,i) => {
        return (
          <line key={`line${i}`} x1={l.x} x2={l.x} y1={l.y1} y2={l.y2} />
        );
      })}
      { connectors.map((l,i) => {
        return (
          <path key={`path${i}`} d={l} />
        );
      })}
    </SVG>
  );
}

export default LineVis;
