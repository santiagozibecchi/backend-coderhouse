import { Router } from "express";
// import { emitFromApi } from "../socket.js";

const router = Router();

router.get("/", (req, res) => {
  res.render("realtimeProducts");
});

// router.post("/", async (req, res) => {
//   emitFromApi("add-new-product", newProduct);
// });

export default router;
