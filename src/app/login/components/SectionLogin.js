import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Check from "@material-ui/icons/Check";
// @material-ui/icons
import Email from "@material-ui/icons/Email";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import SnackbarContent from "components/Snackbar/SnackbarContent.js";
import styles from "assets/jss/material-kit-react/views/componentsSections/loginStyle.js";
import Header from "../../../components/Header/Header";
import HeaderLinks from "../../../components/Header/HeaderLinks";


const useStyles = makeStyles(styles);

export default function SectionLogin({ idToken, processLoginForm, history, errorMsg}) {
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [validated, setValidated] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const [isPwdMinLength, setPwdMinLegth] = useState(false);
  const [errorAlert, setErrorAlert] = useState(null);

  useEffect(()=>{
        console.log('jo muj erorr',errorMsg,idToken);
        setErrorAlert(errorMsg);
        //history.push('/','successLogin');
  if(idToken) {
     history.push('/','successLogin');
    console.log('jo existuje id token');
  }
    },[errorMsg,idToken])

  const composeFormData = () => ({
    email,
    pwd,
    isSignup,
  });

  const handleInputChange = e => {
    const id = e.target.id;
    const value = e.target.value;
    if(id === 'email') setEmail(value);
    if(id === 'pwd') {
      if(value.length >= 6){
      setPwd(value);
      setPwdMinLegth(true);
      } else {
        setPwdMinLegth(false);
      }
    } 
  }

  const handleSubmit = () => {
    if(isPwdMinLength){
      processLoginForm(composeFormData())
      setErrorAlert(null);
    }else {
      setErrorAlert('Heslo musi mit min 6 znaku!!!');
    }
  }

  const switchAuthTypeHandler = () => isSignup ? setIsSignup(false) : setIsSignup(true);

  const classes = useStyles();
  return (
<div>
  <Header
      brand="Login Page"
      rightLinks={<HeaderLinks />}
      fixed
      color="white"
  />
    <div className={classes.section}>
      <div className={classes.container}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={4}>
            {errorAlert && 
              <SnackbarContent
                message={
                  <span>
                    <b>Chyba:</b> {errorAlert}
                  </span>
                }
                close
                color="warning"
                icon={Check}
              />
            }
            <Card>
              <form className={classes.form}>
                <CardHeader color="primary" className={classes.cardHeader}>
                  {isSignup ? (<h4>Registrace</h4>) : (<h4>Prihlaseni</h4>)}
                  <div className={classes.socialLine}>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                    >
                      <i className={classes.socialIcons + " fab fa-twitter"} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                    >
                      <i className={classes.socialIcons + " fab fa-facebook"} />
                    </Button>
                    <Button
                      justIcon
                      href="#pablo"
                      target="_blank"
                      color="transparent"
                      onClick={e => e.preventDefault()}
                    >
                      <i
                        className={
                          classes.socialIcons + " fab fa-google-plus-g"
                        }
                      />
                    </Button>
                  </div>
                </CardHeader>
                <p className={classes.divider}>Or Be Classical</p>
                <CardBody>
                  <CustomInput
                    labelText="Email..."
                    id="email"
                    handleInputChange = {handleInputChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "email",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Email className={classes.inputIconsColor} />
                        </InputAdornment>
                      )
                    }}
                  />
                  <CustomInput
                    labelText="Password"
                    id="pwd"
                    handleInputChange = {handleInputChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      endAdornment: (
                        <InputAdornment position="end">
                          <Icon className={classes.inputIconsColor}>
                            lock_outline
                          </Icon>
                        </InputAdornment>
                      ),
                      autoComplete: "off"
                    }}
                  />
                </CardBody>
                <CardFooter className={classes.cardFooter}>
                  <Button simple color="primary" size="medium" onClick={switchAuthTypeHandler}>
                    Prejdi na {isSignup ? 'Prihlasit se' : 'Registraci'}
                  </Button>
                  <Button simple color="primary" size="lg" onClick={handleSubmit}>
                    Submit
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
</div>
  );
}
