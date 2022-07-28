import { useState, useEffect } from "react";

import RouteUI from "./RouteUI";
import VectorMap from "./VectorMap";
// import MapGL from "./MapGL";

function AmtrakMap() {
  const [selectedRoute, setSelectedRoute] = useState();

  return (
    <div style={{ margin: "40px" }}>
      <RouteUI selectedRoute={selectedRoute} setSelectedRoute={setSelectedRoute} />
      <VectorMap
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
      />
    </div>
  );
}

export default AmtrakMap;
