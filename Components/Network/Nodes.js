import {React, useState, useEffect} from 'react';
import { Pressable } from 'react-native';
import { firebase } from '../../config';
import Editor from '../Markdown Interpreter/markdownInterpreter';
import HomeScreen from '../../screens/Main View/HomeScreen';


const db = firebase.firestore().collection('Nodes');
function Nodes (props) {
    const [info, setInfo] = useState([]);
 
    const Fetchdata = async () => {
        db.get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element;
                setInfo(arr => [...arr, data]);
            });
        })
    }

    useEffect(() => {
        Fetchdata();
    }, [])

    return (
        <div>
            {
                info.map((data, index) => (
                    <Pressable onPress={() => props.func(data.id)} style={{zIndex:2, color:"black", backgroundColor:"powderblue", position:'absolute', left:data.data().position[0], top:data.data().position[1]}} key={index}><p>{data.data().title}</p></Pressable>
                ))
            }
        </div>
 
    );
}

export default Nodes;