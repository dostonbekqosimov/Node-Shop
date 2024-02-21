const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {

  User
    .findById("65d335c30c7fd12d8eff806b")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

async function startServer() {
  try {
    await mongoose.connect('mongodb+srv://Doston:8SMVcdkNmReLQnpC@cluster0.93ql6xb.mongodb.net/shop?retryWrites=true&w=majority');

    const existingUser = await User.findOne({ email: 'doston@qosim.com' });

    if (existingUser) {
      console.log("User already exists!");
    } else {
      const user = new User({
        name: "Doston",
        email: 'doston@qosim.com',
        cart: {
          items: []
        }
      });
      await user.save();
      console.log("User created successfully!");
    }

    app.listen(3000, () => {
      console.log("I am working here");
    });
  } catch (err) {
    console.error(err);
  }
}
startServer();



