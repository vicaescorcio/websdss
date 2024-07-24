import { Box, Button } from '@mui/material';
import { ResultsFilter } from '../AnalysisForm/ResultForm/types';

const MapFiltersForm = ({
  filters,
  setFilters,
}: {
  filters?: ResultsFilter | null;
  setFilters: (value: any) => void;
}) => {
  return (
    <Box sx={{ zIndex: '10000', position: 'fixed', top: '80px', left: '10px' }}>
      <Box
        sx={{
          bgcolor: 'white',
          padding: '20px',
          borderRadius: '5px',
          boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '10px',
          alignItems: 'center',
        }}
      >
        <h2>Filtros Ativos</h2>
        <Box>
          <h3>Group: {filters?.group}</h3>
        </Box>
        <Box>
          <h3>Hexagon: {filters?.hex} </h3>
        </Box>
        <Box>
          <Button
            onClick={() => {
              setFilters(null);
            }}
            variant='contained'
            size='small'
          >
            Reset Filters
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MapFiltersForm;
