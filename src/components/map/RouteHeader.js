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
    @media only screen and (max-width: 400px) {
      margin: 20px 0 0 0;
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
`;
const Flex = styled.div`
  display: flex;
  align-items: center;
`;
const Circle = styled.div`
  border: 3px solid white;
  border-radius: 50%;
  height: 8px;
  width: 8px;
  margin-right: 5px;
`;

function RouteHeader({ selectedRoute, setSelectedRoute, setSearchParams, color }) {
  const resetRoute = () => {
    setSelectedRoute();
    setSearchParams({});
  }
  // eslint-disable-next-line
  const href = `https://www.amtrak.com/${selectedRoute.replace(/[\/|\s]/g, "-")}-train`;

  return (
    <Wrapper color={color}>
      <h2>
        {selectedRoute}
        <a target="_blank" rel="noreferrer" href={href}>
          view on amtrak.com<span>⇱</span>
        </a>
      </h2>
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
