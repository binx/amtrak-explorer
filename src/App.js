import { Grommet } from 'grommet';
import AmtrakMap from "./components/AmtrakMap";

const theme = {
  global: {
    font: {
      family: 'Arial',
      size: '18px',
      height: '20px',
    },
  },
};

function App() {
  return (
    <Grommet theme={theme}>
      <AmtrakMap />
    </Grommet>
  );
}

export default App;
