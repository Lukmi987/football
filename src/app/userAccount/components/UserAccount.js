/*eslint-disable*/
import React, {useEffect, useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
// core components
import styles from "assets/jss/material-kit-react/views/componentsSections/downloadStyle.js";
import ProgressBar from "../../../ProgressBar";
import CardBody from "../../../components/Card/CardBody";
import CustomInput from "../../../components/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Email from "@material-ui/icons/Email";
import {storeProfileImgSaga} from "../actions";

const useStyles = makeStyles(styles);

export default function UserAccount({storeProfileImgSaga}) {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();
    const [error, setError] = useState(null);
    const [fileSize, setFileSize] = useState();
    const [fileInput, setFileInput] = useState();
    const [profileImgUrl, setProfileImgUrl] = useState();
    const types = ['image/png', 'image/jpeg'];
    const filterBySize = (file) => {
        //filter out images larger than 5MB
        return file.size <= 3332880 ;
    };

    useEffect(()=>{
        // storeProfileImg('urls');
        if(profileImgUrl){
            storeProfileImgSaga(profileImgUrl);
        }
        console.log('profile Img url', profileImgUrl);
    },[profileImgUrl])
console.log('set file', selectedFile);
    const fileSelectedHandler = (ev) => {
        let selected = ev.target.files[0];
        setFileSize('');

        if(!filterBySize(selected)){
            setFileSize('Obrazek musi byt mensi jak 3 MB!!!');
            return
        } else {
            setFileSize('');
        }
        if(selected && types.includes(selected.type)){
            setSelectedFile(selected);
            setError('');
        } else {
            setSelectedFile(null);
            setError('Please vyber obrazek ve formatu (png nebo jpeg)');
        }
    }

    return (
        <div className={classes.section}>
            <div className={classes.container}>
                <GridContainer className={classes.textCenter} justify="center">
                    <GridItem xs={12} sm={12} md={8}>
                        <h2>Vypln zakladni udaje o sobe</h2>

                    </GridItem>
                    <GridItem xs={12} sm={8} md={6}>
                        <h4>Nahraj profilovou fotku</h4>
                        <input
                            type="file"
                            onChange={fileSelectedHandler}
                            ref={(fileInput) => setFileInput(fileInput)}
                        />
                        {profileImgUrl &&
                        <div className="profileUrl">
                            <img width='230' height='280' src={profileImgUrl}/>
                        </div>
                        }
                        <div>
                            {fileSize && <div>{fileSize}</div>}
                            {error && <div className="error">{error}</div>}
                            {selectedFile && <div>{selectedFile.name}</div>}
                            {selectedFile && <ProgressBar file={selectedFile} collection='profile-images' setUrl={setProfileImgUrl} setFile={setSelectedFile}/>}
                        </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={8}>
                        <CardBody>
                            <CustomInput
                                labelText="Přezdívka..."
                                id="nickname"
                                handleInputChange = {()=> null}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "nickname",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Email className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <CustomInput
                                labelText="Rok narození..."
                                id="bDay"
                                handleInputChange = {()=> null}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "bDay",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Email className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <CustomInput
                                labelText="About me..."
                                id="AboutMe"
                                handleInputChange = {()=> null}
                                formControlProps={{
                                    fullWidth: true
                                }}
                                inputProps={{
                                    type: "AboutMe",
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <Email className={classes.inputIconsColor} />
                                        </InputAdornment>
                                    )
                                }}
                            />
                            </ CardBody>
                    </GridItem>
                </GridContainer>
                <br />
                <br />
                {/*<GridContainer className={classes.textCenter} justify="center">*/}
                {/*    <GridItem xs={12} sm={12} md={8}>*/}
                {/*        <h2>Want more?</h2>*/}
                {/*        <h4>*/}
                {/*            We{"'"}ve launched{" "}*/}
                {/*            <a*/}
                {/*                href="https://www.creative-tim.com/product/material-kit-pro-react?ref=mkr-download-section"*/}
                {/*                target="_blank"*/}
                {/*            >*/}
                {/*                Material Kit PRO React{" "}*/}
                {/*            </a>*/}
                {/*            .It has a huge number of components, sections and example pages.*/}
                {/*            Start Your Development With A Badass Material-UI nspired by*/}
                {/*            Material Design.*/}
                {/*        </h4>*/}
                {/*    </GridItem>*/}
                {/*    <GridItem xs={12} sm={8} md={6}>*/}
                {/*        <Button*/}
                {/*            color="rose"*/}
                {/*            size="lg"*/}
                {/*            href="https://www.creative-tim.com/product/material-kit-pro-react?ref=mkr-download-section"*/}
                {/*            target="_blank"*/}
                {/*        >*/}
                {/*            Material Kit PRO*/}
                {/*        </Button>*/}
                {/*        <Button*/}
                {/*            color="rose"*/}
                {/*            size="lg"*/}
                {/*            href="https://www.creative-tim.com/product/material-dashboard-pro-react?ref=mkr-download-section"*/}
                {/*            target="_blank"*/}
                {/*        >*/}
                {/*            Material Dashboard PRO*/}
                {/*        </Button>*/}
                {/*    </GridItem>*/}
                {/*</GridContainer>*/}
                {/*<div className={classes.textCenter + " " + classes.sharingArea}>*/}
                {/*    <GridContainer justify="center">*/}
                {/*        <h3>Thank you for supporting us!</h3>*/}
                {/*    </GridContainer>*/}
                {/*    <Button color="twitter">*/}
                {/*        <i className={classes.socials + " fab fa-twitter"} /> Tweet*/}
                {/*    </Button>*/}
                {/*    <Button color="facebook">*/}
                {/*        <i className={classes.socials + " fab fa-facebook-square"} /> Share*/}
                {/*    </Button>*/}
                {/*    <Button color="google">*/}
                {/*        <i className={classes.socials + " fab fa-google-plus-g"} />*/}
                {/*        Share*/}
                {/*    </Button>*/}
                {/*    <Button color="github">*/}
                {/*        <i className={classes.socials + " fab fa-github"} /> Star*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
}
