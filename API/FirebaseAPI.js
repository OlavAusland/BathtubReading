import { doc,  getDoc, getDocs, collection, setDoc, query, where, orderBy, getApp} from 'firebase/firestore';
import { getAuth, updateProfile } from 'firebase/auth';
import { db, app } from '../firebase-config.js'

export const addBook = async(isbn, book) => {
    //console.log(data);
    await setDoc(doc(db, 'Books', isbn), {
        title: book.items[0].volumeInfo.title,
        genres: book.items[0].volumeInfo.categories,
        date: book.items[0].volumeInfo.publishedDate,
        imageURI: book.items[0].volumeInfo.imageLinks.thumbnail
    });
}

export const addBookToUserLibrary = async(user, library, isbn) => {
    await setDoc(doc(db, 'Users', user.uid), { 'libraries': { [library]: arrayUnion(isbn) }}, {merge:true})
};

export const removeBookFromUserLibrary = async(user, library, isbn) => {
    setDoc(doc(db, 'Users', user.uid), { 'libraries': { [library]: arrayRemove(isbn) }}, { merge: true })
};


export async function getBooks() {
    const data = await getDocs(collection(db, 'Books'));
    const books = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return books
};


export async function getBook(isbn){
    const book = await getDoc(doc(db, 'Books', isbn));
    //console.log("Document data:", book.data())
    return book.data()
    };



export async function getBookGenre(genre){
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


export async function getUserInfo(){
    const user = getAuth().currentUser;
    
    const result = await getDocs(collection(db, 'Users', user.uid));
    //console.log("User Data: ", result.data());
    return result.data();
}

export async function initUser(uid)
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

export async function getNewestBooks()
{
    const bookQuery = query(collection(db, 'Books'), where('date', '>', '2004'), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(bookQuery);
    const result = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return result
}

export async function getBooksByKeyword(keyword)
{
    const booksRef = collection(db, "Books");

    const books = await getDocs(booksRef);
    const result = books.docs.map((doc) => ({...doc.data(), id: doc.id}));

    let queriedBooks = []
    
    result.map((book) => {if(book.title.includes(keyword)){queriedBooks.push(book)}})
    return queriedBooks;
}

export async function updateUser(username)
{
    const user = getAuth().currentUser;
    await updateProfile(user, {displayName: username}).catch((error) => {console.log(error)});
}


export const addRating = async(user, isbn, rating)=> {
    await setDoc(doc(db, 'Ratings', isbn), { [user.uid]: { "rating": rating } }, {merge:true})
}

export const getUserRating = async(isbn, user) => {
    const ratingRef = doc(db, 'Ratings', isbn);
    const ratingDoc = await getDoc(ratingRef);
    const field = ratingDoc.get(user.uid);
    return field.rating;
}
/* 
export const addBookToUserLibrary = async(user, library, isbn) => {
    await setDoc(doc(db, 'Users', user.uid), { 'libraries': { [library]: arrayUnion(isbn) }}, {merge:true})
}; */
