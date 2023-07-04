import { Typography } from '@mui/material';
import React from 'react';

const Loader = () => {
  return (
    <div className="absolute w-full h-full flex justify-center items-center">
      <Typography variant="body1">Loading...</Typography>
    </div>
  );
};

export default Loader;
