import { IconButton, Tooltip } from '@mui/material';
import { LocationOn } from '@mui/icons-material';

const LocationMapIconButton = ({
  map,
  coords,
  callback,
  customIcon,
  color,
  title,
}: {
  map: any;
  coords: number[];
  callback?: () => void;
  customIcon?: any;
  color?: string;
  title?: string;
}) => {
  return (
    <Tooltip title={title || 'Center map on this point'}>
      <IconButton
        onClick={() => {
          map.flyTo([coords[0], coords[1]], 15);
          callback && callback();
        }}
      >
        {customIcon ? (
          customIcon
        ) : (
          <LocationOn sx={{ color: color || '#0288d1' }} />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default LocationMapIconButton;
