const loadDynamicScript = (
  url: string
): Promise<{ message: string; element: HTMLScriptElement }> => {
  return new Promise((resolve, reject) => {
    const element = document.createElement('script');

    element.src = url;
    element.type = 'text/javascript';
    element.async = true;

    element.onload = async () => {
    
      resolve({
        message: 'Dynamic script added successfully',
        element,
      });
    };

    element.onerror = () => {
    
      reject({ message: `Dynamic Script Error: ${url}`, element });
    };

    document.head.appendChild(element);
  });
};

export default loadDynamicScript;
