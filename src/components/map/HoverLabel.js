import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  background: #222;
  padding: 4px;
`;

const HoverLabel = ({ hoverLabel, margin }) => (
  <Wrapper
    style={{
      top: `${hoverLabel.point[1] + 10}px`,
      left: `${hoverLabel.point[0] + margin + 10}px`
    }}
  >
    {hoverLabel.value}
  </Wrapper>
);

export default HoverLabel;
