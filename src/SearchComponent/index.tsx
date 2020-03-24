import React, { FC, useState } from "react";
import { TextField, Button, Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  heading: {
    paddingBottom: 16
  },
  textField: {
    paddingRight: 8
  }
});

interface Props {
  onSearch: (name: string) => void;
}
const SearchComponent: FC<Props> = ({ onSearch }) => {
  const classes = useStyles();
  const [name, setName] = useState<string>("");

  const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <Container>
      <Box className={classes.heading}>Enter your package name here</Box>
      <Box>
        <form
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            onSearch(name);
          }}
        >
          <TextField
            id="outlined-basic"
            size="small"
            variant="outlined"
            name="name"
            value={name}
            onChange={handleChangeForm}
            className={classes.textField}
          />
          <Button variant="contained" type="submit">
            Search
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SearchComponent;
