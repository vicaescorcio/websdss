import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Map from '.';
import { MapContainer, TileLayer } from 'react-leaflet';

// Mocking Leaflet's MapContainer and TileLayer as they rely on browser APIs
jest.mock('react-leaflet', () => {
  const MapContainer = ({ children }: any) => <div>{children}</div>;
  const TileLayer = () => <div>TileLayer</div>;
  return { MapContainer, TileLayer };
});

describe('Map Component', () => {
  const defaultProps = {
    posix: [39.75621, -104.99404] as [number, number], // Using the coordinates from your GeoJSON data as default
    zoom: 12,
    children: <div>Marker</div>, // You can mock children to see if they render properly
  };

  it('should render the map container with correct props', () => {
    const { getByText } = render(<Map {...defaultProps} />);

    // Check if the map container is rendered with the TileLayer component
    expect(getByText('TileLayer')).toBeInTheDocument();

    // Check if the children passed are rendered correctly
    expect(getByText('Marker')).toBeInTheDocument();
  });

  it('should render with default zoom if none is provided', () => {
    const { getByText } = render(<Map posix={defaultProps.posix} />);

    // Again, we're checking for the TileLayer mock to confirm render
    expect(getByText('TileLayer')).toBeInTheDocument();
  });
});
