import { db } from '../firebase-config.js'
import { setDoc, doc} from 'firebase/firestore'

export async function getBook(isbn){
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const json = await result.json()
    return json
    /*
    const link = json.items[0].volumeInfo.imageLinks.thumbnail
    setImage(link);
    console.log(link)
    */
};

export const setBook = async(isbn) => {
    const data = await getBook(isbn)
    console.log(data);
    await setDoc(doc(db, 'Books', isbn), {
        title: data.items[0].volumeInfo.title,
        genres: data.items[0].volumeInfo.categories,
        date: data.items[0].volumeInfo.publishedDate,
        imageURI: data.items[0].volumeInfo.imageLinks.thumbnail
    });
}

export const getFirebaseBooks = async () => {
    const books = await getDocs(db, 'Books');
    const json = await books.json();
    return json
  }

export const getFirebaseBookId = async (id) => {
    const bookId = await getDocs(db, 'Books', id);
    const json = await bookId.json();
    return json
  }

