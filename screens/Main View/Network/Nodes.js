import {React, useState} from 'react';
import { firebase } from '../../../config'


const db = firebase.firestore().collection('Nodes');
const Nodes = () => {
    const [info, setInfo] = useState([]);

    window.addEventListener('load', () => { // fetch everytime window loads
        Fetchdata();
    });
 
    const Fetchdata = () => {
        db.get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
 
            });
        })
    }

    return (
        <div>
            {
                info.map((data, index) => (
                    <div style={{zIndex:2, color:"white", backgroundColor:"#191919", position:'absolute', left:data.position[0], top:data.position[1]}} key={index}>{data.title}</div>
                ))
            }
        </div>
 
    );
}

export default Nodes;