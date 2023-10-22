import {React, useState, useLayoutEffect, useEffect} from 'react';
import { firebase } from '../../config'


const db = firebase.firestore().collection('Nodes');

function Lines(props) {
    const [info, setInfo] = useState([]);

    
    
    let linesList = [];
    const Fetchdata = async (copy, tags, i) => {
        copy.push([]);
        db.where("tags", 'array-contains', tags).get().then((querySnapshot) => {
            querySnapshot.forEach((element, index) => {
                var data = element.data();
                copy[i].push(data);
                setInfo(copy);
            });
        })
        
    }    

    useEffect(() => {
        firebase.firestore().collection("Tags").doc("tags").get().then((doc) => {
            let copy = [];
            for (let i = 0; i < doc.data().tags.length; i++)
                Fetchdata(copy, doc.data().tags[i], i)
        })
    }, [])

    for (let k = 0, count = 0; k < info.length; k++)
    {
        console.log(info)
        for (let i = 0; i < info[k].length; i++) // append lines into lineslist
        {
            for (let j = i+1; j < info[k].length; j++)
            {
                linesList.push (
                        <svg key = {++count} style={{position:'absolute'}} height="100%" width="100%" >
                            <line x1={info[k][i].position[0]} y1={info[k][i].position[1]} x2={info[k][j].position[0]} y2={info[k][j].position[1]} stroke="red" strokeWidth="2" />
                        </svg>
                )
            }
        }
    }
    

    return linesList
}

export default Lines;