import { useState } from "react";
import styled from "styled-components";

import RouteUI from "./RouteUI";
import VectorMap from "./VectorMap";

const Wrapper = styled.div`
  margin: 40px;
`;
const Tagline = styled.div`
  font-style: italic;
  letter-spacing: 1px;
  color: #888;
  margin: 20px 0;
  font-size: 12px;
`;

function AmtrakMap() {
  const [selectedRoute, setSelectedRoute] = useState();

  return (
    <Wrapper>
      <h1>amtrak explorer</h1>
      <Tagline>please, amtrak, make this information easier to find</Tagline>
      <RouteUI selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
      <VectorMap
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
    </Wrapper>
  );
}

export default AmtrakMap;
