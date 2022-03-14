import { doc,  getDoc, getDocs, collection, setDoc} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from '../firebase-config.js'

export async function getFirebaseBooks(){
    const data = await getDocs(collection(db, 'Books'));
    const books = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    //console.log("Document datas:", books)
    return books
};


export async function getFirebaseBook(isbn){
    const book = await getDoc(doc(db, 'Books', isbn));
    //console.log("Document data:", book.data())
    return book.data()
};

export async function getFirebaseUserInfo(){
    const user = getAuth();
    
    const result = await getDocs(collection(db, 'Users', user.uid));
    //console.log("User Data: ", result.data());
    return result.data();
}

export async function initFirebaseUser(uid)
{
    const result = await setDoc(doc(db, 'Users', uid), {"libraries":{favorites:[], reading:[]}});
}

export async function getUserLibrary(uid)
{
    console.log("UID: " + uid);
    const result = await getDoc(doc(db, 'Users', uid));
    console.log(result.data())
    return [Object.values(result.data()['libraries']), Object.keys(result.data()['libraries'])]
}