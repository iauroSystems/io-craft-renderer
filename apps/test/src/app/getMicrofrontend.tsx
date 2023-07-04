import React, { lazy, Suspense, useMemo } from 'react';
import { connectorIcons } from './componentMapper';

const useDynamicScript = (args: any) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      setReady(true);
    };

    element.onerror = () => {
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready: true,
    failed: false,
  };
};

const Microfrontend = (props: any) => {
  const { ready, failed } = useDynamicScript({
    url: props && props.url,
  });

  if (!props) {
    return <h2>Not props specified</h2>;
  }

  if (!ready) {
    return <h2>Loading not ready {props.scope}</h2>;
  }

  if (failed) {
    return <h2>Failed to load {props.url}</h2>;
  }

  const Component2 = connectorIcons['Dsl'];
  return (
    <React.Suspense fallback={`Loading Microfrontend`}>
      <div>tis is divs</div>
    </React.Suspense>
  );
};

export default Microfrontend;
