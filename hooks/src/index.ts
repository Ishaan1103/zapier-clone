import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ "message": "Hello World!" });
});

app.post("/hooks/catch/:userId/:zapId", (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;

});

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});
