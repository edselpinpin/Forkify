//export const add = (a,b) => a+b;
import axios from 'axios';
import { clearLoader } from '../views/base';


export default class Search{
    constructor(query) {
        this.query = query;
    }
    async getResults() {
        try {
            
            const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.result = res.data.recipes;
            
          
            
            //console.log(this.result);
        } catch (error) {
            clearLoader();
            if (error)
            alert(`Something went wrong............. ${error}`);
          
        }
    }


}