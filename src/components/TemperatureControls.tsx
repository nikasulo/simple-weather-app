import { ChangeEvent } from "react";
import { setTemperatureUnit } from "redux/actions";
import { useDispatch, useSelector } from "react-redux";

import { TemperatureUnit } from "types";

import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Box,
  Radio,
} from "@material-ui/core";

const TemperatureControls = () => {
  const temperatureUnit = useSelector(
    (state: any) => state.temperatureUnit.unit
  );
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setTemperatureUnit(e.target.value as TemperatureUnit));
  };

  return (
    <FormControl style={{ display: "flex", marginBottom: "50px" }}>
      <RadioGroup
        aria-label="temperature-unit"
        name="temperature-unit"
        value={temperatureUnit}
        onChange={handleChange}
      >
        <Box display="flex" style={{ justifyContent: "space-between" }}>
          <FormControlLabel
            value={TemperatureUnit.C}
            control={<Radio />}
            label={TemperatureUnit.C}
          />
          <FormControlLabel
            value={TemperatureUnit.F}
            control={<Radio />}
            label={TemperatureUnit.F}
            style={{ margin: 0 }}
          />
        </Box>
      </RadioGroup>
    </FormControl>
  );
};

export default TemperatureControls;
