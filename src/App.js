import React from 'react';
import { useRoutes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import StagePlots from './components/StagePlots';
import StagePlot from './components/StagePlot';
import Users from './components/Users';
import { ErrorContext, UserContext } from './lib/Context';
import './App.css';

const Error = ({ err }) => {
  return <div className={'error'}>{JSON.stringify(err)}</div>;
};

const App = ()  => {
  const [user, setUser] = React.useState(JSON.parse(localStorage.getItem('user')));
  const [err, setErr] = React.useState();

  const routes = useRoutes([
    { path: '/', element: <Home /> },
    { path: '/stageplots', element: <StagePlots /> },
    { path: '/stageplot/:id', element: <StagePlot /> },
    { path: '/users', element: <Users /> },
  ]);

  return (
    <div className="App">
      <UserContext.Provider value={[user, setUser]}>
        <ErrorContext.Provider value={[err, setErr]}>
          <Header />
          <div className='content'>
            <Error err={err} />
            {routes}
          </div>
        </ErrorContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
