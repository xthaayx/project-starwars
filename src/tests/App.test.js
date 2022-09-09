import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import useEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AppPlanetsProvider from '../context/AppPlanetsProvider';
import userEvent from '@testing-library/user-event';


describe('Teste de input', () => {
  global.fetch = () => (
    Promise.resolve({
      json: () => (
        Promise.resolve(testData)
      ),
    })
  )

  it('testa input', () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)})

      const table = screen.getByRole("table");
      const nameImput = screen.getByTestId("name-filter");
      const columnInput = screen.getByTestId("column-filter");
      const comparisonInput = screen.getByTestId("comparison-filter");
      const valueInput = screen.getByTestId("value-filter");
      const button = screen.getByRole("button", {
        name:/filtrar/i
      });

      expect(table).toBeInTheDocument();
      expect(nameImput).toBeInTheDocument();
      expect(columnInput).toBeInTheDocument();
      expect(comparisonInput).toBeInTheDocument();
      expect(valueInput).toBeInTheDocument();
      userEvent.click(button);
      expect(button).toBeInTheDocument();
  });

  it('testa filter', async () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)}) 
    expect(screen.getByTestId('value-filter')).toBeInTheDocument()
  });
})
