import React from "react";
import { Stack, StackProps, Typography } from "@mui/material";
import axios from "axios";

const StyledStack = ({ children, ...restProps }: StackProps) => (
  <Stack
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
    {...restProps}
  >
    {children}
  </Stack>
);

const App: React.FC = () => {
  const [catFact, setCatFact] = React.useState("");
  const [catImg, setCatImg] = React.useState("");

  React.useEffect(() => {
    axios.get("https://catfact.ninja/fact").then((res) => {
      setCatFact(res.data.fact);
    });
  }, []);
  React.useEffect(() => {
    axios.get("https://api.thecatapi.com/v1/images/search").then((res) => {
      setCatImg(res.data[0].url);
    });
  }, []);

  const component = (
    <StyledStack>
      <Typography variant="h5">{catFact}</Typography>
      <img src={catImg} alt="catImg" />
    </StyledStack>
  );
  return component;
};

export default App;
