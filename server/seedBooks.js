const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const sampleBooks = [
  { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', description: 'A classic American novel set in the Jazz Age', price: 12.99, image: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300' },
  { title: 'To Kill a Mockingbird', author: 'Harper Lee', description: 'A gripping tale of racial injustice and childhood innocence', price: 14.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300' },
  { title: '1984', author: 'George Orwell', description: 'A dystopian social science fiction novel', price: 13.99, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=300' },
  { title: 'Pride and Prejudice', author: 'Jane Austen', description: 'A romantic novel of manners', price: 11.99, image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300' },
  { title: 'The Catcher in the Rye', author: 'J.D. Salinger', description: 'A story about teenage rebellion and alienation', price: 10.99, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300' }
];

const books = [];
for (let i = 0; i < 50; i++) {
  const book = sampleBooks[i % 5];
  books.push({
    ...book,
    title: `${book.title} ${i > 4 ? `(Edition ${Math.floor(i / 5) + 1})` : ''}`,
  });
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bookplatform')
  .then(async () => {
    console.log('MongoDB connected');
    await Book.deleteMany({});
    await Book.insertMany(books);
    console.log('50 books added successfully');
    process.exit();
  })
  .catch(err => {
    console.log('Error:', err);
    process.exit(1);
  });
