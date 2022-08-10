import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background: #222;
  padding: 4px;
`;

const HoverStation = ({ hoverStation, margin }) => (
  <Wrapper
    style={{
      top: `${hoverStation.point[1] + 10}px`,
      left: `${hoverStation.point[0] + margin + 10}px`
    }}
  >
    {hoverStation.properties.station_name}
  </Wrapper>
);

export default HoverStation;
