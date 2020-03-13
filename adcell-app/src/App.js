import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import EngagementsDashboard from './components/dashboard/EngagementsDashboard';
import AppHeader from './components/header/Header';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    width: '100%',
    height: '100%',
  }
});

class App extends Component {
  render() {  
    const {
      classes
    } = this.props;
    return (
      // <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppHeader/>
            <div className={classes.root}>
            <Switch>
              <Route
                exact
                path="/"
                render={() =>
                  <div className="App">
                  <EngagementsDashboard/>
                </div>
                }
              />
            </Switch>
            </div>
        </BrowserRouter>
      // </ThemeProvider>
    )
  }
}

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
//           Learn React i dont think i feel so gooddddd
//         </a>
//       </header>
//     </div>
//   );
// }

export default withStyles(styles)(App);
