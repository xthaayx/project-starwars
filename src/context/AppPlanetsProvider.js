import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppPlanetsContext from './AppPlanetsContext';
import planetApi from '../services/planetApi';

function AppPlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState([]);
  const [filterPlanets, setFilterPlanets] = useState();
  // const [inputFilter, setInputFilter] = useState({
  //   column: 'population',
  //   comparison: 'maior que',
  //   number: 0,
  // });

  const valueContext = {
    planets,
    setPlanets,
    filter,
    setFilter,
    filterPlanets,
    setFilterPlanets,
    // inputFilter,
    // setInputFilter,
  };

  useEffect(() => {
    const apiPlanets = async () => {
      const data = await planetApi();
      setPlanets(data.results);
      setFilterPlanets(data.results);
    };
    apiPlanets();
  }, []);

  return (
    <AppPlanetsContext.Provider value={ valueContext }>
      { children }
    </AppPlanetsContext.Provider>
  );
}

AppPlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppPlanetsProvider;
