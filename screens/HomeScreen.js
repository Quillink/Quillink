import React, { useState } from 'react';
import { StyleSheet, Pressable, RootTagContext } from 'react-native';
import Network from '../Components/Network/Network';
import Editor from '../Components/Markdown Interpreter/markdownInterpreter';
import Folder from '../Components/Sidebar/Folder';
import { firebase } from '../config';
import addNode from '../Hooks/Sidebar/addNode';
import explorer from '../data/folderData';

const db = firebase.firestore().collection('Nodes');

function HomeScreen(props) {

    const [isGraph, setIsGraph] = useState(true);
    const [docId, setDocId] = useState("");

    function setGraph(Id) {
        if (isGraph == true) {
            if (typeof Id == "string") setDocId(Id);
            else {
                db.add({
                    title: "New Node",
                    md: "",
                    position: [Math.random() * 800, Math.random() * 800],
                    tags: ["Chore"]
                }).then((docRef) => {
                    setDocId(docRef.id)
                })
            }
        }
        setIsGraph(!isGraph);
    }

    return (
        <div style={styles.main}>
            <div style={styles.sidebar}>
                <Folder handleInsertNode={addNode} explorer={explorer} />
            </div>
            <div>
                <Pressable style={styles.create_node_btn} onPress={setGraph}>
                    <p>+</p>
                </Pressable>
                {isGraph ? <Network func={setGraph} /> : <Editor id={docId} />}
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
