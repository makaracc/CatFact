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

const pets = ["Cat", "Dog"];

const prevPet = localStorage.getItem("pet");

const App: React.FC = () => {
  const [petFact, setPetFact] = React.useState("");
  const [pet, setPet] = React.useState(prevPet ? prevPet : pets[0]);
  const [petImg, setPetImg] = React.useState("");
  const changeFact = React.useRef(() => {});

  changeFact.current = () => {
    switch (pet) {
      case "Cat":
        axios
          .get("https://catfact.ninja/fact")
          .then((res) => {
            setPetFact(res.data.fact);
          })
          .catch((err) => {
            console.error(err);
          });
        axios
          .get("https://api.thecatapi.com/v1/images/search")
          .then((res) => {
            setPetImg(res.data[0].url);
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      case "Dog":
        setPetFact(dog[Math.floor(Math.random() * 435)].fact);
        axios
          .get("https://dog.ceo/api/breeds/image/random")
          .then((res) => {
            setPetImg(res.data.message);
          })
          .catch((err) => {
            console.error(err);
          });
        break;
      default:
        break;
    }
  };

  React.useEffect(() => {
    changeFact.current();
    localStorage.setItem("pet", pet);
  }, [pet, changeFact, setPetFact, setPetImg]);

  const handlePetChange = (event: SelectChangeEvent) => {
    setPet(event.target.value as string);
  };

  const component = (
    <StyledStack marginY="3em">
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
              <MenuItem key={`select-${p}`} value={p}>
                {p}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={changeFact.current}>
          Next Fact
        </Button>
      </StyledStack>
      <Typography sx={{ width: "80%", m: "1em" }} variant="h5">
        {petFact}
      </Typography>
      <img src={petImg} alt="catImg" width="80%" />
    </StyledStack>
  );
  return component;
};

export default App;
