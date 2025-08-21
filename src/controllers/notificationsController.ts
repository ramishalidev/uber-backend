import { Messaging } from "node-appwrite";
import { client } from "../middlewares/appWrite";
const messaging = new Messaging(client);

async function sendPush() {
  try {
    const push = await messaging.createPush(
      "unique()",
      "🔥 New Notification!",
      "You just received a push!",
      ["*"]
    );

    console.log("Push sent:", push);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error("Error:", errorMessage);
  }
}

sendPush();
