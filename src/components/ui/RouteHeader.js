import styled from "styled-components";
import { Button } from "grommet";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    color: ${props => props.color};
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0;
    @media only screen and (max-width: 900px) {
      width: 100%;
    }
  }
  a {
    font-size: 14px;
    color: ${props => props.color};
    text-decoration: none;
    margin-left: 40px;
    span {
      display: inline-block;
      transform: rotate(90deg);
      margin-left: 8px;
      font-size: 22px;
    }
    @media only screen and (max-width: 900px) {
      margin: 10px 0 20px 0;
    }
  }
`;
const ResetButton = styled(Button)`
  margin-right: 15px;
  border-radius: 4px;
  color: white;
  padding: 4px 12px;
`;
const Legend = styled.div`
  font-size: 14px;
  width: 265px;
  color: #8b8b8b;
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;
const Circle = styled.div`
  border: 3px solid white;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  margin-right: 5px;
`;

function RouteHeader({ selectedItem, setSelectedItem, setSearchParams, color }) {
  const resetRoute = () => {
    setSelectedItem();
    setSearchParams({});
  }
  // eslint-disable-next-line
  const href = `https://www.amtrak.com/${selectedItem.value.replace(/[\/|\s]/g, "-")}-train`;

  return (
    <Wrapper color={color}>
      <Flex>
      <h2>{selectedItem.value}</h2>
      <a target="_blank" rel="noreferrer" href={href}>
        view on amtrak.com<span>⇱</span>
      </a>
      </Flex>
      <Flex>
        <ResetButton onClick={resetRoute} 
          outline label="reset map" color={color}
          size="small"
        />
        <Legend>
          <Flex>
            <Circle /> indicates transfer is available
          </Flex>
          <div>click on a station for more information</div>
        </Legend>
      </Flex>
    </Wrapper>
  );
}

export default RouteHeader;
