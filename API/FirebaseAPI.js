import { doc,  getDoc, getDocs, collection, setDoc, query, where, orderBy} from 'firebase/firestore';
import { getAuth, updateProfile, updatePassword } from 'firebase/auth';
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



export async function getFirebooksGenre(genre){
    const genreQuery = query(collection(db, 'Books'), where('genres', 'array-contains', genre))
    const querySnapchot = await getDocs(genreQuery);
    /*
    querySnapchot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data());
    });
    */
    const books = querySnapchot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return books
};


export async function getFirebaseUserInfo(){
    const user = getAuth().currentUser;
    
    const result = await getDocs(collection(db, 'Users', user.uid));
    //console.log("User Data: ", result.data());
    return result.data();
}

export async function initFirebaseUser(uid)
{
    const result = await setDoc(doc(db, 'Users', uid), {"libraries":{favorites:[], reading:[], finished:[]}});
}

export async function getUserLibrary(uid)
{
    const result = await getDoc(doc(db, 'Users', uid));
    const library = [];
    Object.keys(result.data()['libraries']).forEach((key) => {
        library.push({[key]: Array.from(new Set(result.data()['libraries'][key]))})
    })    
    return library
}

export async function getNewestFirebaseBooks()
{
    const bookQuery = query(collection(db, 'Books'), where('date', '>', '2004'), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(bookQuery);
    const result = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return result
}

export async function updateUser(username)
{
    const user = getAuth().currentUser;
    await updateProfile(user, {displayName: username}).catch((error) => {console.log(error)});
}
