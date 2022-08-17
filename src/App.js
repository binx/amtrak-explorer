import { BrowserRouter as Router } from "react-router-dom";
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
  radioButton: {
    border: {
      color: "#888"
    },
    hover: {
      border: {
        color: "#ccc"
      }
    }
  }
};

function App() {
  return (
    <Grommet theme={theme}>
      <Router>
        <AmtrakMap />
      </Router>
    </Grommet>
  );
}

export default App;
