import {useState, useEffect} from 'react';
import swapi from '../api/swapi';


export default () => {
  const [planet, setPlanet] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [next, setNext] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);

  const searchAPI = async () => {
    setLoader(true);
    try {
      if (!endReached) {
        const url = next
          ? next.replace('http://127.0.0.1:8000/api/', '')
          : 'planets/?search';
        const response = await swapi.get(url);
        if (!response.data.next) {
          setEndReached(true);
        }
        setNext(response.data.next);
        setPlanet([...planet, ...response.data.results]);
      }
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
    setLoader(false);
  };
  useEffect(() => {
    searchAPI();
  }, []);
  return [searchAPI, planet, errorMessage, loader];
};
