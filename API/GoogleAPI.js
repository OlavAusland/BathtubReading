
export async function getBook(isbn){
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
    const json = await result.json()
    return json

};

export async function getBooks(title){
    const result = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${title}`);
    const json = await result.json()
    return json
}
