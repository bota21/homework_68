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
          render={() => <EmptyPage title='Begin to choose' />}
        />
        <Route
          path='/shows/:id'
          component={ShowInfo}
          // render={() => {
          //   return (
          //     <ShowInfo
          //       img='https://static.tvmaze.com/uploads/images/medium_portrait/47/119954.jpg'
          //       title='CSI: Cyber'
          //       content='Cyber is a drama inspired by the advanced technological work of real-life Cyber Psychologist Mary Aiken. Special Agent Avery Ryan heads the Cyber Crime Division of the FBI, a unit at the forefront of solving illegal activities that start in the mind, live online and play out in the real world. While other FBI agents search for criminals in dark homes and alleys, Ryan and her team search the dark net, a place deep in the bowels of the Web where criminals are anonymous, money is untraceable and where everything is for sale with just a keystroke.'
          //     />
          //   );
          // }}
        />
        <Route render={() => <EmptyPage title='Page not found' />} />
      </Switch>
    </div>
  );
};

export default App;
