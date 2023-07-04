const setLocalStorage = (label: string, data: any) => {
  sessionStorage.setItem(label, JSON.stringify(data));
};

const getLocalStorage = (label: string): any => {
  return JSON.parse(sessionStorage.getItem(label) || '{}');
};

const removeItem = (label: string) => {
  sessionStorage.removeItem(label);
};

const clearLocalStorage = () => {
  sessionStorage.clear();
};

export { setLocalStorage, getLocalStorage, removeItem, clearLocalStorage };
