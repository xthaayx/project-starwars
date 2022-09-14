import { createContext } from 'react';

const AppPlanetsContext = createContext({
  planets: [],
  filter: [],
  allFilters: [],
});

export default AppPlanetsContext;
