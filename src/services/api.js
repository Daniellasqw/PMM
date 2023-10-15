import axios from 'axios';

const api = axios.create({
    baseUrl:'http://localhost:3333'
    //baseUrl:'http://192.168.1.3:3333' //ip localhost, pegar no prompt com ipConfig

})

const server = 'http://192.168.1.4:3333'


export  {server};