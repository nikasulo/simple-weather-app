import { MouseEvent } from "react";
import { useSelector } from "react-redux";
import cx from "classnames";

import { TemperatureUnit, Weather } from "types";

import { useResponsiveChecks } from "hooks";
import {
  convertTemperature,
  convertEpochToDate,
  getResponsiveCardWidths,
} from "utils";

import WbSunnyRoundedIcon from "@material-ui/icons/WbSunnyRounded";
import FlareRoundedIcon from "@material-ui/icons/FlareRounded";
import Brightness3RoundedIcon from "@material-ui/icons/Brightness3Rounded";

import { blue, yellow } from "@material-ui/core/colors";
import { grey } from "@material-ui/core/colors";
import {
  Card,
  CardContent,
  createStyles,
  Box,
  Typography,
  withStyles,
  SvgIconTypeMap,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";

const styles = () =>
  createStyles({
    weatherHolder: {
      display: "flex",
      flexFlow: "row",
      alignItems: "left",
      justifyContent: "space-between",
      textAlign: "center",
    },

    weatherCard: {
      padding: "10px",
      width: "32%",
      boxSizing: "border-box",
      "&:hover": {
        cursor: "pointer",
      },
    },

    weatherCardsContainer: {
      display: "flex",
      flexFlow: "row nowrap",
      justifyContent: "center",
    },

    dayInformation: {
      backgroundColor: blue[100],
      maxWidth: "90px",
      borderRadius: 4,
      display: "flex",
      margin: 0,
      marginTop: "50px",
      paddingBottom: 0,
      justifyContent: "center",
      alignItems: "center",
    },

    selected: {
      backgroundColor: grey[50],
    },
  });

interface Props {
  data: Weather;
  classes: { [key: string]: string };
  onClick: (e: MouseEvent<HTMLDivElement>) => void;
  selected: boolean;
}

const TimeOfDayData = ({
  Icon,
  color,
  timeOfDay,
  temperatureUnit,
  temp,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  color: string;
  timeOfDay: string;
  temperatureUnit: TemperatureUnit;
  temp: number;
}) => {
  return (
    <Box>
      <Icon style={{ color }} />
      <Typography>{timeOfDay}</Typography>
      <Typography>{convertTemperature(temperatureUnit, temp)}</Typography>
    </Box>
  );
};

const WeatherCard = ({ data, classes, onClick, selected }: Props) => {
  const { phoneScreens, tabletScreens } = useResponsiveChecks();
  const temperatureUnit = useSelector(
    (state: any) => state.temperatureUnit.unit
  );

  return (
    <Card
      onClick={onClick}
      key={data.dt}
      className={cx(classes.weatherCard, { [classes.selected]: selected })}
      style={{ width: getResponsiveCardWidths(phoneScreens, tabletScreens) }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column">
          <Box className={classes.weatherHolder}>
            <TimeOfDayData
              timeOfDay={"Morning"}
              color={yellow[500]}
              Icon={WbSunnyRoundedIcon}
              temp={data.temp.morn}
              temperatureUnit={temperatureUnit}
            />
            <TimeOfDayData
              timeOfDay={"Afternoon"}
              color={yellow[800]}
              Icon={FlareRoundedIcon}
              temp={data.temp.day}
              temperatureUnit={temperatureUnit}
            />
            <TimeOfDayData
              timeOfDay={"Night"}
              color={grey[600]}
              Icon={Brightness3RoundedIcon}
              temp={data.temp.night}
              temperatureUnit={temperatureUnit}
            />
          </Box>
          <Box className={classes.dayInformation}>
            <Typography>{convertEpochToDate(data.dt)}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default withStyles(styles)(WeatherCard);
