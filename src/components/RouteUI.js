import styled from "styled-components";
import { Select, Button } from "grommet";

import routeList from "./data/route_names.json";

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
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
      <Button onClick={() => setSelectedRoute()} primary label="reset"
        style={{ marginLeft: "80px" }}
      />
    </Wrapper>
  );
}

export default RouteUI;
