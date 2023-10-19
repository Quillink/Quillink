import {React, useState, useEffect} from 'react';
import { firebase } from '../../../config'


const db = firebase.firestore().collection('Nodes');

const Lines = () => {
    const [info, setInfo] = useState([]);
    let linesList = [];
 
    const Fetchdata = () => {
        db.where("tags", 'array-contains', "Home").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
 
            });
        })
    }

    useEffect(() => {
        Fetchdata();
        console.log("Ransomething");
    }, [])

    for (let i = 0, count = 0; i < info.length - 1; i++) // append lines into lineslist
    {
        for (let j = i+1; j < info.length; j++)
        {
            linesList[i] = info.map((index) => {
                return (
                    <svg key = {++count} style={{position:'absolute'}} height="100%" width="100%" >
                        <line x1={info[i].position[0]} y1={info[i].position[1]} x2={info[j].position[0]} y2={info[j].position[1]} stroke="red" strokeWidth="2" />
                    </svg>
                )
            })   
        }
    }
 
    return (
        <div>
            { linesList }
        </div>
 
    );
}

export default Lines;