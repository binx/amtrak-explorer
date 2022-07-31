import { useState } from "react";
import styled from "styled-components";

import RouteUI from "./RouteUI";
import VectorMap from "./VectorMap";

const Wrapper = styled.div`
  margin: 80px 40px;

  p {
    font-size: 16px;
    margin: 40px 0;
  }

  @media only screen and (max-width: 800px) {
    margin: 40px 20px;
  }
`;
const Tagline = styled.div`
  font-style: italic;
  letter-spacing: 1px;
  color: #888;
  margin: 20px 0;
  font-size: 12px;
`;
const Footer = styled.div`
  margin-top: 40px;
  font-family: monospace;
  a { color: white; }
  @media only screen and (max-width: 800px) {
    font-size: 14px;
  }
`;

function AmtrakMap() {
  const [selectedRoute, setSelectedRoute] = useState();

  return (
    <Wrapper>
      <h1>amtrak explorer</h1>
      <Tagline>please, amtrak, make this information easier to find</Tagline>
      <p>select a route to see its stations, or click on a station to get more info :)</p>
      <RouteUI selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
      <VectorMap
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
      <Footer>site by <a href="https://rachelbinx.com">rachel binx</a></Footer>
    </Wrapper>
  );
}

export default AmtrakMap;
