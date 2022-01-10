import { ref } from 'vue'
import { db } from '../firebase/config'


const getDetails = (id) => {
    const document = ref(null)
    const error = ref(null)

    const load = async () => {
        try {
            const res = await db.collection('recipes').doc(id).get()
            document.value = { ...res.data(), id: res.id}
            console.log(document.value)
        } catch (err) {
            error.value = err.message
        }
    }
    
    return { document,error, load }
}
export default getDetails