// index.js
import express from "express";
import bodyParser from "body-parser";

// Reads the PORT value from the environment variable `PORT`.
// If not found, uses the default value of 3000.
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.get("/", (request, response) => {
  console.log("Homepage");
  response.send(`
  <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body>
        <h1>Welcome to the Home Page</h1>
        <a href="/login">Login</a>
        <a href="/echo/hello">echo hello</a>
        <a href="/echo/secret">echo secret</a>
        <a href="/echo/my-account">My acccount</a>

      </body>
    </html>
  `);
});

app.get("/echo/:message", (request, response) => {
  const message =
    request.params.message === "secret"
      ? "The secret is... 42!"
      : request.params.message;
  response.send(message);
});

app.get("/login", (request, response) => {
  console.log("Login page");
  response.send(`
    <html>
      <head>
        <link rel="stylesheet" type="text/css" href="/styles.css">
      </head>
      <body>
        <h1>Login</h1>
        <form action="/login" method="post">
          <label>Email:</label>
          <input type="text" name="email" required autocomplete="username"><br>
          <label>Password:</label>
          <input type="password" name="password" required autocomplete="current-password"><br>
          <input type="submit" value="Login">
        </form>
      </body>
    </html>
  `);
});

app.post("/login", (request, response) => {
  const { email, password } = request.body;

  if (!email || !password) {
    response.json({ success: false });
  } else if (email === "user@email.com" && password === "very-secret") {
    response.json({ success: true });
  } else {
    response.json({ success: false });
  }
});

app.get("/my-account", (request, response) => {
  response.send("<h1>My Account</h1>");
});

app.get("/error", (request, response) => {
  response.send("<h1>Something went wrong with your request</h1>");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
