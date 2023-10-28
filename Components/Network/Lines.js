import {React, useState, useLayoutEffect, useEffect} from 'react';
import {fetchTaggedData} from '../../Hooks/Network/fetchData';
import { firebase } from '../../config'
import drawLines from '../../Hooks/Network/drawLines'

function Lines(props) {
    const [info, setInfo] = useState([]);

    useEffect(() => {
        firebase.firestore().collection("Tags").doc("tags").get().then((doc) => {
            let copy = [];
            for (let i = 0; i < doc.data().tags.length; i++)
                fetchTaggedData(copy, doc.data().tags[i], i, setInfo);
        })
    }, [])

    return drawLines(info);
}

export default Lines;