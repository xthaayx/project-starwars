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

  it('testa filter maior que', async () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)}) 
    const nameImput = screen.getByTestId("name-filter");
    const columnInput = screen.getByTestId("column-filter");
    const comparisonInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByRole('button', {name:/filtrar/i})

    // userEvent.type(nameImput, 'formulário');
    userEvent.selectOptions(columnInput, 'population');
    userEvent.selectOptions(comparisonInput, 'maior que');
    userEvent.type(valueInput, '12');
    userEvent.click(buttonFilter);
    

    // expect(nameImput).toHaveValue('formulário');
    expect(columnInput).toHaveValue('orbital_period');
    expect(comparisonInput).toHaveValue('maior que');
    expect(valueInput).toHaveValue(0);


  });

  it('testa filter igual a', async () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)}) 
    const nameImput = screen.getByTestId("name-filter");
    const columnInput = screen.getByTestId("column-filter");
    const comparisonInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByRole('button', {name:/filtrar/i})
    const deleteAllFilter = screen.getAllByRole('button', {name: /Remover todas filtragens/i})[0];

     
    userEvent.click(deleteAllFilter);
    userEvent.type(nameImput, 'formulário');
    userEvent.selectOptions(columnInput, 'rotation_period');
    userEvent.selectOptions(comparisonInput, 'igual a');
    userEvent.type(valueInput, '23');
    userEvent.click(buttonFilter);


  });

  it('testa filter menor que ', async () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)}) 
    const nameImput = screen.getByTestId("name-filter");
    const columnInput = screen.getByTestId("column-filter");
    const comparisonInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByRole('button', {name:/filtrar/i})

    userEvent.type(nameImput, 'formulário');
    userEvent.selectOptions(columnInput, 'diameter');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '10000000');
    userEvent.click(buttonFilter);   

  });

  it('testa filter retorna null', async () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)}) 
    const nameImput = screen.getByTestId("name-filter");
    const columnInput = screen.getByTestId("column-filter");
    const comparisonInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByRole('button', {name:/filtrar/i})
    const deleteAllFilter = screen.getAllByRole('button', {name: /remover todas/i})[0];

    userEvent.type(nameImput, 'formulário');
    userEvent.selectOptions(columnInput, 'population');
    userEvent.selectOptions(comparisonInput, 'menor que');
    userEvent.type(valueInput, '-1');
    userEvent.click(buttonFilter);  
    
    // expect((valueInput.innerHTML)).toHaveLength(0);
    // expect(deleteAllFilter).toBeInTheDocument();

  });

  it('testa botão remover', async () => {
    act(()=> {render(<AppPlanetsProvider><App /></AppPlanetsProvider>)}) 

    const columnInput = screen.getByTestId("column-filter");
    const comparisonInput = screen.getByTestId("comparison-filter");
    const valueInput = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnInput, ['population']);
    userEvent.selectOptions(comparisonInput, ['menor que']);
    userEvent.type(valueInput, '10000000');
    userEvent.click(buttonFilter);
    
    const deleteFilter = screen.getAllByRole('button', {name: /excluir/i});
    userEvent.click(deleteFilter[0]);

    const deleteAllFilter = screen.getAllByRole('button', {name: /remover todas/i})[0];
    userEvent.click(deleteAllFilter);

  })
})
