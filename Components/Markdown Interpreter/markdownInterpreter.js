import React, { useEffect, useState } from 'react';
import showdown from 'showdown';
import { firebase } from '../../config'
import { doc, updateDoc } from 'firebase/firestore'
import './markdownInterpreter.css'; // You can name your CSS file as App.css

const db = firebase.firestore().collection("Nodes")


function Editor(props) {
  const [isPreview, setIsPreview] = useState(false);
  const [markdownText, setMarkdownText] = useState('');

  
  function setMd(val) {
    setMarkdownText(val)
  }

  useEffect(() => {
    db.doc(props.id).update({md: markdownText});
  })

  const toggleView = () => {
    setIsPreview(!isPreview);
  };

  const converter = new showdown.Converter();
  const html = converter.makeHtml(markdownText);

  return (
    <div className="App">
      <button onClick={toggleView} id="toggle-btn">
        {isPreview ? 'Back to Raw' : 'View Markdown'}
      </button>
      <div className="editor-container">
        <div id="editor" className="editor" style={{ display: isPreview ? 'none' : 'block' }}>
          <textarea
            id="markdown-input"
            placeholder="Write your Markdown here..."
            value={markdownText}
            onChange={(e) => setMd(e.target.value)}
          />
        </div>
        <div id="preview" className="preview" style={{ display: isPreview ? 'block' : 'none' }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default Editor;
