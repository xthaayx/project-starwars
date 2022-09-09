import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';

// test('I am your test', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/Hello, App!/i);
//   expect(linkElement).toBeInTheDocument();
// });

describe('Teste de input', () => {
  it('testa input', () => {
      render(<App />);

      const nameImput = screen.getByTestId("name-filter")
      const columnInput = screen.getByTestId("column-filter")
      const comparisonInput = screen.getByTestId("comparison-filter")
      const valueInput = screen.getByTestId("value-filter")

      expect(nameImput).toBeInTheDocument();
      expect(columnInput).toBeInTheDocument();
      expect(comparisonInput).toBeInTheDocument();
      expect(valueInput).toBeInTheDocument();
  });
})
