import React from 'react';
import { status } from '../lib/Api';
import { ErrorContext } from '../lib/Context';

const Home = () => {
  const [, setErr] = React.useContext(ErrorContext);
  React.useEffect(() => {
    status()
      .catch(setErr)
  }, [setErr]);
  
  return <div className='home'>HOME</div>
};

export default Home;