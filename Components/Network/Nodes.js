import {React, useState, useEffect} from 'react';
import { Pressable } from 'react-native';
import { firebase } from '../../config';
import {fetchAllData} from '../../Hooks/Network/fetchData';


const db = firebase.firestore().collection('Nodes');
function Nodes (props) {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        fetchAllData(setInfo);
    }, [])

    return (
        <div style={{position: 'relative'}}>
            {
                info.map((data, index) => (
                    <Pressable onPress={() => props.func(data.id)} style={{zIndex:2, width: 100, height: 50, color:"black", backgroundColor:"powderblue", position:'absolute', left:data.data().position[0], top:data.data().position[1]}} key={index}><p>{data.data().title}</p></Pressable>
                ))
            }
        </div>
 
    );
}

export default Nodes;