import './App.css';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "./config/axiosconfig";
import SelectDropdown from "./components/Select";
import { countries } from "./constants/countries";
function App() {

  //const [countries,setCountries] = useState([]);
  const [cities,setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [regions, setRegions] = useState([]);
  const [selectedcity, setSelectedCity] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (!selectedCountry || !selectedRegion) return;

    const options = {
      method: "GET",
      url: `v1/geo/countries/${selectedCountry}/regions/${selectedRegion}/cities`,
      params: { limit: 10 },
    };

    try {
      axios.request(options).then((response) => setCities(response.data.data));
      setError(null);
    } catch (error) {
      setCities([]);
      setError("Error fetching Cities. Please try again later.");
    }
  }, [selectedRegion, selectedCountry]);

  useEffect(() => {
    if (!selectedCountry) return;
    const options = {
      method: "GET",
      url: `v1/geo/countries/${selectedCountry}/regions`,
      params: { limit: 10 },
    };

    try {
      axios.request(options).then((response) => setRegions(response.data.data));
      setError(null);
    } catch (error) {
      setRegions([]);
      setError("Error fetching regions. Please try again later.");
    }
  }, [selectedCountry]);


  // useEffect(()=>{

  //   const options={
  //     method: "GET",
  //     url: 'v1/geo/countries',
  //     params:{limit:10}
  //   }

  //   try{
  //     axios.request(options).then((response)=>setCountries(response));
  //   }catch(error){
  //     setError(error);
  //   }

  // },[]);
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

  const handleChange = (type,data)=>{
    if(type === "country"){
      setSelectedCountry(data);
      setSelectedRegion(null);
      setSelectedCity(null);
      setRegions([]);
      setCities([]);
    }
    if (type === "region") {
      setSelectedRegion(data);
      setSelectedCity(null);
      setCities([]);
    }
    if (type === "city") {
      setSelectedCity(data);
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
      />

      <h4>Regions</h4>
        <SelectDropdown
          data={regionsData}
          type="region"
          handleChange={handleChange}
        />

      <h4>Cities</h4>
        <SelectDropdown
          data={citiesData}
          handleChange={handleChange}
          type="city"
        />

        {selectedcity && <h5>City that selected : {selectedcity}</h5>}
      </Stack>
      {error && <p>{error}</p>}
    </Box>
  );
}

export default App;
