interface IMicrofrontends {
  showHeader: boolean;
}

type MicrofrontendContextType = {
  microFrontends: IMicrofrontends;
  setMicroFrontends: (microFrontends: IMicrofrontends) => void;
};
