import React from "react";
import { Box, BoxProps } from "@mui/material";

const StyledBox = ({ children, ...restProps }: BoxProps) => (
  <Box sx={{ background: "red" }} {...restProps}>
    {children}
  </Box>
);

const App: React.FC = () => {
  const component = (
    <StyledBox sx={{ border: "1px solid black", width: 100, heigh: 100 }}>
      Hello ues
    </StyledBox>
  );
  return component;
};

export default App;
