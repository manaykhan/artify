import bcrypt from 'bcryptjs';

// data being populated initially in db
// paswords hashed and encrypted before being saved in db
const data = {
    users: [
        {
          name: 'Mahnoor',
          email: 'admin@example.com',
          password: bcrypt.hashSync('11111'),
          isAdmin: true,
        },
        {
          name: 'Izumi',
          email: 'user@example.com',
          password: bcrypt.hashSync('22222'),
          isAdmin: false,
        },
      ],

    products:[
        {
            // _id: '1',      //using _ to make it compatible with mongoDB 
            // ids commented because mongoDB refers each product with its own ID
            name: 'Girl Face Aesthetic Painting',
            slug: 'girl-face-painting-decor',
            category: 'Painting',
            image: '/images/img1.jpg',
            price: 100,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            //_id: '2',
            name: 'Couple Aesthetic Painting',
            slug: 'couple-painting-decor',
            category: 'Painting',
            image: '/images/img2.jpg',
            price: 100,
            countInStock: 15,
            rating: 4,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '3',
            name: 'Line Art',
            slug: 'line-art',
            category: 'Painting',
            image: '/images/img3.jpg',
            price: 150,
            countInStock: 0,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '4',
            name: 'Set of Paintings',
            slug: 'set-of-paintings',
            category: 'Painting',
            image: '/images/img4.jpg',
            price: 800,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '5',
            name: 'Set of 3 Paintings',
            slug: 'set-of-3-paintings',
            category: 'Painting',
            image: '/images/img5.jpg',
            price: 450,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '6', 
            name: 'Boho Painting',
            slug: 'boho-painting',
            category: 'Painting',
            image: '/images/img6.jpg',
            price: 250,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '7',
            name: 'Abstract Painting set of 2',
            slug: 'abstract-painting',
            category: 'Painting',
            image: '/images/img7.jpg',
            price: 200,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '8',
            name: 'Boho Abstract set of 5',
            slug: 'boho-abstract-set',
            category: 'Painting',
            image: '/images/img8.jpg',
            price: 600,
            countInStock: 15,
            rating: 4.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '9',
            name: 'Set of Boho Prints',
            slug: 'set-of-boho-prints',
            category: 'Painting',
            image: '/images/img9.jpg',
            price: 500,
            countInStock: 15,
            rating: 3.5,
            numReviews: 10,
            description: 'desc',

        },

        {
            // _id: '10',
            name: '3pcs Abstract Pattern',
            slug: '3pcs-abstract-pattern',
            category: 'Painting',
            image: '/images/img10.jpg',
            price: 350,
            countInStock: 15,
            rating: 4,
            numReviews: 10,
            description: 'desc',

        },
    ],
};

export default data;