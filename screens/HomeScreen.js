import React, { useState } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { firebase } from '../config';

import GraphView from '../Components/Network/GraphView';
import Editor from '../Components/Markdown Interpreter/markdownInterpreter';
import Folder from '../Components/Sidebar/Folder';
import addFile from '../Hooks/Network/addFile'

import addNode from '../Hooks/Sidebar/addNode';
import explorer from '../data/folderData';


function HomeScreen(props) {

    const [viewState, setViewState] = useState("GRAPH_VIEW");

    const [docId, setDocId] = useState(undefined);
    const db = firebase.firestore().collection("Users").doc(props.user.uid);

    function switchView(id) {
        if (id != undefined || viewState == "EDITOR_VIEW") {
            setDocId(id);
            setViewState(viewState == "GRAPH_VIEW" ? "EDITOR_VIEW" : "GRAPH_VIEW")
        }
        else {
            // TODO: combine addNode from Hooks/Sidebar and this into one function.
            addFile(db, setDocId, viewState, setViewState)

            setViewState("EDITOR_VIEW")
        }
    }

    return (
        <div style={styles.main}>
            <div style={styles.sidebar}>
                <Folder handleInsertNode={addNode} explorer={explorer} />
            </div>
            <div>
                <Pressable style={styles.create_node_btn} onPress={() => switchView()}>
                    <p>+</p>
                </Pressable>
                {viewState == "GRAPH_VIEW" ? <GraphView db={db} switchView={switchView} /> : <Editor db={db} id={docId} />}
            </div>
        </div>
    );
}

const styles = StyleSheet.create({
    main: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        zIndex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#011123',
    },
    create_node_btn: {
        zIndex: 1,
        width: "60px",
        aspectRatio: 1,
        backgroundColor: "#e57906",
        right: 0,
        bottom: 0,
        position: 'absolute',
        display: 'flex',
        marginRight: "30px",
        marginBottom: "30px",
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '45px'
    },
    sidebar: {
        display: 'flex',
        backgroundColor: '#011b37',
        minWidth: '200px'
    }
});

export default HomeScreen;