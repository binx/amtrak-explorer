// import { useState, useEffect } from "react";
import styled from "styled-components";

import { RadioButtonGroup } from "grommet";

const ButtonGroup = styled(RadioButtonGroup)`
  border-color: white;
`;

function DefaultMapVis({ visType, setVisType }) {
  const options = [
    { label: "by name", value: "default" },
    { label: "annual passengers", value: "passengers" },
    { label: "frequency", value: "weekly_trips" },
    { label: "normalized", value: "normalized" },
  ]
  return (
    <div>
      <h4>color train routes</h4>
      <ButtonGroup
        name="Show Those Routes"
        options={options}
        value={visType}
        onChange={(e) => setVisType(e.target.value)}
      />
    </div>
  );
}

export default DefaultMapVis;
