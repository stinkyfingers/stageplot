import React from 'react';
import { useParams } from 'react-router-dom';
import { getStagePlot, updateStagePlot } from '../lib/Api';
import { ErrorContext, UserContext } from '../lib/Context';
import PlotLayout from './PlotLayout';

const StagePlot = () => {
  const [user] = React.useContext(UserContext);
  const [, setErr] = React.useContext(ErrorContext);
  const { id } = useParams();
  const [stagePlot, setStagePlot] = React.useState();
  React.useEffect(() => {
    getStagePlot(user.token, id)
      .then((res) => {
        if (res.error) {
          setErr(res.error)
        } else {
          setStagePlot(res);
        }
      })
      .catch(setErr);
  }, [id, setStagePlot, setErr, user.token]);
  
  const handleClick = () => {
    updateStagePlot(user.token, stagePlot)
      .then((res) => {
        if (res.error) {
          setErr(res.error)
        } else {
          setStagePlot(res);
        }
      })
      .catch(setErr);
  };
  
  const handleChange = (e) => {
    setStagePlot((current) => ({ ...current, isPublic: !current.isPublic }));
  };
  
  const handleLayout = (icons) => {
    setStagePlot((current) => ({ ...current, icons }));
  }
  
  if (!stagePlot) return <div>Loading...</div>;
  
	return (
		<div className='stagePlot'>
      <h3>{stagePlot.name}</h3>
      <div>
        <span>Make Public</span>
        <input type='checkbox' onChange={handleChange} checked={stagePlot.isPublic} />
      </div>
      <PlotLayout stagePlot={stagePlot} handleLayout={handleLayout} />
      <button onClick={handleClick}>Save</button>
    </div>
	);
};

export default StagePlot;
