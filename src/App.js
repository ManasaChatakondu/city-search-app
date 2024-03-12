import './App.css';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "./config/axiosconfig";
import SelectDropdown from "./components/Select";
//import { countries } from "./constants/countries";

function App() {

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryName, setSelectedCountryName] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedcity, setSelectedCity] = useState(null);
  const [selectedcityName, setSelectedCityName] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegionName, setSelectedRegionName] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!selectedCountry || !selectedRegion) return;

    const options = {
      method: "GET",
      url: `v1/geo/countries/${selectedCountry}/regions/${selectedRegion}/cities`,
      params: { limit: 10 },
    };

    const fetchCities = async () => {
      try {
        await axios.request(options).then((response) => setCities(response.data.data));
        setError(null);
      } catch (error) {
        setCities([]);
        setError("Error fetching Cities. Please try again later.");
      }
    }
    fetchCities();
  }, [selectedRegion, selectedCountry]);


  useEffect(() => {
    if (!selectedCountry) return;
    const options = {
      method: "GET",
      url: `v1/geo/countries/${selectedCountry}/regions`,
      params: { limit: 10 },
    };

    const fetchRegions = async () => {
      try {
        await axios.request(options).then((response) => setRegions(response.data.data));
        setError(null);
      } catch (error) {
        setRegions([]);
        setError("Error fetching regions. Please try again later.");
      }
    }
    fetchRegions();
  }, [selectedCountry]);


  useEffect(() => {

    const options = {
      method: "GET",
      url: `v1/geo/countries`,
      params: { limit: 10 }
    }

    const fetchCountries = async () => {
      try {
        await axios.request(options).then((response) => setCountries(response.data.data));
      } catch (error) {
        setError("Error fetching countries.Please try again later.");
      }
    }
    fetchCountries();
  }, []);

  const regionsData =
    regions?.map(({ isoCode, name }) => ({
      code: isoCode,
      name,
    })) || [];

  const citiesData =
    cities?.map(({ city, name }) => ({
      code: city,
      name,
    })) || [];

  const resetRegionFilter = () => {
    setSelectedRegionName(null);
    setSelectedRegion(null);
    setRegions([]);
  };

  const resetCityFilter = () => {
    setSelectedCityName(null);
    setSelectedCity(null);
    setCities([]);
  };

  const handleChange = (type, code, name) => {
    if (type === "country") {
      setSelectedCountry(code);
      setSelectedCountryName(name);
      resetRegionFilter();
      resetCityFilter();
    }
    if (type === "region") {
      setSelectedRegion(code);
      setSelectedRegionName(name);
      resetCityFilter();
    }
    if (type === "city") {
      setSelectedCity(code);
      setSelectedCityName(name);
    }
  }


  return (
    <Box display="flex" justifyContent="center">
      <Stack mt={2}>
        <h1>City Search App</h1>
        <h4>Countries</h4>

        <SelectDropdown
          data={countries}
          type="country"
          handleChange={handleChange}
          name={selectedCountryName}
        />

        <h4>Regions</h4>
        <SelectDropdown
          data={regionsData}
          type="region"
          handleChange={handleChange}
          name={selectedRegionName}
        />

        <h4>Cities</h4>
        <SelectDropdown
          data={citiesData}
          handleChange={handleChange}
          type="city"
          name={selectedcityName}
        />

        {selectedcity && <h5>Selected City : {selectedcity}</h5>}
      </Stack>
      {error && <p>{error}</p>}
    </Box>
  );
}

export default App;
