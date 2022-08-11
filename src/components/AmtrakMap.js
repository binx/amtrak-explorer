import { useState, useEffect } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";

import Header from "./ui/Header";
import MapContainer from "./map/MapContainer";

const Wrapper = styled.div`
  margin: 20px 40px;
  @media only screen and (max-width: 800px) {
    margin: 40px 20px;
  }
`;
const Footer = styled.div`
  margin-top: 80px;
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
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedItem, setSelectedItem] = useState();

  useEffect(() => {
    if (!selectedItem) return;

    if (selectedItem.type === "route") {
      setSearchParams({ route: selectedItem.value });
    } else if (selectedItem.type === "station") {
      setSearchParams({ station: selectedItem.value });
    }
  }, [selectedItem, setSearchParams]);

  return (
    <div>
      <Header setSelectedItem={setSelectedItem} setSearchParams={setSearchParams} />
      <Wrapper>
        <MapContainer
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
        <Footer>site by <a href="https://rachelbinx.com">rachel binx</a></Footer>
        <DataFootnote>
          I built this site because I wanted a visual explore tool to understand the amtrak network, to see which trains run to which stations. The data is correlated from several sites to map routes & station names.

          <div>station/route correlation from <a href="https://www.wikiwand.com/en/List_of_Amtrak_stations">here</a></div>
          <div>route geojson from <a href="https://data-usdot.opendata.arcgis.com/datasets/baa5a6c4d4ae4034850e99aaca38cfbb/explore">here</a></div>
          <div>station lat/lng from <a href="https://github.com/datanews/amtrak-geojson">here</a></div>
        </DataFootnote>
      </Wrapper>
    </div>
  );
}

export default AmtrakMap;
