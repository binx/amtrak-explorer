import { useState, useEffect, useRef } from "react";
import styled from "styled-components";

import { TextInput } from "grommet";
import debounce from "lodash.debounce";

import routeList from "../data/route_names.json";

const Wrapper = styled.div`
`;
const RouteSelect = styled(TextInput)`
  border-color: white;
  @media only screen and (min-width: 900px) {
    width: 500px;
  }
  @media only screen and (max-width: 900px) {
    margin-top: 20px;
  }
`;

function RouteUI({ selectedRoute, setSelectedRoute }) {
  const [value, setValue] = useState("");
  const [displayOptions, setDisplayOptions] = useState([]);

  const resetOptionList = () => {
    const newOptions = routeList.map(r => ({ value: r, label: r }));
    setDisplayOptions(newOptions)
  }
  useEffect(resetOptionList, []);

  const searchOptions = text => {
    const lower = text.toLowerCase();
    const newOptions = routeList.filter(r => (
      r.toLowerCase().indexOf(lower) !== -1
    )).map(r => (
      { value: r, label: r }
    ))
    setDisplayOptions(newOptions);
  }

  const throttled = useRef(debounce(text => {
    searchOptions(text);
  }, 200))
  useEffect(() => {
    throttled.current(value);
  }, [value])

  return (
    <Wrapper>
      <RouteSelect
        placeholder="search for a route"
        value={value}
        onChange={e => setValue(e.target.value)}
        suggestions={displayOptions}
        onSuggestionSelect={e => {
          setSelectedRoute(e.suggestion.value)
        }}
      />
    </Wrapper>
  );
}

export default RouteUI;
