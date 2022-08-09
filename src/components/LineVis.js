import { useState, useEffect } from "react";
import styled from "styled-components";

const SVG = styled.svg`
  overflow: visible;
  position: absolute;
  z-index: -1;
  line {
    stroke: #48D5C6;
    stroke-width: 5;
  }
  path {
    stroke: #48D5C6;
    stroke-width: 5;
    fill: none;
  }
  circle {
    fill: #222;
    stroke: white;
    stroke-width: 3;
  }
`;

function LineVis({ stationList }) {
  const [lines, setLines] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [circles, setCircles] = useState([]);
  const [locals, setLocals] = useState([]);

  useEffect(() => {
    let newLines = [];
    let newConnectors = [];
    let newCircles = [];
    let newLocals = [];

    let lastDepth = 0;
    let top = 0;
    const height = 25;
    const width = 20;
    const paddingBottom = 10;
    const spacerCurve = 10;
    let spacerHeight = 0;

    stationList.forEach((s,i) => {
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

      if (i === 0 || (i === 1 && s.depth === 3)) {
        // first entry, move top down
        const paddingLength = stationList.length === 1 ? -paddingBottom : paddingBottom;
        newLines.push({
          x: (s.depth - 1) * width,
          y1: top + spacerHeight + 10,
          y2: top + (s.stations.length * height) + spacerHeight + paddingLength
        })
      } else if ((i === stationList.length - 1) || (s.depth === 1 && i === stationList.length - 2)) {
        // last line, or ends in a fork
        newLines.push({
          x: (s.depth - 1) * width,
          y1: top + spacerHeight,
          y2: top + (s.stations.length * height) + spacerHeight - paddingBottom
        })
      } else {
        newLines.push({
        x: (s.depth - 1) * width,
          y1: top + spacerHeight,
          y2: top + (s.stations.length * height) + spacerHeight + paddingBottom
        })
      }

      if (s.depth === 3 && i !== stationList.length - 1) {
        newLines.push({
          x: 0,
          y1: top + spacerHeight,
          y2: top + (s.stations.length * height) + spacerHeight + paddingBottom
        })
      }

      s.stations.forEach((stat, j) => {
        if (!stat) console.log(stat)
        if (stat && stat.routes.length > 1)
          newCircles.push({
            cx: width*(s.depth - 1),
            cy: top + (j*height) + height/2 + (spacerHeight)
          })
        else if (stat)
          newLocals.push({
            x: width*(s.depth - 1),
            y: top + (j*height) + height/2 + (spacerHeight)
          })

      })

      if ((s.depth === 1 && lastDepth === 2) || (s.depth === 2 && lastDepth === 3)) {
        spacerHeight = height*1.2 / 2;
      }

      top += (s.stations.length * height) + (spacerHeight*2) + paddingBottom;
      lastDepth = s.depth;
      spacerHeight = 0;
    })
    setLines(newLines);
    setConnectors(newConnectors);
    setCircles(newCircles);
    setLocals(newLocals);

  }, [stationList])

  const r = 6;

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
      { circles.map((l,i) => {
        return (
          <circle key={`circle${i}`} r={r} cx={l.cx} cy={l.cy} />
        );
      })}
      { locals.map((l,i) => {
        return (
          <path key={`local${i}`} d={`M${l.x},${l.y+0} ${l.x+10},${l.y+0}`} />
        );
      })}
    </SVG>
  );
}

export default LineVis;
