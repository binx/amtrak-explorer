import styled from "styled-components";

const Table = styled.table`
  display: block;
  border-collapse: collapse;
  td { padding: 2px 15px; }
`;
const Dot = styled.div`
  width: 15px;
  height: 15px;
  display: inline-block;
  border: 50%;
  background-color: lightblue;
`;

function StationList({ stations }) {
  return (
    <table>
      <tbody>
        {stations.map((d,i) => (
          <tr key={`station${i}`}>
            <td>{d.properties.stationnam.split(",")[0]}</td>
            <td>{d.properties.stationnam.split(",")[1]}</td>
            <td>{d.transfer && <Dot />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default StationList;
