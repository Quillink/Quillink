import { useState } from "react";
import explorer from "../data/folderData";

function Folder({ handleInsertNode = () => { }, explorer }) {
  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: false
  });

  const handleNewFolder = (e, isFolder) => {
    e.stopPropagation();
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder
    });
  };

  const onAddFolder = (e) => {
    if (e.keyCode === 13 && e.target.value) {
      const newNodeName = e.target.value;
      const newNodeIsFolder = showInput.isFolder;
      const relativePath = explorer.id; // Start with the current folder's ID
      handleInsertNode(relativePath, newNodeName, newNodeIsFolder);
      setShowInput({ ...showInput, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div className="sidebar">
        <div style={{ marginTop: 5 }}>
          <div onClick={() => setExpand(!expand)} className="folder">
            <span style={{ color: "#fff" }}>📁 {explorer.name}</span>

            <div>
              <button onClick={(e) => handleNewFolder(e, true)}>📁 +</button>
              <button onClick={(e) => handleNewFolder(e, false)}>📄 +</button>
            </div>
          </div>

          <div style={{ display: expand ? "block" : "none", paddingLeft: 15 }}>
            {showInput.visible && (
              <div className="inputContainer">
                <span>{showInput.isFolder ? "📁" : "📄"}</span>
                <input
                  type="text"
                  className="inputContainer__input"
                  autoFocus
                  onKeyDown={onAddFolder}
                  onBlur={() => setShowInput({ ...showInput, visible: false })}
                />
              </div>
            )}

            {explorer.items.map((exp) => {
              return (
                <Folder
                  handleInsertNode={handleInsertNode}
                  key={exp.id}
                  explorer={exp}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    return <span className="file" style={{ color: "#fff" }}>📄 {explorer.name}</span>;
  }
}

export default Folder;
