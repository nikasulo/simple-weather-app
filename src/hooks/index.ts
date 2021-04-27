import { useMediaQuery } from "@material-ui/core";

export const useResponsiveChecks = () => {
  const phoneScreens = useMediaQuery('(max-width:520px)');
  const tabletScreens = useMediaQuery('(max-width:800px)');

  return {
    phoneScreens,
    tabletScreens
  }
}