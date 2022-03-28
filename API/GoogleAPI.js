import { db } from '../firebase-config.js'
import { setDoc, doc} from 'firebase/firestore'

export async function getBook(isbn){
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const json = await result.json()
    return json
};


