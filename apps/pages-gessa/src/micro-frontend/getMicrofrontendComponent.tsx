import React, { useMemo, useState } from 'react';
import Loader from '../app/components/loader/Loader';

function loadComponent(scope: any, module: any) {
  return async () => {
    // @ts-ignore Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');

    const container = window[scope]; // or get the container somewhere else
    // @ts-ignore Initialize the container, it may provide shared modules
    await container.init(__webpack_share_scopes__.default);

    // @ts-ignore

    const factory = await window[scope].get(module);
    const Module = factory();
    return Module;
  };
}

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
    ready,
    failed,
  };
};

const Microfrontend = (props: {
  url: string;
  scope: string;
  module: string;
  props?: any;
}) => {
  const { ready, failed } = useDynamicScript({
    url: props && props.url,
  });

  if (!props) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: '150px',
            width: '150px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <Loader status={true} size={50} />
        </div>
        <h5>Not props specified</h5>
      </div>
    );
  }

  if (!ready) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: '150px',
            width: '150px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <Loader status={true} size={50} />
        </div>
        <h5>Loading {props.scope}</h5>
      </div>
    );
  }

  if (failed) {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
        }}
      >
        <div
          style={{
            position: 'relative',
            display: 'flex',
            height: '150px',
            width: '150px',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <Loader status={false} size={50} />
        </div>
        <h5>Failed to load {props.url}</h5>
      </div>
    );
  }

  const Component = React.lazy(loadComponent(props.scope, props.module));

  return (
    <React.Suspense
      fallback={
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
          }}
        >
          <div
            style={{
              position: 'relative',
              display: 'flex',
              height: '150px',
              width: '150px',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
            }}
          >
            <Loader status={true} size={50} />
          </div>
          <h5>Loading {props.scope}</h5>
        </div>
      }
    >
      <Component {...props.props} />
    </React.Suspense>
  );
};

export default Microfrontend;
