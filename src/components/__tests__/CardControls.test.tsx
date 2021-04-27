import {render, screen, waitFor} from 'test/utils'
import CardControls from 'components/CardControls'
import userEvent from '@testing-library/user-event';

describe('Card controls', () => {
  it('renders without crashing', () => {
    const handleRightArrow = jest.fn()
    const handleLeftArrow = jest.fn()
    render(
      <CardControls 
        dataSetSize={9} 
        currentStartIndex={0} 
        handleRightArrow={handleRightArrow} 
        handleLeftArrow={handleLeftArrow}
      />, {}
    )
  })

  describe('arrow buttons', () => {
    it('hides right arrow if there is no weather cards to its left', async() => {
      const handleRightArrow = jest.fn()
      const handleLeftArrow = jest.fn()
      render(
        <CardControls 
          dataSetSize={9} 
          currentStartIndex={7} 
          handleRightArrow={handleRightArrow} 
          handleLeftArrow={handleLeftArrow}
        />, {}
      )
  
      const rigthArrow = screen.queryByTestId('right-arrow')
  
      expect(rigthArrow).toBe(null)
    })

    it('hides left arrow if there is no weather cards to its left', () => {
      const handleRightArrow = jest.fn()
      const handleLeftArrow = jest.fn()
      render(
        <CardControls 
          dataSetSize={9} 
          currentStartIndex={0} 
          handleRightArrow={handleRightArrow} 
          handleLeftArrow={handleLeftArrow}
        />, {}
      )
  
      const leftArrow = screen.queryByTestId('left-arrow')
  
      expect(leftArrow).toBe(null)
    })

    it('shows left arrow if there are weather cards to its left', () => {
      const handleRightArrow = jest.fn()
      const handleLeftArrow = jest.fn()
      render(
        <CardControls 
          dataSetSize={9} 
          currentStartIndex={3} 
          handleRightArrow={handleRightArrow} 
          handleLeftArrow={handleLeftArrow}
        />, {}
      )
  
      const leftArrow = screen.getByTestId('left-arrow')
  
      expect(leftArrow).toBeDefined()
    })

    it('shows right arrow if there are weather cards to its left', () => {
      const handleRightArrow = jest.fn()
      const handleLeftArrow = jest.fn()
      render(
        <CardControls 
          dataSetSize={9} 
          currentStartIndex={3} 
          handleRightArrow={handleRightArrow} 
          handleLeftArrow={handleLeftArrow}
        />, {}
      )
  
      const rightArrow = screen.getByTestId('right-arrow')
  
      expect(rightArrow).toBeDefined()
    })

    it('clicking the right arrow fires the onClick handler', () => {
      const handleRightArrow = jest.fn()
      const handleLeftArrow = jest.fn()
      render(
        <CardControls 
          dataSetSize={9} 
          currentStartIndex={3} 
          handleRightArrow={handleRightArrow} 
          handleLeftArrow={handleLeftArrow}
        />, {}
      )
  
      const rightArrow = screen.getByTestId('right-arrow')
      const leftClick = {button: 0}
      userEvent.click(rightArrow, leftClick)
      expect(handleRightArrow).toHaveBeenCalled()
    })

    it('clicking the left arrow fires the onClick handler', () => {
      const handleRightArrow = jest.fn()
      const handleLeftArrow = jest.fn()
      render(
        <CardControls 
          dataSetSize={9} 
          currentStartIndex={3} 
          handleRightArrow={handleRightArrow} 
          handleLeftArrow={handleLeftArrow}
        />, {}
      )
  
      const leftArrow = screen.getByTestId('left-arrow')
      const leftClick = {button: 0}
      userEvent.click(leftArrow, leftClick)
      expect(handleLeftArrow).toHaveBeenCalled()
    })
  })
})