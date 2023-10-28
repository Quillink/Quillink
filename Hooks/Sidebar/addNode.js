import { firebase } from '../../config';

const folderCollection = firebase.firestore().collection('Folders');
const fileCollection = firebase.firestore().collection('Nodes');

const addNode = (nodeName, isFolder, relPath) => {

    if (isFolder) {

        const data = {
            title: nodeName,
            relPath: relPath
        };

        folderCollection.add(data)
            .catch((err) => {
                console.log("err: " + err);
            })
    } else {

        const data = {
            title: nodeName,
            relPath: relPath,
            tags: [],
            position: [Math.random() * 800, Math.random() * 800],
            md: ""
        };

        fileCollection.add(data)
            .catch((err) => {
                console.log("err: " + err);
            })
    }
}

export default addNode;