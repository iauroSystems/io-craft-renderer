import React, { lazy, Suspense, useEffect, useState } from 'react';
import { Barchart } from '@iocraft/component-library';
import { TextField } from '@mui/material';
import { connectorIcons } from './componentMapper';
import Microfrontend from './getMicrofrontend';
import { render } from 'react-dom';
let Component = connectorIcons['dsl'];

type Props = {};

const App = (props: Props) => {
  const [currentComponent, setCurrentComponent] = useState<string>('');
  useEffect(() => {
    // console.log(currentComponent);
    // if (currentComponent === 'barchart') {
    //   Component = connectorIcons['barchart'];
    // } else if (currentComponent === 'linechart') {
    //   Component = connectorIcons['linechart'];
    // } else {
    //   Component = connectorIcons[currentComponent];
    // }
    if (currentComponent) {
      Component = connectorIcons[currentComponent]
        ? connectorIcons[currentComponent]
        : connectorIcons['dsl'];
    }
  }, [currentComponent]);

  const propObj = {
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Dataset 1',
          data: [500, 200, 100, 700, 300, 550, 230],
          backgroundColor: '#ff6083',
          borderRadius: 5,
        },
        {
          label: 'Dataset 2',
          data: [200, 900, 350, 520, 1000, 330, 440],
          backgroundColor: '#ff6083',
          borderRadius: 5,
        },
        {
          label: 'Dataset 3',
          data: [200, 900, 350, 520, 1000, 330, 440],
          backgroundColor: '#ff6083',

          borderRadius: 5,
        },
        {
          label: 'Dataset 3',
          data: [200, 900, 350, 520, 1000, 330, 440],
          backgroundColor: '#ff6083',

          borderRadius: 5,
        },
      ],
    },
    xLabel: 'x',
    yLabel: 'y',
    horizontal: true,
    stacked: true,
  };

  return (
    <div>
      <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        onKeyDown={(e: any) => {
          setCurrentComponent(e.target.value);
        }}
      />
      {currentComponent && (
        <Suspense fallback={<>loading me</>}>
          <Component {...propObj} />
        </Suspense>
      )}
    </div>
  );
};

export default App;
