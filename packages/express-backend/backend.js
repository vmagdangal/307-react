import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

const users = { 
    users_list : [
        { 
            id : 'xyz789',
            name : 'Charlie',
            job: 'Janitor',
        },
        {
            id : 'abc123', 
            name: 'Mac',
            job: 'Bouncer',
        },
        {
            id : 'ppp222', 
            name: 'Mac',
            job: 'Professor',
        }, 
        {
            id: 'yat999', 
            name: 'Dee',
            job: 'Aspring actress',
        },
        {
            id: 'zap555', 
            name: 'Dennis',
            job: 'Bartender',
        },
        {
            "id": "qwe123",
            "job": "Zookeeper",
            "name": "Cindy"
        }
    ]
}

const findUserByName = (name) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name); 
}

const findUserByNameAndJob = (name, job) => { 
    return users['users_list']
        .filter( (user) => user['name'] === name)
            && ( (user) => user['job'] === job);
}

const findUserById = (id) =>
    users['users_list']
        .find( (user) => user['id'] === id);

const addUser = (user) => {
    user.id = String(Math.floor(100000 + Math.random() * 900000)); //looked up how to generate a 6-digit integer
    users['users_list'].push(user);
    return user;
}

// CONSTS OVER -----------------------------------------

app.use(cors());
app.use(express.json());

// GETS -----------------------------------------
app.get('/users', (req, res) => { //get users
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
app.get('/users', (req, res) => { //get users with name and job
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});
app.get('/users/:id', (req, res) => { //get users specified with id
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined) {
        res.status(404).send('Resource not found.');
    } else {
        res.send(result);
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/users', (req, res) => {
    res.send(users);
});

// POSTS -----------------------------------------
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    if (userToAdd != undefined) {
        addUser(userToAdd);
        res.status(201).send('Object inserted.');
    }
});

// DELETES -----------------------------------------
app.delete('/users/:id', (req, res) => {
    //console.log(req.params.id)
    const index = users['users_list'].indexOf(findUserById(req.params.id))
    console.log(`removing id ${req.params.id} at index ${index}`)
    users['users_list']
        .splice(index, 1);
    res.status(204).send('Object deleted.');
});

// LISTEN
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  