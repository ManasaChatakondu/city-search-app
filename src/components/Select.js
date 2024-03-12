import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


function SearchForm({ data, type, handleChange, name }) {
    return (
        <>
            <Autocomplete
                id="country-select-demo"
                sx={{ width: 300 }}
                options={data}
                onChange={(_, value) => handleChange(type, value?.code, value?.name)}
                autoHighlight
                renderOption={(props, option) => (
                    <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props}>
                        {type === "country" && (
                            <img
                                loading="lazy"
                                width="20"
                                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                                alt=""
                            />
                        )}
                        {option.name} ({option.code})
                    </Box>
                )}

                renderInput={(params) =>
                    <TextField {...params} label={`Choose a ${type}`} inputProps={{
                        ...params.inputProps,
                        autoComplete: "",
                    }}
                    />
                }
                getOptionLabel={(option) => option.name}
                value={name ? data.find(option => option.name === name) : null}
                isOptionEqualToValue={(option, value) => option.value === value.value}
            />
        </>
    );
}

export default SearchForm;