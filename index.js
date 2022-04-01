const express = require("express");
const port = process.env.PORT || 8080;

const app = express();

var router = express.Router();
const pictures = require("./model/models")

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);
app.listen(port, () => {console.log("Example app listening")});

const InitiateMongoServer = require("./config/database");
InitiateMongoServer();


// The method of the root url. Be friendly and welcome our user :)
router.get("/", function (req, res) {
    res.json({ message: "Welcome to the APOD app." });
});
  
router.get("/favorite", function (req, res) {
    pictures.find().then((img) => {
        res.json({result: img})
    });
    res.json({ message: "Here are the favorited items." });
});
  
router.post("/add", function (req, res) {
    var img = new pictures(req.body);
    try {
        img.save();
    } catch (e) {
        res.json({ message: "Something went wrong." });
    }
});
  
router.delete("/delete", function (req, res) {
    const date = req.body.date;
    try {
        pictures.findOneAndDelete({date});
    } catch (e) {
        res.json({ message: "Something went wrong." });
    }
    res.json({ message: "Items deleted." });
});

module.exports = router;
  
app.use("/api", router); // API Root url at: http://localhost:8080/api
  