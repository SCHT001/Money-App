import { Transaction } from '@/types';
import axios from 'axios';
const ENDPOINT="https://crudcrud.com/api/04bb3b52eeba4a8b903196721bb9c548/transactions";

export const getAllTranscations=()=>{
    axios({
        method: 'get',
        url: ENDPOINT,
        headers: {
            'Content-Type': 'application/json',
        }   
    }).then((response)=>{
       return(response.data);
    }).catch((error)=>{
        console.log(error);
    })
}

export const addTransaction=(transaction:Transaction)=>{
    axios({
        method: 'post',
        url: ENDPOINT,
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(transaction)
    }).then((response)=>{
        return(response.data);
    }).catch((error)=>{
        console.log(error);
    })
}
