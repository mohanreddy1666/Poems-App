import React, { useEffect, useState } from 'react';
import Routing from './components/Routing';
import './styles/Styles.css';

export default function App() {
  const [status, setStatus] = useState(0);
  const [information, setInformation] = useState([]);
  const endpoint1 = 'https://poetrydb.org/random/20';
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(endpoint1, { mode: 'cors' });
        const data = await response.json();
        console.log('oredr', data);
        setInformation(data);
        console.log('information', { information });
        setStatus(1);
      } catch {
        setStatus(2);
      }
    };

    getData();
  }, []);

  return (
    <div className='home-page'>
      {status === 0 ? <p>Loading...</p> : null}
      {status === 1 ? <Routing data={information} /> : null}
      {status === 2 ? <p>Sorry we cannot find data</p> : null}
    </div>
  );
}
