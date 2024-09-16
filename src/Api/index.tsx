import axios from 'axios'



const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 1000,
    headers: {}
})

 const fetchData = async() =>{
   return client({
    url: "https://jsonplaceholder.typicode.com/users",
    method: "get",
    responseType: "json"
   })
}

export const Users = () => {
    return fetchData()
}

