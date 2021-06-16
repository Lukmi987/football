import axios from "../../axios-football";

export function* fetchNews () {
  const newsData = {
    newsDiv: '<h1>As US President</h1> <p>Joe Biden and his team huddle in advance of his news conference, they are closely monitoring Russian President Vladimir Putin’s ongoing news conference to see</p> <p>how he frames the meeting and whether there is anything specific that Biden needs to proactively push back against when it’s his turn, a US official says\n' +
      '\n' +
      'The opportun</p>'
  }
  const dat = {man: 'nebyl'}
  const userToken = localStorage.token
  try {
   const response = yield axios.put(`eventNews.json/`, dat);
    console.log('resonse',response);
  } catch(e) {
    console.log(e)
  }
}