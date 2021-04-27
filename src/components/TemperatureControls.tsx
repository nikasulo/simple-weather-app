import { RadioGroup, FormControl, FormControlLabel } from '@material-ui/core';
import { setTemperatureUnit } from 'redux/actions';
import { Box, Radio } from '@material-ui/core';
import { TemperatureUnit } from 'types';
import { useDispatch, useSelector } from 'react-redux';

const TemperatureControls = () => {
  const temperatureUnit = useSelector((state: any) => state.temperatureUnit.unit)
  const dispatch = useDispatch()

  return (
    <FormControl style={{display: 'flex', marginBottom: '50px'}}>
        <RadioGroup aria-label="temperature-unit" name="temperature-unit" value={temperatureUnit} onChange={(e) => dispatch(setTemperatureUnit(e.target.value as TemperatureUnit))}>
        <Box display="flex" style={{ justifyContent: 'space-between'}}>
            <FormControlLabel value={TemperatureUnit.C} control={<Radio />} label={TemperatureUnit.C} />
            <FormControlLabel value={TemperatureUnit.F} control={<Radio />} label={TemperatureUnit.F} />
        </Box>
        </RadioGroup>
      </FormControl>
  )
}

export default TemperatureControls