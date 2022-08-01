const express = require("express");
const { randomUUID } = require("crypto")
const fs = require("fs")
const cors = require("cors")


const app = express();

app.use(cors());
app.use(express.json());

let users = [];

fs.readFile("users.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }else{
        users = JSON.parse(data);
    }
} );

app.post("/users", (request, response) => {

    const { name, password  } = request.body;

    const user = {
        name,
        password,
        id: randomUUID(),
    }

    users.push(user)
    usersFile()

    return response.json(user)
})


app.get("/users",(_request, response) => {
    return response.json(users)
})

app.get("/users/:id",(request, response) => {
    const { id } = request.params;
    const user = users.find(users=> users.id === id);
    return response.json(user)
})

app.put("/users/:id", (request, response) => {
    const { id } = request.params;
    const { name, password  } = request.body;

    const usersIndex = users.findIndex(user => user.id === id)
    users[usersIndex] = {
        ...users[usersIndex],
        name,
        password,
    };

    usersFile()

    return response.json({message: "Atualizado"})
})

app.delete("/users/:id",(request, response) => {
    const { id } = request.params;
    const usersIndex = users.findIndex(user => user.id === id)

    users.splice(usersIndex, 1)
    usersFile()

    return response.json({ message: "Deletado"})

})

function usersFile() {

    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if(err){
            console.log(err)
        }else {
            console.log("Usuário cadastrado")
        }
    });

}
app.listen(3030, () => console.log("http://localhost:3030/users"));