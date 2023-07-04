import { CircularProgress } from '@mui/material';
import React from 'react';

type Props = {};

const LoadingData = (props: any) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      <CircularProgress color={'primary'} size={props.size || 40} />
    </div>
  );
};

export default LoadingData;
