const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser')
const upload = require('multer')
const app = express()

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "petals&presents",
})

app.get('/', (request, response) => {
    return response.json("Starting the NODE SERVER...")
})

app.listen(8081, () => {
    console.log("Listening")
})

//fetch orders
app.get('/orders', (request, response) => {
    const sql = "SELECT * FROM orders";
    db.query(sql, (error, data) => {
       if (error) return response.json(error);
        return response.json(data);
    })
})

// Define a route to calculate the total order price
app.get('/calculate-total', async (req, res) => {
  try {
    // Execute a database query to calculate the total order price using SUM(order_price)
    const totalResult = await db.query('SELECT SUM(order_price) AS total FROM orders');

    // Extract the total amount from the query result
    const totalAmount = totalResult.rows[0].total;

    // Send the total amount as the response
    res.json({ totalAmount });
  } catch (error) {
    console.error('Error calculating total order price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//login
app.post("/login", (request, response) => {
  const { email, password, role } = request.body;
  const sql = "SELECT user_id, firstName, role FROM accounts WHERE email = ? AND password = ?";
  db.query(sql, [email, password, role], (error, data) => {
    if (error) {
      console.error("Error during login:", error);
      return response.json({
        success: false,
        error: "An error occurred. Please try again later.",
      });
    }

    if (data.length > 0) {
      const { user_id, firstName, role } = data[0];
      return response.json({ success: true, user_id, firstName, role });
    } else {
      return response.json({
        success: false,
        error: "Invalid credentials. Please try again.",
      });
    }
  });
});

//products to orders table
app.post('/add_to_cart', (request, response) => {
    const { order_name, order_description, order_price } = request.body
    const sql = 'INSERT INTO orders (order_name, order_description, order_price) VALUES (?, ?, ?)';
    db.query(sql, [order_name, order_description, order_price], (error, result) => {
        if (error) {
      console.error('Error inserting order:', error);
      response.status(500).send('An error occurred while adding the order');
      return;
    }
    response.send('Order Successfully Added');
  });
});

app.post('/add_product', (request, response) => {
    const { productName, productDesc, price } = request.body
    const   sql = 'INSERT INTO products (productName, productDesc, price) VALUES (?, ?, ?)';
    db.query(sql, [productName, productDesc, price], (error, result) => {
        if (error) throw error
        response.send('Product Successfully Added')
    })
})

app.put('/products/:productID', (request, response) => {
    const productID = request.params.productID;
    const { productName, productDesc, price } = request.body
    const sql = "UPDATE products SET productName = ?, productDesc = ?, price = ? WHERE productID = ?";
    db.query(sql, [productName, productDesc, price, productID], (error, result) => {
        if (error) throw error
        response.send("Product Successfully Updated")
    });
});

app.delete("/products/:productID", (request, response) => {
    const productID = request.params.productID;
    const sql = "DELETE FROM products WHERE productID = ?"
    db.query(sql, [productID], (error, result) => {
         if (error) {
      console.error("Error deleting product", error);
      response
        .status(500)
        .json({ success: false, error: "Internal Server Error" });
    } else {
      console.log("Product Successfully Deleted");
      response.json({ success: true });
    }
  });
});

app.get('/product-images', (req, res) => {
  connection.query('SELECT id, productImage FROM products', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching product images');
      return;
    }
    const products = results.map(product => ({
      id: product.id,
      productImage: product.productImage ? `data:image/jpeg;base64,${product.productImage.toString('base64')}` : null
    }));
    res.json(products);
  });
});


app.get('/products', (request, response) => {
    const sql = "SELECT * FROM products";
    db.query(sql, (error, data) => {
       if (error) return response.json(error);
        return response.json(data);
    })
})

app.get('/accounts', (request, response) => {
    const sql = "SELECT * FROM accounts";
    db.query(sql, (error, data) => {
        if (error) return response.json(error);
        return response.json(data);
    })
})

app.post('/register', (request, response) => {
    const { firstName, lastName, email, password } = request.body
    const   sql = 'INSERT INTO accounts (firstName, lastName, email, password) VALUES (?, ?, ?, ?)';
    db.query(sql, [firstName, lastName, email, password], (error, result) => {
        if (error) throw error
        response.send('Registration Successful')
    })
})

app.post('/login', (request, response) => {
    const sql = "SELECT FROM accounts WHERE email = ? AND password = ?"
    db.query(sql, [request.body.email, request.body.password], (error, result) => {
        if (error) return response.json({ Message: "Error inside server" })
        if (result.length > 0) {
            request.session.role = result[0].role
            return response.json({Login: true})
        } else {
            return response.json({Login: false})
        }
    })
})

