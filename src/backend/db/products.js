import { v4 as uuid } from 'uuid';

/**
 * Product Database can be added here.
 * You can add products of your wish with different attributes
 * */

export const products = [
  {
    _id: uuid(),
    name: 'Volleyball Net',
    url: 'https://contents.mediadecathlon.com/p1524473/596532ee7cfd97736ac68b0a20fb61b5/p1524473.jpg?format=auto&quality=70&f=1024x0',
    price: '2000',
    discountprice: '1499',
    rating: '4.2',
    categoryName: 'volleyball',
  },
  {
    _id: uuid(),
    name: 'Volleyball',
    url: 'https://cdn.shopify.com/s/files/1/0124/4450/0068/products/3330-2-5-200-1-spartan-volleyball-super-volley-original-imaegeyjkaakfkpp_300x300.jpeg?v=1581274722',
    price: '1500',
    discountprice: '1199',
    rating: '4.0',
    categoryName: 'volleyball',
  },
  {
    _id: uuid(),
    name: 'Badminton Racket',
    url: 'https://contents.mediadecathlon.com/p2390643/1003ac34062b2fd3620b87acc2635abf/p2390643.jpg?format=auto&quality=70&f=650x0',
    price: '1200',
    discountprice: '1099',
    rating: '3.8',
    categoryName: 'badminton',
  },
  {
    _id: uuid(),
    name: 'Badminton Net',
    url: 'https://belco.in/in/wp-content/uploads/magictoolbox_cache/2deb0600714fef155ed12324a046b1c5/1/8/1810/original/1826486158/badminton-net.jpg',
    price: '1600',
    discountprice: '1399',
    rating: '5.0',
    categoryName: 'badminton',
  },
  {
    _id: uuid(),
    name: 'Bat',
    url: 'https://contents.mediadecathlon.com/p2416384/70b6d37439d834cfdafeb0a073715588/p2416384.jpg?format=auto&quality=70&f=650x0',
    price: '3000',
    discountprice: '2899',
    rating: '4.7',
    categoryName: 'cricket',
  },
];
