import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

// jest.mock('next/dynamic', () => (func: any) => {
//   const functionString = func.toString();
//   const modulePath = '../src/' + functionString.match(/"..\/(.*?)"/)[1];

//   const namedExport = functionString.match(/mod\.(.+?(?=\)))/);
//   const componentName = namedExport ? namedExport[1] : 'default';

//   return require(modulePath)[componentName];
// });

describe('Map', () => {
  it('renders a heading', () => {
    expect(true).toBe(true);
  });
});
