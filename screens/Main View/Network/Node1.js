import {React, useEffect, useState} from 'react';
import { StyleSheet } from 'react-native';
import { firebase } from '../../../config'

function Node1(props) {

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

    const Lines = () => {
        const [info, setInfo] = useState([]);
        let linesList = [];

        window.addEventListener('load', () => { // fetch everytime window loads
            Fetchdata();
        });
     
        const Fetchdata = () => {
            db.where("tags", 'array-contains', "Home").get().then((querySnapshot) => {
                querySnapshot.forEach(element => {
                    var data = element.data();
                    setInfo(arr => [...arr, data]);
     
                });
            })
        }

        console.log(info);

        for (let i = 0, count = 0; i < info.length - 1; i++) // append lines into lineslist
        {
            for (let j = i+1; j < info.length; j++)
            {
                console.log(info[i].position[1]);
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

    return (
        <div>
            <Nodes></Nodes>
            <Lines></Lines>
        </div>
    );
}

export default Node1;