import React, { useContext, useState } from 'react';
import AppPlanetsContext from '../context/AppPlanetsContext';
// import planetApi from '../services/planetApi';

function FilterInput() {
  const { filter,
    setFilter,
    planets,
    setPlanets,
    filterPlanets } = useContext(AppPlanetsContext);

  const [inputFilter, setInputFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    number: 0,
  });

  const [columnsFilters, setColumnsFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  // useEffect(() => {
  //   setInputFilters({ ...INITIAL_STATE, column: columnsFilters[0] || '' });
  // }, [columnsFilters]);

  const handleFilter = async ({ target }) => {
    setFilter(target.value);
    const filterP = filterPlanets.filter((planet) => planet.name.includes(target.value));
    setPlanets(filterP);
  };

  const inputChange = ({ target }) => {
    setInputFilter({ ...inputFilter, [target.name]: target.value });
  };

  const handleClick = () => {
    const { column, comparison, number } = inputFilter;
    setColumnsFilters(columnsFilters.filter((curr) => curr !== column));
    let filtered = [];
    if (comparison === 'maior que') {
      filtered = planets
        .filter((planet) => Number(planet[column]) > Number(number));
    } if (comparison === 'menor que') {
      filtered = planets
        .filter((planet) => Number(planet[column]) < Number(number));
    } if (comparison === 'igual a') {
      filtered = planets
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
          { columnsFilters.map((i) => (
            <option key={ i }>
              { i }
            </option>)) }
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
