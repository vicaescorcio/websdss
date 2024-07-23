import { IconButton, Tooltip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const LocationMapIconButton = ({
  map,
  coords,
  callback,
  customIcon,
}: {
  map: any;
  coords: number[];
  callback?: () => void;
  customIcon?: any;
}) => {
  return (
    <Tooltip title='Center map on this point'>
      <IconButton
        onClick={() => {
          map.flyTo([coords[0], coords[1]], 15);
          callback && callback();
        }}
      >
        {customIcon ? customIcon : <LocationOn color='primary' />}
      </IconButton>
    </Tooltip>
  );
};

export default LocationMapIconButton;
