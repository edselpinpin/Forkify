import {elements} from './base';

export const displyShopping = (item) => {
      const markup = `<li class="shopping__item" data-ingid=${item.id}>
                        <div class="shopping__count">
                          <input type="number" value="${item.count}" step="${item.count}"class="shopping__count-value">
                           <p>${item.unit}</p> 
                             </div>
                               <p class="shopping__description">${item.ingredient}</p>
                                   <button class="shopping__delete btn-tiny">
                                   <svg>
                                         <use href="img/icons.svg#icon-circle-with-cross"></use>
                                   </svg>
                                </button>
                       </li> `;
    elements.shopping.insertAdjacentHTML('beforeend', markup);                
};

export const  deleteShopping = (ID)  => {
 const item = document.querySelector(`[data-ingid="${ID}"]`);
 item.parentElement.removeChild(item);
};