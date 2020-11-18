const express = require("express");
const app = express();
const port = 3000;
const YahooFantasy = require("yahoo-fantasy");
app.tokenCallback = () => {
    console.log("token call back");
};

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.yf = new YahooFantasy(
  process.env.KEY, // Yahoo! Application Key
  process.env.SECRET,
  app.tokenCallback,
  "https://localhost:3000/auth/yahoo/callback"
);

app.get("/auth/yahoo", (req, res) => {
    var yf = new YahooFantasy(
        process.env.KEY, // Yahoo! Application Key
        process.env.SECRET,
        app.tokenCallback,
        "https://localhost:3000/auth/yahoo/callback"
      );
      
  return yf.auth(res);
});

app.get("/auth/yahoo/callback", (req, res) => {
  app.yf.authCallback(req, (err) => {
    if (err) {
      return res.redirect("/error");
    }

    return res.send("Authed!");
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
