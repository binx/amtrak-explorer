import styled from "styled-components";

import RouteUI from "./RouteUI";

const Wrapper = styled.div`
  background: #111;
  padding: 20px 40px;
  display: flex;
  align-items: center;

  flex-wrap: wrap;
  justify-content: space-between;

  @media only screen and (max-width: 800px) {
    padding: 20px;
  }
  @media only screen and (max-width: 900px) {
    > div { width: 100%; }
  }
`;
const H1Wrapper = styled.div`
  h1 { margin-bottom: 20px; }
`;
const Tagline = styled.div`
  font-style: italic;
  letter-spacing: 2px;
  color: #888;
  margin: 20px 0 0;
  font-size: 12px;
`;

function Header({ selectedRoute, setSelectedRoute, setSearchParams }) {
  return (
    <Wrapper>
      <H1Wrapper>
        <h1>amtrak explorer</h1>
        <Tagline>explore the amtrakverse</Tagline>
      </H1Wrapper>
      <RouteUI
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        setSearchParams={setSearchParams}
      />
    </Wrapper>
  );
}

export default Header;
