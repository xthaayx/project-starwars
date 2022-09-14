import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppPlanetsContext from './AppPlanetsContext';
import planetApi from '../services/planetApi';

function AppPlanetsProvider({ children }) {
  // const [planets, setPlanets] = useState([]);
  const [filter, setFilter] = useState([]);
  const [allFilters, setAllFilters] = useState([]);
  const [filterName, setFilterName] = useState('');
  // const [filterPlanets, setFilterPlanets] = useState();
  // console.log(filter);

  const valueContext = {
    filter,
    setFilter,
    allFilters,
    setAllFilters,
    filterName,
    setFilterName,
  };

  useEffect(() => {
    const apiPlanets = async () => {
      const data = await planetApi();
      // setPlanets(data.results);
      // setFilterPlanets(data.results);
      setFilter(data.results);
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
