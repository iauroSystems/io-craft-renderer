import React, {
  createContext,
  useState,
  FC,
  ReactNode,
  useEffect,
} from 'react';
import Loader from '../app/components/loader/Loader';
import Remotes, {
  IMicroFrontend,
  IMicroFrontends,
} from '../micro-frontend/remotes';
import getSuspender from '../utils/getSuspender';
import loadDynamicScript from '../utils/loadDynamicScript';

// type IRemoteScope = string;
// interface MyWindow extends Window {
//   [key: IRemoteScope]: {
//     get(): void;
//   }
// }
// declare const window: MyWindow;

const loadComponent = (scope: any, module: any) => {
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
};

const loadMicroFrontends = () => {
  return new Promise((resolve, reject) => {
    const remotes: IMicroFrontends = Remotes;
    const slices: any = {};
    const routes: any = [];
    let remotesCount = Object.keys(remotes).length;
    if (remotesCount === 0) {
      resolve({
        slices,
        routes,
      });
    }

    function checkRemotesDone() {
      remotesCount--;
      if (remotesCount === 0) {
        resolve({
          slices,
          routes,
        });
      }
    }

    // Iterate all remotes
    Object.values(remotes).forEach(
      async (remote: IMicroFrontend, index: number) => {
        function checkRemoteDone(element: HTMLScriptElement | null) {
          if (sliceCount === 0 && routeCount === 0) {
            // Remove script once done
            if (element && element.parentElement) {
              element.parentElement.removeChild(element);
            }
            checkRemotesDone();
          }
        }

        let [sliceCount, routeCount] = [
          Object.keys(remote.slices).length,
          Object.keys(remote.routes).length,
        ];
        // Return if has zero slices and routes
        checkRemoteDone(null);

        // Add script
        loadDynamicScript(remote.url)
          .then(({ element }) => {
            // Add slices to object
            Object.keys(remote.slices).forEach(async (key: any, index2) => {
              const slice = remote.slices[key];

              // @ts-ignore
              if (window[remote.scope]) {
                // slices[key] = ( // @ts-ignore
                //   await window[remote.scope as any].get(slice)
                // )().default;

                slices[key] = (
                  await loadComponent(remote.scope, slice)()
                ).default;
              }
              sliceCount--;
              checkRemoteDone(element);
            });

            // Add routes to array
            Object.values(remote.routes).forEach(async (route: any, index3) => {
              if (window[remote.scope as any]) {
                // const routeModule = // @ts-ignore
                // (await window[remote.scope as any].get(route))().default;

                const routeModule = (await loadComponent(remote.scope, route)())
                  .default;
                routes.push(...routeModule);
              }
              routeCount--;
              checkRemoteDone(element);
            });
          })
          .catch(({ message }) => {
            console.warn(
              `Microfrontend at ${remote.url} is unreachable, make sure the service is running`
            );
            checkRemotesDone();
          });
      }
    );
  });
};

const fetchResource = () => {
  const microFrontendsPromise = loadMicroFrontends();
  return {
    getMicroFrontends: getSuspender(microFrontendsPromise),
  };
};

const resource = fetchResource();

export const LoadMicroFrontends = (props: any) => {
  const microfrontends = resource.getMicroFrontends.read();
  useEffect(() => {
    props.setMicroFrontends(microfrontends);
  }, [microfrontends, props]);
  return <>{props.children}</>;
};

export const MicroFrontendContext =
  //   createContext<MicrofrontendContextType | null>(null);
  createContext<any>(null);

export const MicroFrontendProvider: FC<ReactNode> | any = ({
  children,
}: any) => {
  const [microFrontends, setMicroFrontends] = useState<any>({
    slices: {},
    routes: [],
  });
  return (
    <React.Suspense
      fallback={
        <div
          style={{
            height: '100vh',
            width: '100vw',
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
          {/* <h5>Loading {props.scope}</h5> */}
        </div>
      }
    >
      <LoadMicroFrontends
        microFrontends={microFrontends}
        setMicroFrontends={setMicroFrontends}
      >
        <MicroFrontendContext.Provider
          value={{ microFrontends, setMicroFrontends }}
        >
          {children}
        </MicroFrontendContext.Provider>
      </LoadMicroFrontends>
    </React.Suspense>
  );
};

export default MicroFrontendProvider;
