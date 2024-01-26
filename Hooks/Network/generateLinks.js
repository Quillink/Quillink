// IMPLEMENTATION PENDING

function generateLinks(db, tags) {
    db.collection("nodes").where("tags", "array-contains-any", tags).get().then((querySnapshot) =>{
        querySnapshot.foreach((doc) => {
            db.collection("links").add({source: docRef.id, target: doc.id})
        })
    })
}

export default generateLinks;