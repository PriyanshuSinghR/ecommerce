import { v4 as uuid } from 'uuid';

/**
 * Category Database can be added here.
 * You can add category of your wish with different attributes
 * */

export const categories = [
  {
    _id: uuid(),
    categoryName: 'volleyball',
    url: 'https://cdn.britannica.com/81/198481-050-10CED2D9/Gilberto-Godoy-Filho-ball-Brazil-Argentina-volleyball-2007.jpg',
  },
  {
    _id: uuid(),
    categoryName: 'badminton',
    url: 'https://contents.mediadecathlon.com/s992255/k$bd560195c36570898816b2b28445105b/frame%203.png?format=auto&quality=70&f=440x0',
  },
  {
    _id: uuid(),
    categoryName: 'cricket',
    url: 'https://contents.mediadecathlon.com/s989750/k$a7b258c75557801bf6e36035323bc066/frame%2051.png?format=auto&quality=70&f=440x0',
  },
];
