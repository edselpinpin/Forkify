export default class Likes {
  constructor () {
       this.likes = [];
  };

  addLikes(id, title, author, img) {
      const like = {id, title, author, img };
      this.likes.push(like);
      this.savetoLocalStorage();
      return like;

      // add data to localstorage 
      
  };

  deleteLikes(ID) {
    const idx = this.likes.findIndex(el => el.id === ID);
      this.likes.splice(idx,1);
      // delete from local storage 
      this.savetoLocalStorage();
  };

  isLiked(ID) {
       return  this.likes.findIndex(el => el.id === ID) !== -1;
      
  }
  getNumberLikes () {
      return this.likes.length;
  }

  savetoLocalStorage () {
     localStorage.setItem('likes',JSON.stringify(this.likes));
  }

  getLocalStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
     // restoring fron the local storage and assinging it back to state object
     if (storage) this.likes = storage;
  }
};