// Global app controller
//import {add} from './models/SearchRecipe';
//import {add} from './views/searchView';

//console.log(`${add(4,11)}`);
// Global state of the app 
// Search object
// Current recipe object
// Liked Recipe

import Search from './models/SearchRecipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import List from './models/List';
import Likes from './models/Likes';
import * as listView from './views/listView';
import {elements, renderSpinner, clearLoader} from './views/base';
import Recipe from './models/Recipe';
import * as likesView from './views/likesView';

const state = {};


const searchControl = async () => {
  // 1. Get the search string from the view 
    const query = searchView.getInput();
   // const query = 'Pizza';

  if (query) {
      //2. New search object add to state object 
      state.search = new Search(query);
      //3 Prepare UI for Results 
     
      searchView.clearResult();
      renderSpinner(elements.searchRes);


      //4 Seach for recipe
   try{ 
      await state.search.getResults();
      

      // 5 Render
      
      clearLoader();
      searchView.displayResults(state.search.result);
              
      //searchView.clearInput();
   } catch (error) {
       clearLoader();
       alert(`Something went wrong on the search.......... ${error} `);
   }   
  }  
};

elements.searchForm.addEventListener('submit', e =>{
   
   e.preventDefault();
       searchControl();
    
});

elements.searchResPages.addEventListener('click', e =>{
      const btn = e.target.closest('.btn-inline');
      if (btn) {
        const goToPage = parseInt(btn.dataset.goto,10);
        searchView.clearResult();
        searchView.displayResults(state.search.result,goToPage);
      }
});

//const recipe = new Recipe(47746);
//recipe.getRecipe();
//console.log(recipe);

const controlRecipe = async () =>{
   // get the the ID fron the URL
   const ID = window.location.hash.replace('#', '');
     if (ID) {
         // Prepare UI for change 
         renderSpinner(elements.recipe);
         // create new receipe object 
         // Hightlight selected search item 
         if (state.recipe) { searchView.highlightSelected(ID);}
         state.recipe = new Recipe(ID);
         // testing only 
        // window.r = state.recipe;
     try{
         // Get recipe data
         await state.recipe.getRecipe(); // async function will execute first before bellow code runs A=
         state.recipe.parseIngredients();


         // calc serving time 
         state.recipe.calcTime();
         state.recipe.calcSevings();
         // render 
        

         clearLoader();
         //elements.searchResList.innerHTML = '';
         elements.recipe.innerHTML ='';
         recipeView.renderRecipe(state.recipe, state.likes.isLiked(ID));


        } catch (error) 
         {
          clearLoader();
           alert(`Oops something went wrong...... ${error}`);
         }
     }
};


/** Like ctrl  */

const shoppingListcltr = ()  => {
  
  // Only create a new list if there is none 
    if (!state.list) state.list = new List ();
  // add indredients to the the list 
  state.recipe.ingredients.forEach(el => {
      const item = state.list.addItem(el.count, el.unit, el.ingredient);
      listView.displyShopping(item);
  });
};
// temp code 

const loveRecipectrl = () => {
  if (!state.likes) state.likes = new Likes ();
  const selectedID = state.recipe.id;
      
  if (!state.likes.isLiked(selectedID)) {
    // Add like to data structure (state)
        const nLike = state.likes.addLikes(state.recipe.id, state.recipe.title, state.recipe.author, state.recipe.img);
    // Toggle like button
       likesView.toggleLikeBtn(true);         

    // Add like UI to the list 
    likesView.renderLike(nLike);


  } else {
      // remove from data structure (state)
      state.likes.deleteLikes(selectedID);

      // Toggle like button 
     likesView.toggleLikeBtn(false);

      // Remove from UI 
      likesView.deleteLikes(selectedID);
      //console.log(state.likes);
      
  }
  likesView.toggleLikeMenu(state.likes.getNumberLikes());

};

elements.shopping.addEventListener('click', e => {
    const ID = e.target.closest('.shopping__item').dataset.ingid;
    // handle delete 
   
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
     
       state.list.deleteItem(ID);    
      // delete form the UI   
      listView.deleteShopping(ID);  
    }
    else if (e.target.matches('.shopping__count-value, .shopping__count-value *')) {
    
      //const NewCnt = parseInt(document.querySelector('.shopping__count-value').value);
      const NewCnt = parseFloat(e.target.value, 10);
      if (NewCnt < 0) {
         state.list.updateCount(ID,NewCnt);
      }  
    }
});

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', controlRecipe);
// handling receipe button clicks
//Testing code 

window.addEventListener('load', () =>{
  state.likes = new Likes();  // likes   list local storage 
  state.list = new List();   // shopping list local storage 
  //  reload likes from localstorage 
  state.likes.getLocalStorage();
  state.list.getLocalStorage();
  // toggle Likemenu now that we have state.like object 
  likesView.toggleLikeMenu(state.likes.getNumberLikes());

  // render to the ui 
  state.likes.likes.forEach(likes => likesView.renderLike(likes));
  state.list.list.forEach(el => listView.displyShopping(el));

  
});

elements.recipe.addEventListener('click', e => {
  if (e.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
         state.recipe.updateServings('dec');
         elements.recipe.innerHTML ='';
         recipeView.renderRecipe(state.recipe)}

  } else if (e.target.matches('.btn-increase, .btn-increase *')){
        state.recipe.updateServings('inc');
        elements.recipe.innerHTML ='';
        recipeView.renderRecipe(state.recipe);

  } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
       shoppingListcltr();        
  } else if (e.target.matches('.recipe__love, .recipe__love *')) {
       loveRecipectrl(); 

  }
  
});









