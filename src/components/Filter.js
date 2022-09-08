import React, { useContext, useState } from 'react';
import AppPlanetsContext from '../context/AppPlanetsContext';
// import planetApi from '../services/planetApi';

function FilterInput() {
  const { filter,
    setFilter,
    setPlanets,
    filterPlanets } = useContext(AppPlanetsContext);

  const [inputFilter, setInputFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const handleFilter = async ({ target }) => {
    setFilter(target.value);
    const filterP = filterPlanets.filter((planet) => planet.name.includes(target.value));
    setPlanets(filterP);
  };

  const inputChange = ({ target }) => {
    const { value, name } = target;
    setInputFilter({ ...inputFilter, [name]: value });
  };

  const handleClick = () => {
    const { column, comparison, number } = inputFilter;
    let filtered = [];
    if (comparison === 'maior que') {
      filtered = filterPlanets
        .filter((planet) => Number(planet[column]) > Number(number));
    } if (comparison === 'menor que') {
      filtered = filterPlanets
        .filter((planet) => Number(planet[column]) < Number(number));
    } if (comparison === 'igual a') {
      filtered = filterPlanets
        .filter((planet) => Number(planet[column]) === Number(number));
    }
    setPlanets(filtered);
  };

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          value={ filter }
          onChange={ handleFilter }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column"
          value={ inputFilter.column }
          onChange={ inputChange }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </div>
      <div>
        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ inputFilter.comparison }
          onChange={ inputChange }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </div>
      <div>
        <input
          data-testid="value-filter"
          type="number"
          name="number"
          value={ inputFilter.number }
          onChange={ inputChange }
        />
      </div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
    </>
  );
}

export default FilterInput;
