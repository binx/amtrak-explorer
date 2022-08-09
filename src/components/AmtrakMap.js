import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import RouteUI from "./RouteUI";
import MapContainer from "./MapContainer";

const Wrapper = styled.div`
  margin: 40px;

  h1 { margin-bottom: 20px; }
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
const DataFootnote = styled.div`
  font-size: 12px;
  margin-top: 20px;
  max-width: 400px;
  div { margin-top: 10px; }

  a { color: white; }
`;

function AmtrakMap() {
  const [selectedRoute, setSelectedRoute] = useState();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (selectedRoute)
      setSearchParams({ route: selectedRoute });
  }, [selectedRoute, setSearchParams]);

  return (
    <Wrapper>
      <h1>amtrak explorer</h1>
      <Tagline>explore the amtrakverse</Tagline>
      <RouteUI
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        setSearchParams={setSearchParams}
      />
      <MapContainer
        selectedRoute={selectedRoute}
        setSelectedRoute={setSelectedRoute}
        searchParams={searchParams}
      />
      <Footer>site by <a href="https://rachelbinx.com">rachel binx</a></Footer>
      <DataFootnote>
        I built this site because I wanted a visual explore tool to understand the amtrak network, to see which trains run to which stations. The data is correlated from several sites to map routes & station names, and the order of the stations is geographiclly inferred (and often incorrect!)

        <div>Next steps for this site are to hard-code the station order, and to publish the final dataset for other people to use :)</div>

        <div>station/route correlation from <a href="https://www.wikiwand.com/en/List_of_Amtrak_stations">here</a></div>
        <div>route geojson from <a href="https://data-usdot.opendata.arcgis.com/datasets/baa5a6c4d4ae4034850e99aaca38cfbb/explore">here</a></div>
        <div>station lat/lng from <a href="https://github.com/datanews/amtrak-geojson">here</a></div>
      </DataFootnote>
    </Wrapper>
  );
}

export default AmtrakMap;
