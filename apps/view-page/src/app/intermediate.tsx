import React from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import ChartDetails2 from './pages/projects/components/ChartDetails2';
import DemoWrapper from './pages/projects/DemoWrapper';

export interface Props {
  page_id: any;
}

const Intermediate = (props: Props) => {
  return (
    <div style={{ height: '100%', width: '100%' }}>
      <Routes>
        <Route
          path={''}
          element={<DemoWrapper page_id={props.page_id} />}
        ></Route>
        <Route path={'detail'} element={<ChartDetails2 />}></Route>
      </Routes>
    </div>
  );
};

export default Intermediate;
