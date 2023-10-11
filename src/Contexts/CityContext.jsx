import { createContext, useContext, useEffect, useRef, useState } from "react";
const CityContext = createContext();
const Apikey = "http://localhost:9000/cities";

function CityProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLodaing] = useState(true);

  useEffect(function () {
    setIsLodaing(true);
    fetch(Apikey)
      .then((res) => res.json())
      .then((data) => {
        setCities(data);
        setIsLodaing(false);
      })
      .catch((err) => err);
  }, []);
  const activeCityid = useRef(null);

  return (
    <CityContext.Provider value={{ cities, isLoading, activeCityid }}>
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined) throw new Error(" City context use out of cities");
  return context;
}
export { CityProvider, useCity };
