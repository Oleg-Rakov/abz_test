export const fetchErrorHandle = (message, setErrorSetter) => {
  if (message === 'Page not found') {
    setErrorSetter(true);
    return;
  }
}