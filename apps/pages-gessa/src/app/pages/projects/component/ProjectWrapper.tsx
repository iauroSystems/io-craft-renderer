import { Outlet } from 'react-router';
import Project from '../Project';
import { useParams, useRoutes } from 'react-router-dom';
import { useEffect } from 'react';

const ProjectWrapper = () => {
  const params = useParams();
  useEffect(() => {
    // console.log('params', params);
  }, [params]);

  return (
    <div className="flex flex-row overflow-y-hidden">
      <Project />
      <Outlet />
    </div>
  );
};

export default ProjectWrapper;
