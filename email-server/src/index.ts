import express, { Request, Response } from "express";
import { Queue } from "bullmq";
import cors from "cors";

const queue = new Queue("email-sender-queue", {
    connection: {
        host: "localhost",
        port: 6379,
    },
});

const app = express();
app.use(
    cors({
        origin: "*",
    })
);
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.post("/get-emails", async (req: Request, res: Response): Promise<any> => {
    try {
        const emails = req.body.emails;

        if (!Array.isArray(emails)) {
            return res
                .status(400)
                .send("Invalid request. Expected 'emails' to be an array.");
        }

        for (const email of emails) {
            if (!email.emailId) {
                console.warn("Skipping invalid email object:", email);
                continue;
            }

            await queue.add("email", email);
        }

        res.send("Emails added to the queue.");
    } catch (err) {
        console.error("Failed to enqueue emails:", err);
        res.status(500).send("Internal Server Error");
    }
});
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});