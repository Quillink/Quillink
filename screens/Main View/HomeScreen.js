import React, { useState } from 'react';
import {StyleSheet, Button, Pressable} from 'react-native';
import Network from '../../Components/Network/Network';
import Editor from '../../Components/Markdown Interpreter/markdownInterpreter';
import { firebase } from '../../config';
import { doc, getDoc, setDoc } from "firebase/firestore"; 


const db = firebase.firestore().collection('Nodes');

function HomeScreen(props) {

    const [isGraph, setIsGraph] = useState(true);
    const [docId, setDocId] = useState("");

    function setGraph(Id) {
        if (isGraph == true)
        {
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
            setIsGraph(!isGraph);
        } else {
            setIsGraph(!isGraph);
        }
    }
    console.log(docId)

    return (
        <div style={styles.main}>
            <Pressable style={styles.btn} onPress={setGraph}><p>Create Node</p></Pressable>
            {isGraph ? <Network func={setGraph} /> : <Editor id={docId} />}
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
