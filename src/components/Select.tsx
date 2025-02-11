import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SelectDropDown = ({ setSelectedHook, selectedHook }) => {
  const handleChange = (event: SelectChangeEvent) => {
    setSelectedHook(event.target.value as string);
  };

  return (
    <Box sx={{ minWidth: 120, display: "flex", justifyContent: "center" }}>
      <FormControl sx={{ minWidth: 250 }}>
        <InputLabel id="demo-simple-select-label" className="!text-white">
          Hook type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedHook}
          label="Hook type"
          onChange={handleChange}
          sx={{
            color: "white",
            "& .MuiSvgIcon-root": { color: "white" }, // Makes the dropdown arrow white
            "& .MuiOutlinedInput-notchedOutline": { borderColor: "white" }, // Makes border white
          }}
          MenuProps={{
            PaperProps: {
              className: "!bg-gray-800 !text-white",
            },
          }}
        >
          <MenuItem value={"useQuote"}>useQuote</MenuItem>
          <MenuItem value={"useCachedQuoteSometimes"}>
            useCachedQuoteSometimes
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SelectDropDown;
