import { useResponsiveChecks } from "hooks";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "types";

export interface useAppObject {
  currentStartIndex: number;
  selectedIndex: number;
  upperLimitOfCards: number;
  handleRightArrow: () => void;
  handleLeftArrow: () => void;
  setUpperLimitOfCards: React.Dispatch<React.SetStateAction<number>>;
  setSelectedIndex: React.Dispatch<number>;
  handleCardSelection: (index: number) => void;
  loading: boolean;
  phoneScreens: boolean;
}

export const useApp = (weatherDataLength: number) => {
  const [upperLimitOfCards, setUpperLimitOfCards] = useState(3);
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { phoneScreens, tabletScreens } = useResponsiveChecks();
  const loading = useSelector((state: State) => state.weatherData.loading);

  const handleCardSelection = (index: number) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    setCurrentStartIndex(0);

    if (phoneScreens) {
      setUpperLimitOfCards(1);
    } else if (tabletScreens) {
      setUpperLimitOfCards(2);
    } else {
      setUpperLimitOfCards(3);
    }
  }, [phoneScreens, tabletScreens, loading, upperLimitOfCards, weatherDataLength]);

  const handleRightArrow = () => {
    if (currentStartIndex + upperLimitOfCards >= weatherDataLength) return;
    setCurrentStartIndex((prev) => prev + 1);
  };

  const handleLeftArrow = () => {
    if (currentStartIndex <= 0) return;
    setCurrentStartIndex((prev) => prev - 1);
  };

  return {
    currentStartIndex,
    selectedIndex,
    upperLimitOfCards,
    handleRightArrow,
    handleLeftArrow,
    setUpperLimitOfCards,
    setSelectedIndex,
    handleCardSelection,
    phoneScreens,
    loading,
  };
};
