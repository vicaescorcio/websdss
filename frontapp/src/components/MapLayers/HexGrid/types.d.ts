export interface HexProperties {
  id: string;
  h3_polyfill: string;
  input_polygon: string;
  centroid: string;
  baixa_renda: boolean;
  faixa_de_renda: string;
  renda_media_familiar: number;
  renda_per_capita: number;
  total: number;
  '0_a_5_anos': number;
  '6_a_10_anos': number;
  '11_a_14_anos': number;
}

// data are from the "to" hexagon
export interface AnalysisHexProperties {
  from_id: number;
  to_id: number;
  travel_time: number;
  h3_polyfill_origem: string;
  input_polygon: string;
  renda_per_capita: number;
  total: number;
  '0_a_5_anos': number;
  '6_a_10_anos': number;
  '11_a_14_anos': number;
  h3_polyfill_destino: string;
}
