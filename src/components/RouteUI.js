import styled from "styled-components";
import { Select, Button } from "grommet";

import routeList from "./data/route_names.json";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  width: 1200px;
`;

function RouteUI({ selectedRoute, setSelectedRoute }) {
  return (
    <Wrapper>
      <Select
        placeholder="Select a Route"
        options={routeList}
        value={selectedRoute}
        onChange={({ option }) => setSelectedRoute(option)}
      />
      <Button onClick={() => setSelectedRoute()} primary label="reset" />
    </Wrapper>
  );
}

export default RouteUI;
