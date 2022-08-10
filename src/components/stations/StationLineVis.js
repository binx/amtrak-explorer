import { useState, useEffect } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  overflow: visible;
  position: absolute;
  z-index: -1;
  line {
    stroke: ${props => props.color || "#48D5C6"};
    stroke-width: 5;
  }
  path {
    stroke: ${props => props.color || "#48D5C6"};
    stroke-width: 5;
    fill: none;
  }
  circle {
    fill: #222;
    stroke: white;
    stroke-width: 3;
  }
`;

function StationLineVis({ stationList, color }) {
  const [lines, setLines] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [circles, setCircles] = useState([]);
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    let newLines = [];
    let newConnectors = [];
    let newCircles = [];
    let newLocals = [];

    let top = 0;
    const height = 25;
    const width = 20;
    const paddingBottom = 10;
    const spacerCurve = 10;
    let spacerHeight = 0;

    stationList.forEach((s,i) => {
      if (i > 0 && stationList[i-1].linksUp) {
        // coming together
        spacerHeight = height*1.2;
        newConnectors.push(`
          M${width*1},${top + spacerHeight} C${width*1},${top + spacerCurve} 
          ${width*2},${top + spacerHeight - spacerCurve} ${width*2},${top}
        `)
        newConnectors.push(`
          M${width*1},${top + spacerHeight} C${width*1},${top + spacerCurve} 
          ${width*0},${top + spacerHeight - spacerCurve} ${width*0},${top}
        `);
        
      } else if (s.splitsOff) {
        // splitting off
        spacerHeight = height*1.2;
        newConnectors.push(`
          M${width*(s.depth-1)},${top + spacerHeight} C${width*(s.depth-1)},${top + spacerCurve} 
          ${width*(s.depth)},${top + spacerHeight - spacerCurve} ${width*(s.depth)},${top}
        `)
        newConnectors.push(`
          M${width*(s.depth+1)},${top + spacerHeight} C${width*(s.depth+1)},${top + spacerCurve} 
          ${width*(s.depth)},${top + spacerHeight - spacerCurve} ${width*(s.depth)},${top}
        `)
      }

      let line = {
        x: (s.depth - 1) * width,
        y1: top + spacerHeight,
        y2: top + (s.stations.length * height) + spacerHeight + paddingBottom
      }

      if (i === 0 || (i === 1 && s.depth === 3)) {
        // lines at the top of the page, move top down
        line.y1 += 10;
        if (stationList.length === 1) // if only one line, adjust bottom
          line.y2 -= (paddingBottom*2);
      } else if ((i === stationList.length - 1) || s.endOfLine) {
        // last line, or ends in a fork
        line.y2 -= (paddingBottom*2);
      }

      newLines.push(line);

      // add link for linking up parallel lines
      if (s.linksUp) {
        newLines.push({
          x: (s.depth - 3) * width,
          y1: top + spacerHeight,
          y2: top + (s.stations.length * height) + spacerHeight + paddingBottom
        })
      }

      s.stations.forEach((station, j) => {
        const newStation = {
          x: width*(s.depth - 1),
          y: top + (j*height) + height/2 + (spacerHeight)
        }
        if (!station) return;
        // display differently if there's a connection
        if (station.properties.routes.length > 1)
          newCircles.push(newStation)
        else
          newLocals.push(newStation)

      })

      if (s.splitsOff || (i > 0 && stationList[i-1].linksUp)) {
        spacerHeight = height*1.2 / 2;
      }

      top += (s.stations.length * height) + (spacerHeight*2) + paddingBottom;
      spacerHeight = 0;
    })
    setLines(newLines);
    setConnectors(newConnectors);
    setCircles(newCircles);
    setLocals(newLocals);

  }, [stationList])

  return (
    <SVG color={color}>
      { lines.map((l,i) => (
        <line key={`line${i}`} x1={l.x} x2={l.x} y1={l.y1} y2={l.y2} />
      ))}
      { connectors.map((l,i) => (
        <path key={`path${i}`} d={l} />
      ))}
      { circles.map((l,i) => (
        <circle key={`circle${i}`} r={6} cx={l.x} cy={l.y} />
      ))}
      { locals.map((l,i) => (
        <path key={`local${i}`} d={`M${l.x},${l.y} ${l.x+10},${l.y}`} />
      ))}
    </SVG>
  );
}

export default StationLineVis;
