let { books } = require("../data");

module.exports.createBook = (req, res) => {
    const bookDetails = req.body;
    try {
        books.push(bookDetails);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Something happened", error: error.message });
    }
};

module.exports.addBook = (req, res) => {
    const { event_title, event_data, event_location } = req.body;
    console.log("from addBook!");
    books.push({ id: 3, title: event_title });
    res.render("books", { books });
};

module.exports.getBookAddForm = (req, res) => {
    res.render("newBook");
};

module.exports.getAllBooks = (req, res) => {
    try {
        res.status(200).json({ message: "Books fetched successfully!", books });
        // res.render("books", { books });
    } catch (error) {
        res.status(500).json({ message: "Something happened", error: error.message });
    }
};

module.exports.bookById = (req, res) => {
    try {
        const bookId = req.params.bookId;
        const book = books.find((book) => book.id == bookId);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: "Book not found!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something happened", error: error.message });
    }
};

module.exports.updateBook = (req, res) => {
    try {
        const bookId = req.params.bookId;
        const updateContent = req.body.author;

        const updatedBooks = books.map((book) => {
            if (book.id == bookId) {
                book.author = updateContent;
            }
            return book;
        });

        books = updatedBooks;
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: "Something happened", error: error.message });
    }
};

module.exports.deleteBook = (req, res) => {
    const bookId = req.params.bookId;
    try {
        const uBooks = books.filter((book) => book.id != bookId);
        books = uBooks;
        res.status(200).json(books);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something happened", error: error.message });
    }
};
