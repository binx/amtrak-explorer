import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { RadioButtonGroup } from "grommet";

import { scaleLog, scaleLinear } from "d3-scale";
import { select } from 'd3-selection';
import { axisRight } from "d3-axis";

import { getScaleInfo } from "../util";

const H4 = styled.h4`
  margin-top: .25em;
  @media only screen and (max-width: 900px) {
    margin-top: 40px;
  }
`;
const ButtonGroup = styled(RadioButtonGroup)`
  border-color: white;
`;
const Flex = styled.div`
  display: flex;
  height: 200px;
  margin-top: 40px;
`;
const LegendColor = styled.div`
  margin-right: 10px;
  > div { height: 5px; width: 10px; }
`;

function DefaultMapVis({ visType, setVisType, routes }) {
  const options = [
    { label: "name", value: "default" },
    { label: "annual passengers", value: "passengers" },
    { label: "weekly trips", value: "weekly_trips" },
    { label: "avg passengers by trip", value: "normalized" },
  ]

  const axisRef = useRef();
  const [legendColors, setLegendColors] = useState([]);

  useEffect(() => {
    if (visType === "default") return;

    const height = 200;

    const scaleInfo = getScaleInfo(visType, routes);
    const numberScale = scaleInfo.scaleType === "scaleLinear" 
      ? scaleLinear() : scaleLog();

    numberScale.domain(scaleInfo.extent).range([height, 0]).nice();

    const axisDefs = axisRight(numberScale).ticks(3);
    select(axisRef.current).call(axisDefs);

    const numBoxes = 40;
    const boxHeight = height/numBoxes;
    let newLegendColors = [];

    const colorScale = scaleInfo.scaleType === "scaleLinear" 
      ? scaleLinear() : scaleLog();

    colorScale.domain(scaleInfo.extent).range(scaleInfo.colorRange);

    for (let i = 0; i < numBoxes; i++) {
      const value = numberScale.invert(boxHeight*i);
      let color = colorScale(value);

      if (value > scaleInfo.extent[1] || value < scaleInfo.extent[0])
        color = "transparent";

      newLegendColors.push(color);
    }
    setLegendColors(newLegendColors);

  }, [routes, visType]);

  return (
    <div>
      <H4>color routes by</H4>
      <ButtonGroup
        name="Show Those Routes"
        options={options}
        value={visType}
        onChange={(e) => setVisType(e.target.value)}
      />
      <Flex>
        <LegendColor>
          {legendColors.map((l,i) => (
            <div key={`leg${i}`} style={{ backgroundColor: l }} />)
          )}
        </LegendColor>
        <svg style={{ overflow: "visible" }} width="50px">
          <g ref={axisRef} />
        </svg>
      </Flex>
    </div>
  );
}

export default DefaultMapVis;
