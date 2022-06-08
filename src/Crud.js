import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";

const Crud = () => {
  const theme = createTheme();
  const [inputData, setinputData] = useState({});
  const [arryData, setarryData] = useState([]);
  const [index, setIndex] = useState("");
  const [personName, setPersonName] = useState([]);
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
  ];

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "email", headerName: "email", width: 130 },
    { field: "firstName", headerName: "firstName", width: 130 },
    { field: "gender", headerName: "gender", width: 130 },
    { field: "personName", headerName: "personName", width: 500 },
    {
      field: "edit",
      headerName: "Edit",
      sortable: false,
      width: 130,

      disableClickEventBubbling: true,
      renderCell: (b) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handelEdit(b.id)}
            // startIcon={<EditIcon />}
          >
            Edit
          </Button>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      sortable: false,
      width: 130,

      disableClickEventBubbling: true,
      renderCell: (b) => {
        return (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handelDelet(b.id)}
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const handleSubmit = (event) => {
    setinputData({ ...inputData, [event.target.name]: event.target.value });
  };

  const handleClick = () => {
    const a = inputData;
    a.personName = personName;

    a.id = new Date().getTime();

    if (index === "") {
      setarryData([...arryData, a]);

   
    } else {
      
      const data = [...arryData];
      
      data[index] = a;

      setarryData([...data]);
    }
    setinputData({
      email: "",
      firstName: "",
      gender: "",
    });
    setPersonName([]);
  };

  const handelDelet = (i) => {
    let deleteData = arryData.filter((ele) => ele.id !== i);
    setarryData([...deleteData]);
  };

  const handelEdit = (id) => {
    let fdata = arryData.find((ele) => ele.id == id);
    let findex = arryData.findIndex((ele) => ele.id == id);
    console.log('fdata',fdata)
    setIndex(findex);
    setinputData(fdata);
    setPersonName(fdata?.personName)
   console.log("data",fdata);
    
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={(e) => handleSubmit(e)}
                value={inputData.email}
              />
              <TextField
                margin="normal"
                fullWidth
                onChange={(e) => handleSubmit(e)}
                name="firstName"
                value={inputData.firstName}
                label="firstName"
                id="firstName"
                //    label="firstName"
              />

              <FormControl>
                <RadioGroup>
                  <FormControlLabel
                    value="female"
                    onChange={(e) => handleSubmit(e)}
                    checked={inputData.gender === "female"}
                    name="gender"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    onChange={(e) => handleSubmit(e)}
                    checked={inputData.gender === "male"}
                    name="gender"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  PersonName
                </InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={personName}
                  onChange={(event) => handleChange(event)}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                  name="personName"
                >
                  {names.map((name) => (
                    <MenuItem key={name} value={name}>
                      <Checkbox checked={personName.indexOf(name) > -1} />
                      <ListItemText primary={name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={(e) => handleClick(e)}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={arryData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </>
  );
};
export default Crud;
