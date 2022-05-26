import { getAuth, updateProfile } from 'firebase/auth';
import { arrayRemove, arrayUnion, collection, deleteField, doc, getDoc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import { db } from '../firebase-config.js';

export const addBook = async(isbn, book) => {
   const image = book.items[0].volumeInfo.imageLinks ? book.items[0].volumeInfo.imageLinks.thumbnail : ' '
      
    setDoc(doc(db, 'Books', isbn), {
        title: book.items[0].volumeInfo.title,
        genres: book.items[0].volumeInfo.categories,
        date: book.items[0].volumeInfo.publishedDate,
        imageURI: image,
        rating:0,
    });
}

export const addBookByObject = async(isbn, book) => {
    const image = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ' '
    setDoc(doc(db, 'Books', isbn), {
        title: book.volumeInfo.title ? book.volumeInfo.title : ' ',
        genres: book.volumeInfo.categories ? book.volumeInfo.categories : [],
        date: book.volumeInfo.publishedDate ? book.volumeInfo.publishedDate : ' ',
        imageURI: image,
        rating: 0,
    });


    const firebaseGenres = await getAllGenres();
    const genres = book.volumeInfo.categories ? book.volumeInfo.categories : [];
    genres.forEach((genre) => {if(!firebaseGenres.includes(genre)){addGenre(genre)}});
    
}

export const addBookToUserLibrary = async(user, library, isbn) => {
    await setDoc(doc(db, 'Users', user.uid), { 'libraries': { [library]: arrayUnion(isbn) }}, {merge:true})
};

export const getAllGenres = async() => {
    const genres = await getDoc(doc(db, 'Genres', 'Genres'));
    return genres.data().genres;
};

export const addGenre = async(genre) => {
    setDoc(doc(db, 'Genres', 'Genres'), {
        genres: arrayUnion(genre)
    }, {merge:true});
}

export const removeBookFromUserLibrary = async(user, library, isbn) => {
    setDoc(doc(db, 'Users', user.uid), { 'libraries': { [library]: arrayRemove(isbn) }}, { merge: true })
};

export const getBooks = async() => {
    const data = await getDocs(collection(db, 'Books'));
    const books = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return books
};

export const getBook = async(isbn) =>{
    const book = await getDoc(doc(db, 'Books', isbn));
    if(book.data() == undefined){
        return undefined;
    }
    return {...book.data(), id:book.id};
    };

export const getBookGenre = async(genre) => {
    const genreQuery = query(collection(db, 'Books'), where('genres', 'array-contains', genre))
    const querySnapchot = await getDocs(genreQuery);
    const books = querySnapchot.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return books
};

export const getUserInfo = async() => {
    const user = getAuth().currentUser;
    const result = await getDocs(collection(db, 'Users', user.uid));
    return result.data();
}

export const initUser = async(uid) => {
    const result = await setDoc(doc(db, 'Users', uid), {"libraries":{favorites:[], reading:[], finished:[]}});
}

export const getUserLibrary = async(uid) => {
    const result = await getDoc(doc(db, 'Users', uid));
    const library = [];
    Object.keys(result.data()['libraries']).forEach((key) => {
        library.push({[key]: Array.from(new Set(result.data()['libraries'][key]))})
    })    
    return library
}

export const getTopBooks = async() => {
    const bookQuery = query(collection(db, 'Books'), orderBy('rating', 'desc'));
    const querySnapchot = await getDocs(bookQuery);
    const books = querySnapchot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return books.slice(0, 10);
}

export const getNewestBooks = async() => {
    const bookQuery = query(collection(db, 'Books'), where('date', '>', '2004'), orderBy('date', 'desc'))
    const querySnapshot = await getDocs(bookQuery);
    const result = querySnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    return result.slice(0, 25);
}

export const updateUser = async(username) => {
    const user = getAuth().currentUser;
    await updateProfile(user, {displayName: username}).catch((error) => {console.log(error)});
}


export const addRating = async(user, isbn, rating) => {
    await setDoc(doc(db, 'Ratings', isbn), { [user.uid]: { "rating": rating } }, {merge:true})
}

export const getUserRating = async(isbn, user) => {
    const ratingRef = doc(db, 'Ratings', isbn);
    const ratingDoc = await getDoc(ratingRef)
    const field = ratingDoc.get(user.uid);
    if(field == undefined){
        return 0;
    }
 
    return field.rating;
}

export const AddUserList = async(user, listName) => {
    const userLists = setDoc(doc(db, 'Users', user.uid), { 'libraries': { [listName]:[] }}, { merge: true })
}

export const RemoveUserList = async(user, listName) => {
    const res = await setDoc(doc(db, 'Users', user.uid), { 'libraries': { [listName]: deleteField() }}, { merge: true })

}

export const getAllRatings = async() => {
    const data = await getDocs(collection(db, 'Ratings'))
    const ratings = data.docs.map((doc) => ({...doc.data(), id: doc.id}))
    return ratings
}

export const getBookRatings = async(isbn) => {
    const response = await getDoc(doc(db, 'Ratings', isbn))
    const ratings = Object.keys(response.data()).map((key) => {return response.data()[key].rating})

    return {rating:averageRating(ratings), id:response.id}
}

//function that sums up elements in list and divides on length of list
export const averageRating = (ratings) => {
    let sum = 0;
    ratings.forEach((rating) => {
        sum += rating;
    })
    return sum / ratings.length;
}