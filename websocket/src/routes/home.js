import { Router } from "express";
import { emitFromApi } from "../socket.js";

const router = Router();

router.get("/", (req, res) => {

    // renderiza chat.handlebars
    res.render("home")
});


router.post("/", (req, res) => {

    emitFromApi("new-message-from-api", {username: "api", text: ""})

});


export default router;