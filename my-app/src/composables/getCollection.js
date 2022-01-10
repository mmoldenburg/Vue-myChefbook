import { ref } from 'vue'
import { db } from '../firebase/config'


const getCollection = (c, query) => {
    const documents = ref(null)
    const error = ref(null)

    let collectionRef = db.collection(c)       
        .orderBy('createdAt')
        
    if (query) {
        collectionRef = collectionRef.where(...query)
    }

    collectionRef.onSnapshot(snap => {
        let results = []
        snap.docs.forEach(doc => {
            doc.data().createdAt && results.push({...doc.data(), id:doc.id})
        })
        documents.value = results
        error.value = null
    }, (err) => {
        documents.value = null
        error.value = 'could not fetch data'
    })

    return { documents, error }
}
export default getCollection