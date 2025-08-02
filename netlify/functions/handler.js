"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const main_1 = __importDefault(require("@src/main"));
let isBotInitialized = false;
const handler = async (event) => {
    try {
        const update = JSON.parse(event.body || "{}");
        if (!isBotInitialized) {
            await main_1.default.init();
            isBotInitialized = true;
        }
        await main_1.default.updates.handleUpdate(update);
        return {
            statusCode: 200,
            body: "OK",
        };
    }
    catch (err) {
        console.error("Telegram bot error:", err);
        return {
            statusCode: 500,
            body: "Error handling update",
        };
    }
};
exports.handler = handler;
