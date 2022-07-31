import styled from "styled-components";

const Table = styled.table`
  width: 240px;
  display: block;
  border-collapse: collapse;
  cursor: default;
  td, th {
    padding: 2px 15px;
    text-align: left;
    border-bottom: 1px solid #333;
    color: #ccc;
  }
  tr:hover td {
    border-bottom: 1px solid #48D5C6;
  }
`;
// const Dot = styled.div`
//   width: 15px;
//   height: 15px;
//   display: inline-block;
//   border: 50%;
//   background-color: lightblue;
// `;

function StationList({ stations, setHoverStation }) {
  if (!stations.length) return null;
  // <td>{d.transfer && <Dot />}</td>
  return (
    <Table>
      <thead>
        <tr>
          <th>City</th>
          <th>State</th>
        </tr>
      </thead>
      <tbody>
        {stations.map((d,i) => (
          <tr key={`station${i}`}
            onMouseEnter={() => setHoverStation(d)}
            onMouseLeave={() => setHoverStation()}
          >
            <td>{d.properties.stationnam.split(",")[0]}</td>
            <td>{d.properties.stationnam.split(",")[1]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default StationList;
