import React, { useContext, useState } from 'react';
import AppPlanetsContext from '../context/AppPlanetsContext';
// import planetApi from '../services/planetApi';

// Codigo Refatorado para passar o requisito 7 com ajuda de Tiago Braga Costa

function FilterInput() {
  const [stateName, setStateName] = useState('');
  const [stateColumn, setStateColumn] = useState('population');
  const [stateComparison, setStateComparison] = useState('maior que');
  const [stateValue, setStateValue] = useState(0);

  const { allFilters,
    setAllFilters,
    setFilterName } = useContext(AppPlanetsContext);

  const [columnsFilters, setColumnsFilters] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  const verifyInput = ({ target }) => {
    if (target.id === 'name-filter') {
      setStateName(target.value);
      setFilterName(target.value);
    } if (target.id === 'column-filter') {
      setStateColumn(target.value);
    } if (target.id === 'comparison-filter') {
      setStateComparison(target.value);
    } if (target.id === 'value-filter') {
      setStateValue(target.value);
    }
  };

  const handleClick = () => {
    setAllFilters([...allFilters, {
      column: stateColumn,
      comparison: stateComparison,
      value: stateValue }]);
    setColumnsFilters(columnsFilters.filter((curr) => curr !== stateColumn));
    // filterValue();
    setStateColumn('population');
    setStateComparison('maior que');
    setStateValue(0);
  };

  // const handleClick = () => {
  //   const { column, comparison, number } = inputFilter;
  //   setColumnsFilters(columnsFilters.filter((curr) => curr !== column));
  //   let filtered = [];
  //   if (columnsFilters.includes('population')) {
  //     setInputFilter({ column: 'population' });
  //   }
  //   if (comparison === 'maior que') {
  //     filtered = filter
  //       .filter((planet) => Number(planet[column]) > Number(number));
  //   } if (comparison === 'menor que') {
  //     filtered = filter
  //       .filter((planet) => Number(planet[column]) < Number(number));
  //   } if (comparison === 'igual a') {
  //     filtered = filter
  //       .filter((planet) => Number(planet[column]) === Number(number));
  //   }
  //   setFilter(filtered);
  //   // setFilter([...filter, {
  //   //   column, comparison, number,
  //   // }]);
  // };

  const deletFilter = (item) => {
    const newSelectedFilters = allFilters.filter((i) => i.column !== item);
    setAllFilters(newSelectedFilters);
  };

  const filterRemove = allFilters.map((item, index) => (
    <div key={ item.column + index } data-testid="filter">
      <span>
        {`${item.column} ${item.comparison} ${item.value}`}
      </span>
      {' '}
      <button
        type="button"
        onClick={ () => deletFilter(item.column) }
      >
        Excluir
      </button>
    </div>
  ));

  // const removeAllFilters = () => {
  //   setColumnsFilters([
  //     'population',
  //     'orbital_period',
  //     'diameter',
  //     'rotation_period',
  //     'surface_water',
  //   ]);
  //   setInputFilter({
  //     column: 'population',
  //     comparison: 'maior que',
  //     number: 0,
  //   });
  //   setFilter([]);
  //   const apiPlanets = async () => {
  //     const data = await planetApi();
  //     setPlanets(data.results);
  //   };
  //   apiPlanets();
  // };

  return (
    <>
      <div>
        <input
          data-testid="name-filter"
          type="text"
          id="name-filter"
          value={ stateName }
          onChange={ verifyInput }
        />
      </div>
      <div>
        <select
          data-testid="column-filter"
          name="column"
          id="column-filter"
          value={ stateColumn }
          onChange={ verifyInput }
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
          id="comparison-filter"
          value={ stateComparison }
          onChange={ verifyInput }
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
          id="value-filter"
          name="number"
          value={ stateValue }
          onChange={ verifyInput }
        />
      </div>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => handleClick() }
      >
        Filtrar
      </button>
      <div>
        <button
          onClick={ () => setAllFilters([]) }
          data-testid="button-remove-filters"
          type="button"
        >
          Remover todas filtragens

        </button>
      </div>
      <div>
        { filterRemove }
      </div>
    </>
  );
}

export default FilterInput;
