import styled from "styled-components";
import { Select, Button } from "grommet";

import routeList from "./data/route_names.json";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;
const ResetButton = styled(Button)`
  margin-left: 80px;
  @media only screen and (max-width: 600px) {
    margin-left: 20px;
  }
`;

function RouteUI({ selectedRoute, setSelectedRoute }) {
  return (
    <Wrapper>
      <Select
        placeholder="select a route"
        options={routeList}
        value={selectedRoute}
        onChange={({ option }) => setSelectedRoute(option)}
      />
      <ResetButton onClick={() => setSelectedRoute()} primary label="reset"/>
    </Wrapper>
  );
}

export default RouteUI;
