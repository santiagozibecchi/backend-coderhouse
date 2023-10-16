(function(){
    const socket = io();

    const formMessage = document.getElementById("form-message");
    const inputMessage = document.getElementById("input-message");
    const logMessage = document.getElementById("log-message");


    formMessage.addEventListener("submit", (event) => {
        event.preventDefault();

        const text = inputMessage.value;
        socket.emit("new-message", {
            username,
            text,
        });
        inputMessage.value = "";
        // apuntar al input
        inputMessage.focus();
    });

    function updateLogMessage() {
        logMessage.innerText = "";
        message.forEach( msg => {
            const parrafo = document.createElement("p");
            parrafo.innerText = `${msg.username}: ${msg.text}`;
            logMessage.appendChild(parrafo);
        });
    }

    socket.on("notification", ({ message }) => {
        updateLogMessage(message)
    });


    // from api

    // 

    socket.on("new-message-from-api", (message) => {

        console.log(message);
    })





    let username;

    Swal.fire({
        title: "Indentificate!",
        input: "text",
        inputLabel: "Ingresa tu usuario",
        allowOutsideClick: false,
        inputValidator: (value) => {
            if (!value){
                return "Necesitamos que ingrese un usuario para continuar!";
            }
        },
    }).then((result) => {
        username = result.value.trim();
        console.log(`Hola ${username}, bienvenido!`);
    }) 
})();