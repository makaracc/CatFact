import React from "react";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  StackProps,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import dog from "./dog";

const StyledStack = ({ sx, children, ...restProps }: StackProps) => (
  <Stack
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      ...sx,
    }}
    {...restProps}
  >
    {children}
  </Stack>
);

const pets = [
  "Cat",
  "Dog",
  "Fish",
  "Bird",
  "Rabbit",
  "Hamster",
  "Guinea Pig",
  "Other",
];

const App: React.FC = () => {
  const [catFact, setCatFact] = React.useState("");
  const [pet, setPet] = React.useState(pets[0]);
  const [catImg, setCatImg] = React.useState("");

  // Refresh to get Data
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

  const handlePetChange = (event: SelectChangeEvent) => {
    setPet(event.target.value as string);
  };

  const component = (
    <StyledStack>
      <StyledStack direction="row" gap={3} width="50%">
        <FormControl sx={{ width: "max(30%, 6.5em)" }}>
          <InputLabel id="pet-select-label">Pet</InputLabel>
          <Select
            labelId="pet-select-label"
            id="pet-select"
            value={pet}
            label="Pet"
            onChange={handlePetChange}
          >
            {pets.map((p) => (
              <MenuItem value={p}>{p}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained">Next Fact</Button>
      </StyledStack>
      <Typography sx={{ width: "80%", m: "1em" }} variant="h5">
        {catFact}
      </Typography>
      <img src={catImg} alt="catImg" width="80%" />
    </StyledStack>
  );
  return component;
};

export default App;
