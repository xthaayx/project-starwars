import React, { useContext } from 'react';
import AppPlanetsContext from '../context/AppPlanetsContext';
// import planetApi from '../services/planetApi';

function FilterInput() {
  const { filter, setFilter, setPlanets, filterPlanets } = useContext(AppPlanetsContext);

  const handleFilter = async ({ target }) => {
    setFilter(target.value);
    const filterP = filterPlanets.filter((planet) => planet.name.includes(target.value));
    setPlanets(filterP);
  };

  //   const filterName = ({ target: { value } }) => {
  //     setFilter(value);
  //   };

  return (
    <input
      data-testid="name-filter"
      type="text"
      value={ filter }
      onChange={ handleFilter }
    />
  );
}

export default FilterInput;
