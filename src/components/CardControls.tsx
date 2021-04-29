import { Box, Container } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

const CardControls = ({
  dataSetSize,
  currentStartIndex,
  handleLeftArrow,
  handleRightArrow,
  upperLimit
}: {
  dataSetSize: number;
  currentStartIndex: number;
  handleRightArrow: () => void;
  handleLeftArrow: () => void;
  upperLimit: number
}) => {
  return (
    <Box
      display="flex"
      style={{ justifyContent: "space-between", marginBottom: "50px" }}
    >
      <Container style={{padding: 0}}>
        {currentStartIndex > 0 && (
          <ArrowBackIcon data-testid="left-arrow" onClick={handleLeftArrow} />
        )}
      </Container>
      {(currentStartIndex + upperLimit < dataSetSize) && (
        <ArrowForwardIcon
          data-testid="right-arrow"
          onClick={handleRightArrow}
        />
      )}
    </Box>
  );
};

export default CardControls;