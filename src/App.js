import React from 'react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import { Provider } from "react-redux";
import { store } from "./store/index";
import router from "./router.js";

const muiTheme = createMuiTheme({
  palette: {
    primary: purple,
  },
});

const App = props => <Provider store={store}>
  	<ThemeProvider theme={muiTheme}>
      {router}
    </ThemeProvider>
  </Provider>;

export default App;

// function App() {
//   return (

//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
