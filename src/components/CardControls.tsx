import { Box } from "@material-ui/core";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const CardControls = ({ currentStartIndex, handleLeftArrow, handleRightArrow }: { currentStartIndex: number, handleRightArrow: () => void, handleLeftArrow: () => void }) => {
  return (
    <Box display="flex" style={{ justifyContent: 'space-between', marginBottom: '50px'}}>
      <div>
        {currentStartIndex > 0 &&<ArrowBackIcon onClick={handleLeftArrow}/>}
      </div> 
      <ArrowForwardIcon onClick={handleRightArrow} />
    </Box>
  )
}

export default CardControls