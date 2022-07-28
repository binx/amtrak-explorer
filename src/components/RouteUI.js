import { Select, Button } from "grommet";

import routeList from "./data/route_names.json";

function RouteUI({ selectedRoute, setSelectedRoute }) {
  return (
    <div>
      <Select
        placeholder="Select a Route"
        options={routeList}
        value={selectedRoute}
        onChange={({ option }) => setSelectedRoute(option)}
      />
      <Button onClick={() => setSelectedRoute()} primary label="reset" />
    </div>
  );
}

export default RouteUI;
