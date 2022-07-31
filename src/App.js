import { Grommet } from 'grommet';
import AmtrakMap from "./components/AmtrakMap";

const theme = {
  global: {
    font: {
      family: 'Raleway',
      size: '18px',
      height: '20px',
    },
    colors: {
      brand: "#48D5C6"
    }
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
