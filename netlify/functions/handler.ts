import {Handler, HandlerEvent} from "@netlify/functions";
import bot from "@src/main";

let isBotInitialized = false;


export const handler: Handler = async (event: HandlerEvent) => {
    try {
        const update = JSON.parse(event.body || "{}");

        if (!isBotInitialized) {
            await bot.init();
            isBotInitialized = true;
        }

        await bot.updates.handleUpdate(update);
        return {
            statusCode: 200,
            body: "OK",
        };
    } catch (err) {

        console.error("Telegram bot error:", err);
        return {
            statusCode: 500,
            body: "Error handling update",
        };
    }
};