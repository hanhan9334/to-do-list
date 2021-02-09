const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var items = ['Buy', 'Sell', 'Eat'];
var workItems = ['Email', 'Phone', 'Computer'];

app.get('/', (req, res) => {

    var today = new Date();
    var options = {
        weekday: "long",
        day: "numeric",
        month: 'long'
    };
    var day = today.toLocaleDateString("en-US", options);


    res.render("list", { listTitle: day, listItems: items });

})

app.post('/', (req, res) => {
    var item = req.body.listInput;
    if (req.body.list === "Work list") {
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
})

app.get('/work', (req, res) => {
    res.render('list', { listTitle: "Work list", listItems: workItems });
})

app.post('work', (res, req) => {
    var item = req.body.listInput;
    workItems.push(item);
    res.redirect('/work');
})

app.listen(3000, () => {
    console.log("Listening to port 3000.");
})