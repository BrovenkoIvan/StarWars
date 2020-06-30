import {useState, useEffect} from 'react';
import swapi from '../api/swapi';

export default () => {
  const [planet, setPlanet] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [next, setNext] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const searchAPI = async searchTerm => {
    try {
      if (!endReached) {
        const url = next
          ? next.replace('http://127.0.0.1:8000/api/', '')
          : 'planets/?search';
        const response = await swapi.get(url, {
          params: {
            name: searchTerm,
          },
        });
        if (!response.data.next) {
          setEndReached(true);
        }
        setNext(response.data.next);
        setPlanet([...planet, ...response.data.results]);
      }
    } catch (err) {
      setErrorMessage('Something went wrong');
    }
  };
  useEffect(() => {
    searchAPI('');
  }, []);
  return [searchAPI, planet, errorMessage];
};
