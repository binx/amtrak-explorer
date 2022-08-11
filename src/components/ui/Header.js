import styled from "styled-components";

import Searchbar from "./Searchbar";

const Wrapper = styled.div`
  background: #181818;
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
  cursor: pointer;
  h1 { margin-bottom: 20px; }
`;
const Tagline = styled.div`
  font-style: italic;
  letter-spacing: 2px;
  color: #888;
  margin: 20px 0 0;
  font-size: 12px;
`;

const Header = ({ setSelectedItem, setSearchParams }) => (
  <Wrapper>
    <H1Wrapper onClick={() => {
      setSelectedItem();
      setSearchParams({});
    }}>
      <h1>amtrak explorer</h1>
      <Tagline>explore the amtrakverse</Tagline>
    </H1Wrapper>
    <Searchbar setSelectedItem={setSelectedItem} />
  </Wrapper>
);

export default Header;
