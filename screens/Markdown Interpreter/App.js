import React, { useState } from 'react';
import showdown from 'showdown';
import './App.css'; // You can name your CSS file as App.css

function App() {
  const [isPreview, setIsPreview] = useState(false);
  const [markdownText, setMarkdownText] = useState('');

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
            onChange={(e) => setMarkdownText(e.target.value)}
          />
        </div>
        <div id="preview" className="preview" style={{ display: isPreview ? 'block' : 'none' }} dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}

export default App;
