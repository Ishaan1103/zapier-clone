import express from "express";

import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (_req, res) => {
    res.json({ "message": "Hello World!" });
});

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const userId = req.params.userId;
    const zapId = req.params.zapId;
    const body = req.body;
    // store in db a new trigger
    await client.$transaction(async (tx: any) => {
        const run = await client.zapRun.create({
            data: {
                zapId: zapId,
                metadata: body
            }
        });
        await client.zapRunOutbox.create({
            data: {
                zapRunId: run.id
            }
        })
    })

    //push it on to a queue (Kafka/redis)

    res.json({ message: "webhook recieved" })
});

app.listen(PORT, () => {
    console.log(`Server listening on localhost:${PORT}`);
});
