import { getBook } from "../../api/firebaseAPI";

export const GetUserListsInformation = async(user, lists) =>
{
  
    let isbnArray = new Map();
    let keys = []
    lists.map((list) => {
        return Object.keys(list).map((key) => {
            let temp = [];
            [...Array(list[key].length).keys()].map((i) => {
                temp.push(getBook(list[key][i]))
            })
            keys.push(key)
            isbnArray.set(key, temp)
        })
    });
    
    const resolve = async() => {
        const test = new Map()
        for(let i = 0; i < keys.length;i++)
        {
            await Promise.all(isbnArray.get(keys[i])).then((res) => {test.set(keys[i], res);});
        }
        return test;
    }


    return resolve();
}