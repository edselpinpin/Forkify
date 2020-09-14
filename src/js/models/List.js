import uniqid from 'uniqid';

export default class List {
     constructor()  {
         this.list = []; // new array object 
     }

     addItem (count, unit, ingredient) {
         const item = {
                id: uniqid(),
                count,
                unit,
                ingredient,
         }
         this.list.push(item);
         this.savetoLocalStorage();
         return item;
     };
     deleteItem(ID) {
        const idx = this.list.findIndex(el =>{
              el.id === ID;
        });
        this.list.splice(idx,1);
        this.savetoLocalStorage();
       
     };
     updateCount(ID, Newcount) {
        const itm =  this.list.find(el =>
            el.id = ID)
            itm.count = Newcount;
        };

     savetoLocalStorage () {
        
            localStorage.setItem('items',JSON.stringify(this.list));
         };
         

         getLocalStorage() {
           
            const storage = JSON.parse(localStorage.getItem('items'));
            // restoring fron the local storage and assinging it back to state object
            
            if (storage) {this.list = storage;}
            
         }
     
};