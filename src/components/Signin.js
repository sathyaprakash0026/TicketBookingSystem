import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { Formik } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { useHistory } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import AppBarplay from './Appbar';


export default function SignIn({ onSignIn }) {

  const [loadstatus, setLoadstatus] = React.useState(false);
  const history = useHistory();

  const handleSubmit = (values, { setErrors }) => {

    console.log(values, "values")


    const valuescheck = [
      {
        password: "Sample@001",
        username: "testid1"
      },
      {
        password: "Sample@002",
        username: "testid2"
      }
    ];

    const containsValuesToCheck = valuescheck.some(
      obj =>
        obj.password === values.password &&
        obj.username === values.username
    );

    if (containsValuesToCheck) {
      history.push("/TicketBook")
    } else {
      setErrors({
        'password': "Invalid login credentials. Try again."
      })
    }






  };
  const loginFormSchema = yup.object({
    username: yup.string()
      .required("Username is required"),

    password: yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character"
      ),
  });

  const [show, showPassword] = useState(false);
  const handleClickShowPassword = () => {
    showPassword(!show);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <>
      <div style={{ backgroundColor: '#f4f4f4', height: '100vh' }}>
        <AppBarplay></AppBarplay>
        <CssBaseline />
        <section className="section">
          <div className="box">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              justifyContent="center"
              style={{ minHeight: '80vh' }}

            >


              <Card
                sx={{ display: 'flex', boxShadow: 3, borderRadius: '16px', backgroundColor: 'white' }}
              >
                <Grid sx={12}>
                  <div style={{ margin: "3vh", height: "300px", width: "300px" }}>



                    <div style={{ justifyContent: "center", display: "flex" }} id="inform_signin">

                      <Typography component="h1" variant="h5" >
                        Log in
                      </Typography>


                    </div>
                    <Formik
                      validateOnChange={true}
                      validateOnBlur={false}
                      validationSchema={loginFormSchema}
                      onSubmit={handleSubmit}
                      initialValues={{}}
                    >
                      {({
                        handleSubmit,
                        handleChange,
                        handleBlur,
                        values,
                        touched,
                        isValid,
                        errors,
                      }) => (
                        <form
                          onSubmit={handleSubmit}
                          // className={classes.form}
                          noValidate
                        >
                          <br />

                          <TextField
                            name="username"
                            label="User Name"
                            touched={touched.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            fullWidth
                            variant="outlined"
                            error={errors.username}
                            helperText={errors.username ? errors.username : ""} />


                          <TextField
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                  >
                                    {show ? <Visibility /> : <VisibilityOff />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                            variant="outlined"
                            type={show ? "text" : "password"}
                            name="password"
                            label="Password"
                            margin="normal"
                            fullWidth
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            error={errors.password}
                            helperText={errors.password ? errors.password : ""} />


                          <Grid container justifyContent="center" style={{ paddingTop: "18px" }}>
                            {loadstatus ?

                              <CircularProgress /> :

                              <Button
                                type="submit"
                                size="medium"
                                variant="contained"
                                color="primary"
                                style={{ backgroundColor: "#31466B", color: "white" }}
                                onClick={handleSubmit}
                                disabled={loadstatus}

                                bold
                              >
                                Log in
                              </Button>
                            }

                          </Grid>

                        </form>
                      )}
                    </Formik>

                  </div>
                </Grid>
              </Card>

            </Grid>
          </div>
        </section>
      </div>
    </>
  );
}


