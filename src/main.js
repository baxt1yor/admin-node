"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gramio_1 = require("gramio");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const bot = new gramio_1.Bot(String(process.env.BOT_TOKEN));
const admin = 763563100;
const startKeyboard = new gramio_1.Keyboard()
    .text('Men haqimda ✍🏻')
    .text('Manzil 🔍')
    .row()
    .text('Xabar jo`natish 📤')
    .requestContact('Tel raqam 📞');
const cancelBtn = new gramio_1.Keyboard().text('Ortga ⬅️');
const forceBtn = new gramio_1.ForceReplyKeyboard().selective();
bot.command("start", async (context) => {
    await context.sendChatAction("typing", { chat_id: context.chat.id });
    await context.send("Assalomu aleykum " + context.chat.firstName, {
        chat_id: context.chat.id,
        parse_mode: "Markdown",
        reply_markup: startKeyboard
    });
});
bot.on(["message"], async (context) => {
    await context.sendChatAction("typing", { chat_id: context.chat.id });
    if (context.text === 'Men haqimda ✍🏻') {
        await context.send("Mening ismim Baxtiyor hozirda dasturchi bo'lib ishlayman👨🏻‍💻.\n[Instagram 🔺](https://instagram.com/baxt1yor_)\n\n [Facebook 🔹](https://facebook.com/baxtiyor.eshametov)\n Email 📧 baxtiyoreshametov@yandex.ru \n [Batafsil](https://bit.ly/3bfrvPI)", {
            chat_id: context.chat.id,
            parse_mode: "Markdown",
            reply_markup: startKeyboard
        });
    }
    if (context.text === 'Ortga ⬅️') {
        await context.send("Bosh sahifa 🏠", {
            chat_id: context.chat.id,
            parse_mode: "Markdown",
            reply_markup: startKeyboard
        });
    }
    if (context.text === 'Manzil 🔍') {
        await context.sendLocation(41.285271, 61.210172, {
            chat_id: context.chat.id,
            reply_markup: startKeyboard
        });
    }
    if (context.text === 'Xabar jo`natish 📤') {
        await context.send("Xabarni kiriting:", {
            chat_id: context.chat.id,
            parse_mode: "Markdown",
            reply_markup: forceBtn,
            reply_parameters: {
                message_id: context.id
            }
        });
    }
    if (context.contact?.phoneNumber) {
        await context.sendContact({
            chat_id: admin,
            phone_number: context.contact.phoneNumber,
            first_name: context.contact.firstName,
            last_name: context.contact.lastName
        });
    }
    if (context.replyMessage?.text === "Xabarni kiriting:" && context.chatId != admin) {
        await context.send("_☝🏻 Sizga shuni aytib o'tishim kerakki siz telegram sozlamalaringizdan \"Uzatilgan xabarlar\" bolimdan hammaga qilib qoyishingiz kerak shundagina admin xabari sizga yetib keladi_\n\n `⚙️ Sozlamalar->Maxfiylik va havfsizlik->Uzatilgan xabarlar->Hamma` \n\n `⚙️ Settings->Privacy and Security->Forwarded Messages->Everybody` \n\n `⚙️ Настройки->Конфиденциальность-Пересылка сообщений->Все` \n\n\n*Sizning xabringiz:* " + context.text, {
            chat_id: context.chat.id,
            parse_mode: "Markdown",
            reply_markup: cancelBtn,
        });
        await context.send(context.chat.id, {
            chat_id: admin
        });
        await context.forward({
            chat_id: admin,
            from_chat_id: context.chatId,
            message_id: context.id
        });
    }
    if (context.replyMessage?.forwardOrigin instanceof gramio_1.MessageOriginUser && context.chatId == admin) {
        if (context.text) {
            await context.send("_Admin xabari sizga keldi_ \n" + context.text, {
                chat_id: context.replyMessage.forwardOrigin.senderUser.id,
                parse_mode: "Markdown",
                reply_markup: startKeyboard
            });
        }
        if (context.photo) {
            for (const file of context.photo) {
                await context.sendPhoto(file.fileId, {
                    chat_id: context.replyMessage.forwardOrigin.senderUser.id,
                    parse_mode: "Markdown",
                    reply_markup: startKeyboard
                });
            }
        }
        if (context.document) {
            await context.sendDocument(context.document.fileId, {
                chat_id: context.replyMessage.forwardOrigin.senderUser.id,
                parse_mode: "Markdown",
                reply_markup: startKeyboard
            });
        }
        if (context.audio) {
            await context.sendAudio(context.audio.fileId, {
                chat_id: context.replyMessage.forwardOrigin.senderUser.id,
                parse_mode: "Markdown",
                reply_markup: startKeyboard
            });
        }
        if (context.voice) {
            await context.sendVoice(context.voice.fileId, {
                chat_id: context.replyMessage.forwardOrigin.senderUser.id,
                parse_mode: "Markdown",
                reply_markup: startKeyboard
            });
        }
        await context.send("*Javobingiz yuborildi shu id ga* \n" + context.replyMessage.forwardOrigin.senderUser.id, {
            chat_id: admin,
            parse_mode: "Markdown",
            reply_parameters: {
                message_id: context.id
            }
        });
    }
});
exports.default = bot;
