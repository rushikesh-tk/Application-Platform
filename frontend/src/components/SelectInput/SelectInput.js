import * as React from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { capitalizeWords } from "../../utils/utils";

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
      typeof propValue == Array
        ? propValue.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium
        : propValue,
  };
};

const SelectInput = (props) => {
  const {
    placeHolder,
    setPropValue,
    propValue,
    typeName,
    dropDownArray,
    isMultiple,
  } = props;

  const [typeNameValue, setTypeNameValue] = React.useState(typeName);
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setPropValue((prevFilters) => ({
      ...prevFilters,
      [typeNameValue]: typeof value === "string" ? value?.split(",") : value, // Will add multi selected values here in the state array
    }));
  };

  return (
    <div>
      {typeName === "companyName" ? (
        <TextField
          id="outlined-basic"
          label={placeHolder}
          variant="outlined"
          style={{ marginLeft: 8, marginTop: -10 }}
          onChange={(event) => handleChange(event)}
        />
      ) : (
        <FormControl sx={{ m: 1, minWidth: 300 }}>
          <InputLabel id="demo-multiple-name-label">{placeHolder}</InputLabel>
          <Select
            labelId="demo-multiple-name-label"
            id="demo-multiple-name"
            multiple={isMultiple}
            value={propValue[typeName]}
            onChange={(event) => handleChange(event)}
            input={<OutlinedInput label={placeHolder} />}
            MenuProps={MenuProps}
            style={{
              textAlign: "start",
              marginBottom: 10,
            }}
          >
            {dropDownArray?.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, propValue[typeName], theme)}
              >
                {typeof name == "string" ? (
                  capitalizeWords(name)
                ) : typeof name == "number" ? (
                  typeName == "minExperience" ? (
                    <div>{name}</div>
                  ) : (
                    <div>{name} LPA</div>
                  )
                ) : (
                  name
                )}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
};

export default SelectInput;
