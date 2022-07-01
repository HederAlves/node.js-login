const http = require("http");

http
    .createServer((request, response) => {
        response.writeHead(200, { 'Content-Type': 'application/json' });

        if(request.url === '/register'){
            response.end(JSON.stringify({
                message: "Rota concluída"
            }))
        }
        response.end(JSON.stringify({
            message: "Error rota não existe"
        }))
    })
    .listen(4001, () => console.log("Servidor está ativo"))
