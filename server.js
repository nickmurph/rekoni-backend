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
            password: "banana",
            entries: 0,
            joined: new Date() 
        }
    ]
}

//middleware
app.use(express.json());


//routes
app.get('/', (req,res) => {
    res.send('root working')
})

app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email &&
        req.body.password === database.users[0].password){
            res.json('success');
    } else {
        res.status(400).json('error logging in');
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
