import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background: #222;
  padding: 4px;
`;

function HoverStation({ hoverStation, margin }) {
  if (!hoverStation) return null;
  return (
    <Wrapper
      style={{
        top: `${hoverStation.point[1] + 10}px`,
        left: `${hoverStation.point[0] + margin + 10}px`
      }}
    >
      {hoverStation.properties.stationnam}
    </Wrapper>
  );
}

export default HoverStation;
