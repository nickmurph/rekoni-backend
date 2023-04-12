const express = require('express');
const app = express();


app.get('/', (req,res) => {
    res.send('root working')
})

app.post('/signin', (req,res) => {
    res.json("signing in")
})



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
