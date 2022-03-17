import express from 'express';
import { body } from 'express-validator'
import {
    getAllBooks,
    createBook,
    getBookById,
    deleteBook,
    updateAllBookDetails,
    updateBookDetails
} from '../controllers/books.js';

const router = express.Router();

/**
 * @api {get} /books
 * Get All Books
 */

router.get('/', getAllBooks);


/**
 * @api {post} /books
 * Create New Book
 */
router.post('/',
    body('name').isString(),
    body('category').isString(),
    body('description').isString(),
    body('author').isString(),
    body('isbn').isString(),
    body('price').isNumeric(),
    body('classification').custom((value) => {
        if (value === 'FICTION'|| value === 'COMIC' || value === 'ADVENTURE' ||
            value === 'MYSTERY'||
            value === 'TRAVEL' || value === 'HEALTH' ) {
            return true
        }
       else{
            throw new Error('Sorry Classification value is not matched');
        }
    }),
    createBook);


/**
 * @api {get} /books/{:id}
 * Get Book Details By Id
 */
router.get('/:id', getBookById);

/**
 * @api {delete} /books/{:id}
 * Delete Book Details By Id
 */
router.delete('/:id', deleteBook);

/**
 * @api {put} /books/{:id}
 * Update Book Details By Id
 */
router.put('/:id',
    body('name').isString(),
    body('category').isString(),
    body('description').isString(),
    body('author').isString(),
    body('isbn').isString(),
    body('price').isNumeric(),
    body('classification').custom((value) => {
        if (value === 'FICTION'|| value === 'COMIC' || value === 'ADVENTURE' ||
            value === 'MYSTERY'||
            value === 'TRAVEL' || value === 'HEALTH' ) {
            return true
        }
        else{
            throw new Error('Sorry Classification value is not matched');
        }
    }),
    updateAllBookDetails);

/**
 * @api {patch} /books/{:id}
 * Patch Book Details By Id
 */
router.patch('/:id',
    body('author').isString(),
    body('price').isNumeric(),
    body('classification').custom((value) => {
        if (value === 'FICTION'|| value === 'COMIC' || value === 'ADVENTURE' ||
            value === 'MYSTERY'||
            value === 'TRAVEL' || value === 'HEALTH' ) {
            return true
        }
        else{
            throw new Error('Sorry Classification value is not matched');
        }
    }),
    updateBookDetails);

export default router;
