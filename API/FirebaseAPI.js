import { doc,  getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config.js'

export async function getFirebaseBooks(){
    const data = await getDocs(collection(db, 'Books'));
    const books = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return books
    };


export async function getFirebaseBook(isbn){
    const book = await getDoc(doc(db, 'Books', isbn));
    return book.data()
    };
