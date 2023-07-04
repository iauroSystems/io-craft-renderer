import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const ChartDetails2 = (props: Props) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 100,
      }}
      onClick={(e: any) => {
        navigate(-1);
      }}
    >
      Coming Soon
    </div>
  );
};

export default ChartDetails2;
