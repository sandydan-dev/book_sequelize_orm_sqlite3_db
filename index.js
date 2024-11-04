const express = require("express");
const app = express();
const port = 3000;
const { Op } = require("sequelize");
const { sequelize } = require("./lib/index");
const book = require("./models/book.track");

const randomBooks = [
  {
    name: "Advanced Data Structures",
    author: "John Doe",
    title: "Mastering Algorithms and Data Structures",
    content:
      "This book covers complex algorithms and data structures for experienced developers.",
  },
  {
    name: "Machine Learning Fundamentals",
    author: "Jane Smith",
    title: "Introduction to Machine Learning",
    content:
      "Learn the basics of machine learning and its applications in real-world scenarios.",
  },
  {
    name: "Web Development Essentials",
    author: "Bob Johnson",
    title: "Building Responsive Web Applications",
    content:
      "From HTML to CSS and JavaScript, learn how to create modern web apps.",
  },
  {
    name: "Database Design",
    author: "Alice Brown",
    title: "Relational Database Management Systems",
    content: "Understand the principles of database design and normalization.",
  },
  {
    name: "Cloud Computing",
    author: "Mike Davis",
    title: "AWS Cloud Services for Developers",
    content:
      "Learn to deploy and manage cloud-based applications using AWS services.",
  },
  {
    name: "Cybersecurity Basics",
    author: "Sarah Lee",
    title: "Protecting Your Digital World",
    content:
      "Understand fundamental cybersecurity concepts and best practices.",
  },
  {
    name: "DevOps Practices",
    author: "Tom Harris",
    title: "Implementing DevOps in Software Projects",
    content:
      "Learn to streamline software development and deployment processes.",
  },
  {
    name: "Python Programming",
    author: "Emily Chen",
    title: "Python for Beginners",
    content:
      "Discover the power of Python for data analysis, scripting, and automation.",
  },
  {
    name: "Java Script Mastery",
    author: "David Wilson",
    title: "JavaScript: From Novice to Ninja",
    content:
      "Master the art of JavaScript for both front-end and back-end development.",
  },
  {
    name: "C++ Programming",
    author: "Lisa Nguyen",
    title: "C++: A Comprehensive Guide",
    content:
      "Learn object-oriented programming with C++, including advanced topics.",
  },
  {
    name: "SQL Database Management",
    author: "Kevin White",
    title: "SQL Query Optimization Techniques",
    content:
      "Improve your SQL skills with advanced query optimization strategies.",
  },
  {
    name: "Network Administration",
    author: "Rajesh Patel",
    title: "Modern Network Architecture and Security",
    content: "Learn to design and secure modern network infrastructures.",
  },
  {
    name: "Artificial Intelligence",
    author: "Maria Rodriguez",
    title: "AI and Machine Learning for Business",
    content:
      "Apply AI and ML techniques to solve real-world business problems.",
  },
  {
    name: "Blockchain Technology",
    author: "Peter Kim",
    title: "Understanding Blockchain and Cryptocurrency",
    content:
      "Explore the fundamentals of blockchain technology and its applications.",
  },
  {
    name: "Full Stack Development",
    author: "Rebecca Taylor",
    title: "Building Full Stack Applications with React and Node.js",
    content:
      "Learn to develop complete web applications using React and Node.js.",
  },
  {
    name: "Data Science Tools",
    author: "James Martin",
    title: "Essential Data Science Libraries and Frameworks",
    content:
      "Master popular data science tools and libraries for efficient analysis.",
  },
  {
    name: "Mobile App Development",
    author: "Laura Garcia",
    title: "iOS and Android App Development for Beginners",
    content: "Learn to create mobile apps for both iOS and Android platforms.",
  },
  {
    name: "Game Development",
    author: "Michael Thompson",
    title: "Creating Interactive Games with Unity",
    content: "Design and build engaging games using Unity game engine.",
  },
  {
    name: "Internet of Things",
    author: "Sophia Patel",
    title: "IoT Device Development and Integration",
    content: "Learn to create and connect IoT devices to the internet.",
  },
];

// seeding data to database   // 🟢
app.get("/seed_book_db", async (req, res) => {
  try {
    await sequelize.sync({ force: true });
    await book.bulkCreate(randomBooks);
    res.status(200).json({ message: "Data seeding successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to seed database", error: error.message });
  }
});

// get all books from database   🟢
async function getAllBooks() {
  let query = await book.findAll();
  if (!query) {
    return null;
  } else {
    return { books: query };
  }
}
app.get("/books", async (req, res) => {
  try {
    let result = await getAllBooks();
    if (result.books.length === 0) {
      return res.status(404).json({ message: "Books data not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch books by from database  🟢
async function fetchBooksById(id) {
  let query = await book.findOne({ where: { id } });
  if (!query) {
    return null;
  } else {
    return { books: query };
  }
}
app.get("/books/details/:id", async (req, res) => {
  try {
    let id = parseInt(req.params.id);
    let result = await fetchBooksById(id);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// fetch all books by author 🟢
async function findAllBooksByAuthor(author) {
  let query = await book.findOne({ where: { author } });

  if (!query) {
    return null;
  } else {
    return { books: query };
  }
}
app.get("/books/author/:author", async (req, res) => {
  try {
    let author = req.params.author;
    let result = await findAllBooksByAuthor(author);
    if (result.books.length) {
      res.status(404).json({ message: "Book Author Not Found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// sort data by name from book database
async function sortAllBooksData(name){
  let query = await book.findAll({ order: [["name", name]] });
  if (!query) {
    return null;
  } else {
    return { books: query };
  }
}
app.get("/books/name", async (req, res) => {
  try {
    let name = req.query.name;
    let result = await sortAllBooksData(name);
    if (result.books.length === 0) {
      return res.status(404).json({ message: "Books not found" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
