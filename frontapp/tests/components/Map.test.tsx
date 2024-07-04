import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Map from '@/components/Map';

// jest.mock('next/dynamic', () => (func: any) => {
//   const functionString = func.toString();
//   const modulePath = '../src/' + functionString.match(/"..\/(.*?)"/)[1];

//   const namedExport = functionString.match(/mod\.(.+?(?=\)))/);
//   const componentName = namedExport ? namedExport[1] : 'default';

//   return require(modulePath)[componentName];
// });

jest.mock('@/components/MapLayers/HexGrid', () => {
  return {
    __esModule: true,
    default: () => {
      return <div></div>;
    },
  };
});

describe('Home', () => {
  it('renders a heading', () => {
    render(<Map posix={[-3.731862, -38.526669]} />);

    const heading = screen.getByText('Leaflet');

    expect(heading).toBeInTheDocument();
  });
});
