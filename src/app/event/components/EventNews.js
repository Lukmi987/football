import React, { useRef, useState } from 'react';
import ContentEditable from 'react-contenteditable';
import Button from '../../../components/CustomButtons/Button';
import GridContainer from '../../../components/Grid/GridContainer';
import classNames from 'classnames';
import { fetchNews } from '../actions';

export default function EventNews ({fetchNews}) {
  const [disableEditable, setDisableEditable] = useState(true);

  const textInit = '<h1>As US President</h1> <p>Joe Biden and his team huddle in advance of his news conference, they are closely monitoring Russian President Vladimir Putin’s ongoing news conference to see</p> <p>how he frames the meeting and whether there is anything specific that Biden needs to proactively push back against when it’s his turn, a US official says\n' +
    '\n' +
    'The opportun</p>';
  const text = useRef(textInit);

  const handleChange = (event) => {
    text.current = event.target.value;
  }

  const handleBlur = () => {
    console.log(text.current);
  }

  const handleStoreNews = () => {

     fetchNews();
  }

  return (
    <GridContainer justify="left">
    <div className={classNames(
      'cabin-news-editable-info-div',
      !disableEditable && 'cabin-news-editable-info-div-edit-mode'
      )}>
      <ContentEditable
      html={text.current}
      onBlur={handleBlur}
      onChange={handleChange}
      disabled={disableEditable}
      />
    </div>
    <div>
      <Button color={disableEditable ? 'warning' : 'success' }  onClick={() => setDisableEditable(!disableEditable)} >
       Povol edit mode
      </Button>
      <Button onClick={handleStoreNews}> Uloz</Button>
    </div>
    </GridContainer>
  )
}
