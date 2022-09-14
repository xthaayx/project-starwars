import React, { useContext } from 'react';
import AppPlanetsContext from '../context/AppPlanetsContext';
import Filter from './Filter';
// import planetApi from '../services/planetApi';

function Table() {
  const { filter, allFilters, filterName } = useContext(AppPlanetsContext);

  const filterByName = (item) => item.filter((i) => i.name.toUpperCase()
    .includes(filterName.toUpperCase()));

  const filterValue = () => {
    if (filter) {
      const result = allFilters.reduce((prev, curr) => prev.filter((item) => {
        if (curr.comparison === 'maior que') {
          return Number(item[curr.column]) > Number(curr.value);
        } if (curr.comparison === 'menor que') {
          return Number(item[curr.column]) < Number(curr.value);
        }
        return Number(item[curr.column]) === Number(curr.value);
        // return null;
      }), filter);
      return filterByName(result);
    }
  };

  const table = () => (
    filterValue().map((planet) => (
      <tr key={ planet.name }>
        <td>{planet.name}</td>
        <td>{planet.rotation_period}</td>
        <td>{planet.orbital_period}</td>
        <td>{planet.diameter}</td>
        <td>{planet.climate}</td>
        <td>{planet.gravity}</td>
        <td>{planet.terrain}</td>
        <td>{planet.surface_water}</td>
        <td>{planet.population}</td>
        <td>{planet.films}</td>
        <td>{planet.created}</td>
        <td>{planet.edited}</td>
        <td>{planet.url}</td>
      </tr>
    ))
  );

  return (
    <div>
      <Filter />
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { table() }
        </tbody>
      </table>
    </div>
  );
}

export default Table;
