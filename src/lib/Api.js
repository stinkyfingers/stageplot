const liveEndpoint = 'https://stageplotapi-production.up.railway.app';
const localEndpoint = 'http://localhost:8080';
const { NODE_ENV, REACT_APP_ENV } = process.env;
const api = () => {
  if (NODE_ENV === 'development' && REACT_APP_ENV !== 'live') {
    return localEndpoint;
  }
  return liveEndpoint;
};

export const status = async() => {
  const res = await fetch(`${api()}/status`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json();
  return data;
};

export const auth = async(user) => {
  const res = await fetch(`${api()}/user/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  });
  const data = await res.json();
  return data;
};

export const listStagePlots = async(token) => {
  const res = await fetch(`${api()}/plots`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json();
  return data;
};

export const getStagePlot = async(token, id) => {
  const res = await fetch(`${api()}/plot/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  });
  const data = await res.json();
  return data;
};

export const createStagePlot = async(token, stagePlot) => {
  const res = await fetch(`${api()}/plot`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stagePlot)
  });
  const data = await res.json();
  return data;
};

export const updateStagePlot = async(token, stagePlot) => {
  const res = await fetch(`${api()}/plot`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(stagePlot)
  });
  const data = await res.json();
  return data;
}