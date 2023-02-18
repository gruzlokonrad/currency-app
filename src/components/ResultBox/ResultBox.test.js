import { render, screen, cleanup } from '@testing-library/react';
import ResultBox from './ResultBox';
import '@testing-library/jest-dom/extend-expect';

describe('Component ResultBox', () => {
  it('should render without crashing', () => {
    render(<ResultBox from="PLN" to="USD" amount={100} />);
    render(<ResultBox from="USD" to="PLN" amount={100} />);
  });

  it('should render proper info about conversion when PLN -> USD', () => {
    const testCases = [
      { value: 100, result: '28.57' },
      { value: 150, result: '42.86' },
      { value: 327, result: '93.43' }
    ];

    for (const testObj of testCases) {
      render(<ResultBox from="PLN" to="USD" amount={testObj.value} />);
      const output = screen.getByTestId('convertedValue');
      expect(output).toHaveTextContent(`PLN ${testObj.value}.00 = $${testObj.result}`);
      cleanup()
    }
  });

  it('should render the same value when currency is the same', () => {
    const testCases = {
      currency: ['PLN', 'USD'],
      value: [213, 411, 7]
    };

    for (const currency of testCases.currency) {
      for (const value of testCases.value) {
        const renderViewPLN = () => `${currency} ${value}.00 = ${currency} ${value}.00`
        const renderViewUSD = () => `$${value}.00 = $${value}.00`

        render(<ResultBox from={currency} to={currency} amount={value} />);
        const output = screen.getByTestId('convertedValue');
        expect(output).toHaveTextContent(
          currency === 'PLN'
            ? renderViewPLN()
            : renderViewUSD()
        );
        cleanup()
      }
    }
  });

  it('should return "Wrong value.." when input is lower than zero', () => {
    const testCases = [-15, -27, -2];

    for(const testValue of testCases) {
      render(<ResultBox from='PLN' to='USD' amount={testValue} />)
      const output = screen.getByTestId('convertedValue');
      expect(output).toHaveTextContent('Wrong value..');
      cleanup()
    }
  });
});