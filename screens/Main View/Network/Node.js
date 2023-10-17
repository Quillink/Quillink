import React from 'react';
import {StyleSheet, SafeAreaView} from 'react-native';
import Nodes from './Nodes.json';


var nodes = Nodes.Nodes;
async function Node(props) {

    const querySnapshot = await getDocs(collection(db, "Nodes"));
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id}}`);
    });

    let nodesList=Object.values(nodes).map((item,index)=>{
        return <div style={{zIndex:2, color:"white", backgroundColor:"#191919", position:'absolute', left:item.position[0], top:item.position[1]}} key={index}>{item.name}</div>
    })

    const findConsecutive = (arr, n) => arr.slice(n - 1).map((v, i) => arr.slice(i, i + n));

    let consecutives = findConsecutive(Object.values(nodes), 2);

    let lines = consecutives.map((item, index) => {
        let intersection;
        intersection = item[0].tags.filter(x => item[1].tags.includes(x));


        if (intersection.length == 0) return;
        
        return (
        <svg key={index} style={{position:'absolute'}} height="100%" width="100%" >
            <line x1={item[0].position[0]} y1={item[0].position[1]} x2={item[1].position[0]} y2={item[1].position[1]} stroke="red" strokeWidth="2" />
        </svg>
        )
    })
    

    return (
        <SafeAreaView style={styles.screen}>
        {nodesList}
        {lines}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: "100%",
    }
})

export default Node;