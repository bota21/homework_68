import { Route, Switch } from "react-router-dom";
import "./App.css";
import Page from "./containers/Page/Page";
import ShowInfo from "./containers/ShowInfo/ShowInfo";
import EmptyPage from "./components/EmptyPage/EmptyPage";

const App = () => {
  return (
    <div className='App'>
      <Page />
      <Switch>
        <Route
          path='/'
          exact
          render={() => <EmptyPage title='Choose to begin' />}
        />
        <Route
          path='/shows/:id'
          component={ShowInfo}
        />
        <Route render={() => <EmptyPage title='Page not found' />} />
      </Switch>
    </div>
  );
};

export default App;
