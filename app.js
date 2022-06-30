const express = require("express");
const { randomUUID } = require("crypto")
const fs = require("fs")

const app = express();

app.use(express.json());

let users = [];

// trazendo as informações para dentro do array de usuários.
fs.readFile("users.json", "utf-8", (err, data) => {
    if(err){
        console.log(err)
    }else{
        users = JSON.parse(data);
        // o parse está retornando os dados para objetos.
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


app.get("/users",(request, response) => {
    return response.json(users)
})

// get mais específico pegando pelo id, usando parâmetros, que seria os : em seguida do nome da rota
app.get("/users/:id",(request, response) => {
    const { id } = request.params;
    const user = users.find(users=> users.id === id);
    return response.json(user)
})

// para trazer as informaçãos que desejamos atualizar precisamos,
// além de usar o parâmetro que no caso aqui é o id, (item que vai ser alterado)
// precisamos também trazer as informações do body (informações a serem alteradas)
app.put("/users/:id", (request, response) => {
    const { id } = request.params;
    const { name, password  } = request.body;

    // utilizamos o find para percorrer o array de usuários e pegar o desejado
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
    //salvando dados
    fs.writeFile("users.json", JSON.stringify(users), (err) => {
        if(err){
            console.log(err)
        }else {
            console.log("Usuário cadastrado")
        }
    });

}
app.listen(4002, () => console.log("deu certo"));