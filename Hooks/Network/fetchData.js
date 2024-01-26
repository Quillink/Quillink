import {useEffect} from 'react';

function fetchData(db, setNodes, setLinks) {
    useEffect(() => {
        db.collection("nodes").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setNodes(nodes => [...nodes, {id: doc.id}]);
            });
        });

        db.collection("links").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setLinks(links => [...links, {source: doc.data().source, target: doc.data().target}]);
            });
        });
    }, [])
}

export default fetchData;