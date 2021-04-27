import { Box } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const CardControls = ({ dataSetSize, currentStartIndex, handleLeftArrow, handleRightArrow }: { dataSetSize: number, currentStartIndex: number, handleRightArrow: () => void, handleLeftArrow: () => void }) => {
  return (
    <Box display="flex" style={{ justifyContent: 'space-between', marginBottom: '50px'}}>
      <div>
        {currentStartIndex > 0 &&<ArrowBackIcon data-testid="left-arrow" onClick={handleLeftArrow}/>}
      </div> 
      {(currentStartIndex !== dataSetSize - 2) && <ArrowForwardIcon data-testid="right-arrow" onClick={handleRightArrow} />}
    </Box>
  )
}

export default CardControls