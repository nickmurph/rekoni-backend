const express = require('express');
const app = express();


//dummy database for testing
const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: "cookies",
            entries: 0,
            joined: new Date() 
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gmail.com',
            password: "bananas",
            entries: 0,
            joined: new Date() 
        }
    ]
}

//middleware
app.use(express.json());


//routes
app.get('/', (req,res) => {
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success');
    } else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req,res) => {
    const {email, name, password} = req.body;
    const newID = String(Number(database.users[database.users.length-1].id) + 1);
    database.users.push({
        id: newID,
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date() 
    })
    res.json(database.users[database.users.length-1])
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    let found = false;
    database.users.forEach(user => {
        if (user.id === id) {
            found = true;
            return res.json(user);
        } 
    })
    if (!found){
        res.status(400).json("no such user");
    }
})



//listening on port 3000
app.listen(3000, () => {
    console.log('app running on port 3000')
});



/* TODO: implement these routes
/(root) -> res = root working
/signin  -> POST, respond w/ success/fail
/register -> POST, respond w/ user
/profile/:userid -> GET, respond w/ user
/image -> PUT, respond w/ user or userCount
*/
