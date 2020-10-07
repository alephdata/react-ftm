export interface IEmbeddedElementConfig {
  writeable?: boolean
  containerProps?: any
}

export interface IEmbeddedElementProps {
  data: any
  config?: IEmbeddedElementConfig
}

export const fetchExternalData = (dataURL: string) => {
  return new Promise((resolve, reject) => {
    fetch(dataURL)
      .then(response => response.json())
      .then(json => resolve(json))
      .catch(error => reject(error));
  })
}

export const fetchLocalData = () => {
  const storedData = localStorage.getItem('storedGraphData');
  return storedData && JSON.parse(storedData);
}
