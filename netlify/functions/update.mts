import type { HandlerContext, HandlerEvent } from "@netlify/functions";
import bot from "../../src/main.js"
export default async (event: HandlerEvent, context: HandlerContext) => {
  try {
    if (event.body) {
      const update = JSON.parse(event.body ?? "");

      await bot.default.init();
      await bot.default.updates.handleUpdate(update);

      return new Response('Update received and handled');
    }
  } catch (error) {
    console.error('Error processing update:', error);
  }
}