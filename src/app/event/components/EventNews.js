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

  useEffect(()=> {
    console.log('jsem ve setru na id if !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
    if(eventNews?.cabinNews && eventNews?.trainingEval){
      console.log('jsem ve stteru volellekjdfsk jdksj ');
      setCabinNews(eventNews.cabinNews);
      setTrainingEval(eventNews.trainingEval)
    }
  }, [eventNews]);


  console.log('editorState',editorState);

const handleNews = (ev) => {
  if(ev.target.id === 'cabinNews') {setCabinNews(ev.target.value);}
  if(ev.target.id === 'trainingEval') {setTrainingEval(ev.target.value);}
}

const handleSubmit = () => {
  saveNews({cabinNews, trainingEval});
}


// returns an object with the sanitized HTML
const createMarkup = (html) => ({__html: DOMPurify.sanitize(html)})

const handleEditorChange = (state) => {
  setEditorState(state);
  // console.log('try', convertToRaw(editorState));
  converContentToHTML();
  }

  const converContentToHTML = () => {
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
   const rawContentState =  convertToRaw(editorState.getCurrentContent());
   console.log('rawPico',rawContentState);
    setConvertedContent(currentContentAsHTML);

  }

const handleEditor = () => {
  console.log('moje ev ',editorState)

}

// to do
  // -

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
        <Editor
          // editorState={editorState}
          defaultEditorState={editorState}
          onEditorStateChange={handleEditorChange}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
        />;


        <div dangerouslySetInnerHTML={createMarkup(convertedContent)} />


        {/*<Editor*/}
        {/*  editorState={true}*/}
        {/*  toolbarClassName="toolbarClassName"*/}
        {/*  wrapperClassName="wrapperClassName"*/}
        {/*  editorClassName="editorClassName"*/}
        {/*  onEditorStateChange={handleEditor}*/}
        {/*/>;*/}

        {/*<Editor editorState={editorState} />*/}



        <div className="cabin-news-editable-news">
          <p>
            {cabinNews}
          </p>
        </div>

        <div className="cabin-news-editable-evaluation">
          <p>
            {trainingEval}
          </p>
        </div>

        <div className={classNames('cabin-news-editable-formik',
          !disableEditable && 'cabin-news-editable-formik-display'
        )}>

        <div className=''>
          <label htmlFor='cabinNews'>Zdroj kod pro cabinNews</label>
          <textarea value={cabinNews} id='cabinNews' onChange={handleNews} />
        </div>
          <div className=''>
            <label htmlFor='trainingEval'>Zdroj kod trainingEval</label>
            <textarea value={trainingEval} id='trainingEval' onChange={handleNews} />
          </div>
              {loadingStatus.isLoading ?
                <Spinner />
                :
                <Button onClick={handleSubmit} type='submit' color='github' size="lg">Uloz</Button>
              }



                   {/*<Formik*/}
          {/*  initialValues={{*/}
          {/*    cabinNews: '',*/}
          {/*    trainingEvaluation: '',*/}
          {/*    name: ''*/}
          {/*  }}*/}
          {/*  onSubmit={(values) => saveNews(values)}*/}
          {/*>*/}
          {/*  <Form>*/}
          {/*    <div className=''>*/}
          {/*      <label hmtlFor='cabinNews'>News souce</label>*/}
          {/*      <Field as='textarea' id='cabinNews' name='cabinNews' />*/}
          {/*    </div>*/}
          {/*    <div className=''>*/}
          {/*      <label hmtlFor='trainingEvaluation'>trainingEvaluation</label>*/}
          {/*      <Field  as='textarea'*/}
          {/*              // onChange={handleChangeVole}*/}

          {/*              id='trainingEvaluation' name='trainingEvaluation' />*/}
          {/*      <input*/}
          {/*        type="text"*/}
          {/*        onChange={handleChangeVole}*/}
          {/*        id='name'*/}
          {/*        value={cabinNews}*/}
          {/*        name="name"*/}
          {/*      />*/}
          {/*    </div>*/}
          {/*    {loadingStatus.isLoading ?*/}
          {/*      <Spinner />*/}
          {/*      :*/}
          {/*      <Button type='submit' color='github' size="lg">Uloz</Button>*/}
          {/*    }*/}
          {/*  </Form>*/}
          {/*</Formik>*/}
        {/*</div>*/}
      </div>
      </div>



    </GridContainer>
  )
}
