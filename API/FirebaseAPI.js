import { doc,  getDoc, getDocs, collection } from 'firebase/firestore';
import { db } from '../firebase-config.js'

export async function getFirebaseBooks(){
    const data = await getDocs(collection(db, 'Books'));
    const books = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    console.log("Document datas:", books)
    return books
    };


export async function getFirebaseBook(isbn){
    const book = await getDoc(doc(db, 'Books', isbn));
    console.log("Document data:", book.data())
    return book.data()
    };


export async function getFirebooksGenre(genres){
    const book = await getDoc(doc(db, 'Books', genres));
    console.log("Document data:", book)
    return book.data()
};
