import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { debounce } from "lodash";

import { TextInput } from "grommet";

import routeList from "../../data/route_names.json";
import stationList from "../../data/station_names.json";

const Wrapper = styled.div`
  @media only screen and (min-width: 900px) {
    > div { width: auto; }
  }
`;
const RouteSelect = styled(TextInput)`
  border-color: white;
  @media only screen and (min-width: 900px) {
    width: 600px;
  }
  @media only screen and (max-width: 900px) {
    margin-top: 20px;
  }
`;

function Searchbar({ setSelectedItem }) {
  const [value, setValue] = useState("");
  const [displayOptions, setDisplayOptions] = useState([]);

  const resetOptionList = () => {
    const newOptions = routeList.map(r => ({ value: r, label: r }));
    setDisplayOptions(newOptions)
  }
  useEffect(resetOptionList, []);

  const searchOptions = text => {
    const lower = text.toLowerCase();

    const routeMatches = routeList.filter(r => (
      r.toLowerCase().indexOf(lower) !== -1
    )).map(r => ({ value: r, label: r, type: "route" }));

    const stationMatches = stationList.filter(r => (
      r.station_name.toLowerCase().indexOf(lower) !== -1
    )).map(r => ({
      value: r.station_code,
      label: r.station_name,
      type: "station"
    }));

    const newOptions = [...routeMatches, ...stationMatches];
    
    setDisplayOptions(newOptions);
  }

  const throttled = useRef(debounce(text => searchOptions(text)), 200);
  useEffect(() => {
    throttled.current(value)
  }, [value]);

  return (
    <Wrapper>
      <RouteSelect
        placeholder="search for a route or station"
        value={value}
        onChange={e => setValue(e.target.value)}
        suggestions={displayOptions}
        onSuggestionSelect={e => {
          setSelectedItem({ type: e.suggestion.type, value: e.suggestion.value });
        }}
      />
    </Wrapper>
  );
}

export default Searchbar;
