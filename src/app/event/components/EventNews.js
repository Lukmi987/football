import React, { useEffect, useRef, useState } from 'react';
import parse from 'html-react-parser';
import Button from '../../../components/CustomButtons/Button';
import GridContainer from '../../../components/Grid/GridContainer';
import classNames from 'classnames';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Snackbar } from '@material-ui/core';
import Spinner from '../../Spinner';
import { ContentState, convertToRaw } from 'draft-js';
import { EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { convertToHTML } from 'draft-convert';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DOMPurify from 'dompurify';


export default function EventNews ({fetchNews, saveNews, loadingStatus, eventStatus, eventNews}) {
  const [disableEditable, setDisableEditable] = useState(true);
  const [cabinNews, setCabinNews] = useState();
  const [trainingEval, setTrainingEval] = useState();
  const [editorState, setEditorState] = useState(
    () => EditorState.createEmpty(),
  );
  const  [convertedContent, setConvertedContent] = useState(null);


  useEffect(()=> {
    fetchNews();
  },[])

  useEffect(() => {
   if(eventNews?.blocks?.length) {
     // console.log('eventNews?.blocks',eventNews?.blocks)
      // const justin = JSON.parse(eventNews.blocks)
      //   console.log('justin',justin)
    }
  }, [eventNews])













  console.log('to the left',eventNews)
  // useEffect(()=> {
  //   console.log('jsem ve setru na id if !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  //   if(eventNews?.cabinNews && eventNews?.trainingEval){
  //     console.log('jsem ve stteru volellekjdfsk jdksj ');
  //     setCabinNews(eventNews.cabinNews);
  //     setTrainingEval(eventNews.trainingEval)
  //   }
  // }, [eventNews]);


  console.log('editorState',editorState);

const handleNews = (ev) => {
  if(ev.target.id === 'cabinNews') {setCabinNews(ev.target.value);}
  if(ev.target.id === 'trainingEval') {setTrainingEval(ev.target.value);}
}

const handleSubmit = () => {
  saveNews(convertContentToJson());
}


// returns an object with the sanitized HTML
const createMarkup = (html) => ({__html: DOMPurify.sanitize(html)})

const handleEditorChange = (state) => {
  setEditorState(state);
  convertContentToHTML();
  }

  const convertContentToJson = () => {
    const rawContentState =  convertToRaw(editorState.getCurrentContent());
    console.log('rowContent1111',rawContentState);
    console.log('JSON.stringify(rawContentState)',JSON.stringify(rawContentState));
    return JSON.stringify(rawContentState);
  }



  const convertContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  }

const handleEditor = () => {
  console.log('moje ev ',editorState)

}

  return (
    <GridContainer justify="left">
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'top',
        }}
        open={loadingStatus.success}
        autoHideDuration={3000}
        onClose={() => setTimeout(eventStatus, 3000)}
        message={loadingStatus.error || "!!!Uspesne ulozeno"}
      />
      <div className="cabin-news-editable">
        <div>
          <Button color={disableEditable ? 'warning' : 'success' }  onClick={() => setDisableEditable(!disableEditable)} >
            Povol edit mode
          </Button>
        </div>
        <div className='bg-danger hidden'>
          testisk
        </div>
        <div className={classNames(!disableEditable && 'hidden')}>
          {eventNews?.blocks?.length &&(
          <Editor
            // editorState={editorState}
            defaultEditorState={eventNews}
            onEditorStateChange={handleEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />)
          }
        </div>
        <div dangerouslySetInnerHTML={createMarkup(convertedContent)} />
              {loadingStatus.isLoading ?
                <Spinner />
                :
                <Button onClick={handleSubmit} type='submit' color='github' size="lg">Uloz</Button>
              }
      </div>
    </GridContainer>
  )
}
