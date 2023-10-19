import {React, useState, useEffect} from 'react';
import { firebase } from '../../../config'


const db = firebase.firestore().collection('Nodes');
const Nodes = () => {
    const [info, setInfo] = useState([]);
 
    const Fetchdata = async () => {
        db.get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
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
                    <div style={{zIndex:2, color:"white", backgroundColor:"#191919", position:'absolute', left:data.position[0], top:data.position[1]}} key={index}>{data.title}</div>
                ))
            }
        </div>
 
    );
}

export default Nodes;