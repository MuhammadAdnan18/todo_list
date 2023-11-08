const express = require("express");
const bodyParser = require("body-parser");
const { dirname } = require("path/posix");
const { default: mongoose } = require("mongoose");
constmongoose = require("mongoose");
const app = express();

//to use EJS first install EJS:npm install ejs
//and then sset view wngine to ejs
//for ejs to work properly we have to create a ejs template file which should be created inside a views directory
//ejs template is in html format
//so copy all the ocde form html files into list.ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.connect(
  "mongodb+srv://Admin:abbottabad18@cluster0.fvlusjk.mongodb.net/todolistDB"
);

const itemsSchema = {
  name: String,
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "welcome to do list",
});

const item2 = new Item({
  name: "hit + button to add new item",
});

const item3 = new Item({
  name: "<-- hit this button to delete item",
});

const items = [];

const defaultItems = [item1, item2, item3];

app.get("/", function (req, res) {
  //Date() is a js library which tells the day of week BUT as a number ie: Monday =1 sunday =0 ,saturday=6

  //so we will use "day" as word to be replace in template if its saturday or sunday than(day=weekend else day=weekday)
  /*
    var day = "";

  if (today.getDay() === 6 || today.getDay() === 0) {
    day = "weekend";
    //u can send this back to browser in the form of html just add html tags in the bracket and if u want to send multiple lines use res.write instead of res.send
    // res.sendFile(__dirname + "/index.html");

    //here we can use res.sendfile  and create multiple response html files for each day but it will be much more painful os we create a ejs template
    res.render("list", { day: day });
  } else {
    day = "weekday";
    res.render("list", { day: day });
  DO THIS FOR EACH DAY
 
  }
  switch (currentday) {
    case 0:
      day = "Sunday";
      break;

    case 1:
      day = "Monday";
      break;

    case 2:
      day = "Tuesday";
      break;

    case 3:
      day = "Wednesday";
      break;

    case 4:
      day = "Thursday";
      break;

    case 5:
      day = "Friday";
      break;

    case 6:
      day = "Saturday";
      break;
  }
  //the methodbused above works fine but we can display a better version of date by using .tolocaldatestring for this we first need to create option object
*/

  var option = { weekday: "long", month: "long", day: "numeric" };
  async function myItems() {
    const items = await Item.find();
    if (items.length === 0) {
      Item.insertMany(defaultItems)
        .then(function () {
          console.log("succes");
        })
        .catch(function (err) {
          console.log(err);
        });
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItems: items });
    }

    items.forEach(function (items) {});
  }
  myItems();
});

app.post("/", function (req, res) {
  const itemName = req.body.newItem;

  const item = new Item({
    name: itemName,
  });
  item.save();
  res.redirect("/");
});

app.post("/delete", function (req, res) {
  const ID = req.body.checkbox;
  Item.findByIdAndDelete(ID).then(function () {
    console.log("deleted");
  });
  res.redirect("/").catch(function (err) {
    console.log(err);
  });
});

app.listen("3000", function () {
  console.log("running");
});
