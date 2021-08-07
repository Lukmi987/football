import React, { useEffect, useRef, useState } from 'react';
import Button from '../../../components/CustomButtons/Button';
import GridContainer from '../../../components/Grid/GridContainer';
import classNames from 'classnames';
import { Snackbar } from '@material-ui/core';
import Spinner from '../../Spinner';
import { convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToHTML } from 'draft-convert';
import DOMPurify from 'dompurify';
import { setLoadingStatus } from '../../loadingStatus/actions';
import { getAdmin } from '../actions';

export default function EventNews({ fetchNews, saveNews, loadingStatus, setLoadingStatus, eventNews, getAdmin, admin }) {
  const [disableEditable, setDisableEditable] = useState(true);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [convertedContent, setConvertedContent] = useState(null);

  useEffect(() => {
    fetchNews();
    getAdmin();
  }, []);

  console.log('jsem admin bo jak',admin);

  useEffect(() => {
    if (eventNews?.eventNews) {
      console.log('aha ale jsem');
      const rawContent = JSON.parse(eventNews.eventNews);
      const contentState = convertFromRaw(rawContent);
      const editorStateFromDb = EditorState.createWithContent(contentState, null);
      setEditorState(editorStateFromDb);
    }
  }, [eventNews]);

  useEffect(() => {
    if (editorState) {
      convertContentToHTML();
    }
  }, [editorState]);

  const handleSubmit = () => {
    saveNews(convertContentToJson());
  };

  // returns an object with the sanitized HTML
  const createMarkup = (html) => ({ __html: DOMPurify.sanitize(html) });

  const handleEditorChange = (state) => {
    setEditorState(state);
    convertContentToHTML();
  };

  const convertContentToJson = () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    return JSON.stringify(rawContentState);
  };

  const convertContentToHTML = () => {
    console.log('v convert content', editorState);
    const currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
    setConvertedContent(currentContentAsHTML);
  };

  return (
    <div className='pb-10 pt-3'>
      <Snackbar
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'top',
        }}
        open={loadingStatus.success}
        autoHideDuration={3000}
        onClose={setLoadingStatus}
        message={loadingStatus.error || '!!!Uspesne ulozeno'}
      />
      <div className='pb-3'>
        {admin.isAdmin &&
        <>
          <Button
            color={!disableEditable ? 'warning' : 'success'}
            onClick={() => setDisableEditable(!disableEditable)}
          >
            {disableEditable ? 'Povol edit mode' : 'Zakaz editaci'}
          </Button>
          <div className={classNames(disableEditable && 'hidden')}>
            {loadingStatus.isLoading ? (
              <Spinner />
            ) : (
              <Button onClick={handleSubmit} type="submit" color="github" size="lg">
                Uloz
              </Button>
            )}
          </div>
        </>
        }
        </div>
        <div className="bg-danger hidden">testisk</div>
        <div className={classNames(disableEditable && 'hidden')}>
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
          />
        </div>
        <div className='mt-3 p-4 border rounded shadow-lg' dangerouslySetInnerHTML={createMarkup(convertedContent)} />

    </div>
  );
}
