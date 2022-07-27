import { createContext, useEffect, useState } from 'react';
import { apiSrv } from '../../services';

const GlobalStatesContext = createContext({
  currencies: [],
});

const GlobalStatesContextProvider = ({
  children,
}: {
  children:
    | JSX.Element
    | JSX.Element[]
    | boolean
    | (JSX.Element | boolean)[];
}) => {
  const [globalStates, setGlobalStates] = useState({
    currencies: [],
  });

  const handleGetCurrencies = async () => {
    const currencies = await apiSrv.get({
      url: 'data/exchange-rates-symbols',
    });

    setGlobalStates({
      ...globalStates,
      currencies,
    });
  };

  useEffect(() => {
    handleGetCurrencies();
  }, []);

  return (
    <GlobalStatesContext.Provider value={globalStates}>
      {children}
    </GlobalStatesContext.Provider>
  );
};

export { GlobalStatesContext, GlobalStatesContextProvider };