import styled from "styled-components";

const Table = styled.table`
  display: block;
  border-collapse: collapse;
  td, th {
    padding: 2px 15px;
    text-align: left;
    border-bottom: 1px solid #333;
  }
`;
const Dot = styled.div`
  width: 15px;
  height: 15px;
  display: inline-block;
  border: 50%;
  background-color: lightblue;
`;

function StationList({ stations }) {
  if (!stations.length) return null;
  return (
    <Table>
      <thead>
        <tr>
          <th>City</th>
          <th>State</th>
          <th>Transfer Available?</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((d,i) => (
          <tr key={`station${i}`}>
            <td>{d.properties.stationnam.split(",")[0]}</td>
            <td>{d.properties.stationnam.split(",")[1]}</td>
            <td>{d.transfer && <Dot />}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StationList;
