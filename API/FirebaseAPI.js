import { doc,  getDoc, getDocs, collection, setDoc} from 'firebase/firestore';
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

export async function getFirebaseUserInfo(){
    const user = getAuth().currentUser;
    
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
    const result = await getDoc(doc(db, 'Users', uid));
    const library = [];
    Object.keys(result.data()['libraries']).forEach((key) => {
        library.push({[key]: result.data()['libraries'][key]})
    })
    
    return library
}

export async function updateUser(username)
{
    const user = getAuth().currentUser;
    await updateProfile(user, {displayName: username}).catch((error) => {console.log(error)});
}

