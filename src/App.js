import './App.css';
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import axios from "./config/axiosconfig";
import SelectDropDown from "./components/Select";

function App() {

  const [countries,setCountries] = useState([]);
  const [cities,setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedcity, setSelectedCity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{

    const options={
      method: "GET",
      url: 'v1/geo/countries',
      params:{limit:20}
    }

    try{
      axios.request(options).then((response)=>setCountries(response));
    }catch(error){
      setError(error);
    }

  },[]);

  const handleChange = (data,type)=>{
    if(type === "country"){
      setSelectedCountry(data);
    }
  }

  return (
    <Box display="flex" justifyContent="center">
      <Stack mt={2}>
      <h1>City Search App</h1>
      <h4>Countries</h4>

      <SelectDropDown 
        data={countries}
        type="country"
        handleChange={handleChange}
      />

      </Stack>
    </Box>
  );
}

export default App;
