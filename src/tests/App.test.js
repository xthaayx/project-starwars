import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import testData from '../../cypress/mocks/testData';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import AppPlanetsProvider from '../context/AppPlanetsProvider';


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
    const nameImput = screen.getByTestId("name-filter");
    const columnInput = screen.getByTestId("column-filter");
    const comparisonInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");

    userEvent.type(nameImput, 'formulário');
    userEvent.selectOptions(columnInput, ['diameter']);
    userEvent.selectOptions(comparisonInput, ['maior que']);
    userEvent.type(valueInput, '12');

    expect(nameImput).toHaveValue('formulário');
    expect(columnInput).toHaveValue('diameter');
    expect(comparisonInput).toHaveValue('maior que');
    expect(valueInput).toHaveValue(12);
  });
})
