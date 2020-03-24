/**
 * @jest-environment jsdom
 */

import React, { useState } from "react";
import SearchComponent from "./SearchComponent";
import DisplayComponent, { DataResponse } from "./DisplayComponent";
import { Container, Snackbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles({
  page: {
    padding: 16
  }
});

const App = () => {
  const classes = useStyles();

  const [dataList, setPackage] = useState<DataResponse>({} as DataResponse);
  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleClose = (
    event: React.SyntheticEvent<Element, Event>,
    reason: string
  ) => {
    setOpen(false);
  };

  const fetchNodePackage = async (name: string) => {
    try {
      const response = await fetch(`/api/packages/${name}`);
      if (response.status >= 300) {
        throw await response.json();
      }
      const formatResponse = await response.json();
      setPackage(formatResponse);
    } catch (error) {
      setError(error.message);
      setOpen(true);
    }
  };

  return (
    <Container className={classes.page}>
      <div className="App">
        <SearchComponent onSearch={fetchNodePackage} />
        <DisplayComponent displayList={dataList} />
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert severity="error">{error}</Alert>
        </Snackbar>
      </div>
    </Container>
  );
};

export default App;
