import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background: #222;
  padding: 10px;
  background: white; 
  color: black;

  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    z-index: 1;
    border-style: solid;
    border-color: #fff transparent;
    border-width: 11px 10px 0;
    bottom: -11px;
    left: 0;
}
`;
const Title = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 5px;
  white-space: nowrap;
`;
const Type = styled.div`
  font-size: 12px;
  color: #555;
  margin-bottom: 20px;
`;
const Line = styled.div`
  font-size: 14px;
  color: #888;
`;
const Close = styled.span`
  color: #888;
  font-size: 32px;
  margin-left: 20px;
  vertical-align: top;
  line-height: 9px;
  height: 18px;
  cursor: pointer;
  &:hover { color: #000; }
  &:after { content: '×'; }
`;
const StationList = styled.ul`
  margin-bottom: 20px;
  font-size: 14px;
  padding: 0;
  list-style: none;
  li { white-space: nowrap; cursor: pointer; }
  li:hover { text-decoration: underline; }
  li::before {
    content: "⥴ ";
    font-size: 18px;
    color: #48D5C6;
  }
`;


function ClickStation({ station, margin, height, setClickStation, setSelectedRoute }) {
  return ( 
    <Wrapper
      style={{
        bottom: `${height - station.point[1] - margin + 23}px`,
        left: `${station.point[0] + margin - 9}px`
      }}
    >
      <Title>
        {station.properties.stationnam}
        <Close onClick={() => setClickStation()} />
      </Title>
      <Type>{station.properties.statype}</Type>

      <StationList>
        {station.routes.map((d,i) => (
          <li key={`line${i}`} onClick={() => setSelectedRoute(d)}>{d}</li>
        ))}
      </StationList>

      <Line>{station.properties.address1}</Line>
      <Line>{station.properties.zipcode}</Line>
    </Wrapper>
  );
}

export default ClickStation;
