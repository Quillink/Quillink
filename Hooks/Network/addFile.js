function addFile(db, setDocId, viewState, setViewState) {
    db.collection("nodes").add({
        md: "",
        title: "",
        tags: ["Home"],
    }).then((docRef) => {
        console.log(docRef.id)
        setDocId(docRef.id);
    });
}

export default addFile;