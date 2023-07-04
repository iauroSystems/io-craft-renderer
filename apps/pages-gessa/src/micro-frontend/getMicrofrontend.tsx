import React from 'react';

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

const MicrofrontendFile = (url: string, scope: string, module: string) => {
  return new Promise((resolve, reject) => {
    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = async () => {
      // @ts-ignore
      element.parentElement.removeChild(element);

      const Component = (await loadComponent(scope, module)()).default;
      resolve(Component);

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      // const Component = require('flowChartApp/FlowChartSlice');
    };

    element.onerror = () => {
      // @ts-ignore
      element.parentElement.removeChild(element);

      reject(`Dynamic Script Error: ${url}`);
    };

    document.head.appendChild(element);
  });
};

export default MicrofrontendFile;
