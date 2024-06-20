export type LocationPoint = {
  hexId: string;
  latitude: number;
  longitude: number;
  name: string;
};

export type LocationForm = {
  country: string;
  city: string;
  points: LocationPoint[];
};
