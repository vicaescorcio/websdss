const PopulationHexPopup = ({ properties }: { properties: any }) => {
  return (
    <div>
      <h2>Demographics</h2>
      <p>Total population: {properties.population}</p>
      <p>Population between age 0 and 5: {properties['0_a_5_anos']}</p>
      <p>Population between age 6 and 10: {properties['6_a_10_anos']}</p>
      <p>Population between age 11 and 14: {properties['11_a_14_anos']}</p>
      <p>Centroid: {properties.centroid}</p>
      <p>Low income: {properties.baixa_renda}</p>
      <p>Income tier: {properties.faixa_de_renda}</p>
      <p>Average Income by family: {properties.renda_media_familiar}</p>
      <p>Per capita: {properties.renda_per_capita}</p>
    </div>
  );
};

export default PopulationHexPopup;
