import { firebase } from '../../config'

const db = firebase.firestore().collection('Nodes');

async function fetchTaggedData(copy, tags, i, f) {
    copy.push([]);
    db.where("tags", 'array-contains', tags).get().then((querySnapshot) => {
        querySnapshot.forEach((element, index) => {
            var data = element.data();
            copy[i].push(data);
            f(copy);
        });
    })
}

async function fetchAllData(f) {
    db.get().then((querySnapshot) => {
        querySnapshot.forEach(element => {
            var data = element;
            f(arr => [...arr, data]);
        });
    })
}

export { fetchTaggedData, fetchAllData };