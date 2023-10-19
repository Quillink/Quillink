import React, { useState } from 'react';
import {StyleSheet, Button, Pressable} from 'react-native';
import Network from './Network/Network';
import Editor from './Markdown Interpreter/App';
import { firebase } from '../../config';
import { doc, getDoc, setDoc } from "firebase/firestore"; 


const db = firebase.firestore().collection('Nodes');

function HomeScreen(props) {

    const [isGraph, setIsGraph] = useState(true);
    const [docId, setDocId] = useState();

    function setGraph() {
        if (isGraph == true)
        {
            // add new node to db
            db.add({
                title: "New Node",
                position: [Math.random() * 1000, Math.random() * 1000],
                tags: [],
                md: ""
            }).then((docRef) => {
                setDocId(docRef.id);
            })
            setIsGraph(!isGraph);
        } else {
            setIsGraph(!isGraph);
        }
    }

    return (
        <div style={styles.main}>
            <Pressable style={styles.btn} onPress={setGraph}><p>Create Node</p></Pressable>
            {isGraph ? <Network /> : <Editor id={docId} />}
        </div>
    );
}

const styles = StyleSheet.create({
    main: {
      flex: 1,
      zIndex: 1,
      width: 1000,
      height: 1000,
      backgroundColor: '#191919',
      alignItems: 'center',
      justifyContent: 'center',
    },
    btn: {
        flex: 1,
        zIndex: 1,
        marginBottom: 300,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
      },
});

export default HomeScreen;