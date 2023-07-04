import { Box, Typography, useTheme } from '@mui/material';
import './Empty.css';

function Empty({ right = false }) {
  const theme = useTheme();

  return (
    <div className={`container--empty ${right && 'container--empty__RT'}`}>
      <Box component="main" className="main__empty">
        <Box
          component="div"
          className="main__content"
          sx={{
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Typography variant='h4'>Empty Layout Works...</Typography>
        </Box>
      </Box>
    </div>
  );
}

export default Empty;
