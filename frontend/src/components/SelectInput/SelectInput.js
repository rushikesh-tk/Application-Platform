import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const getStyles = (name, propValue, theme) => {
  return {
    fontWeight:
      propValue.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
};

const SelectInput = (props) => {
  const { placeHolder, setPropValue, propValue, dropDownArray } = props;

  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPropValue(typeof value === "string" ? value.split(",") : value); // Will add multi selected values here in the state array
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-multiple-name-label">{placeHolder}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={propValue}
          onChange={handleChange}
          input={<OutlinedInput label={placeHolder} />}
          MenuProps={MenuProps}
          style={{
            textAlign: "start",
          }}
        >
          {dropDownArray?.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, propValue, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectInput;
