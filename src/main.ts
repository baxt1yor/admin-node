import { Bot, ForceReplyKeyboard, Keyboard, MessageOriginUser } from "gramio";
import { config } from "dotenv";
config();

const bot = new Bot(String(process.env.BOT_TOKEN));

const admin = 763563100;

// Main menu
const startKeyboard = new Keyboard()
    .text("Men haqimda ✍🏻")
    .text("Manzil 🔍")
    .row()
    .text("Xabar jo`natish 📤")
    .requestContact("Tel raqam 📞");

// Cancel/back button
const cancelBtn = new Keyboard().text("Ortga ⬅️");

// Force reply keyboard
const forceBtn = new ForceReplyKeyboard().selective();

bot.command("start", async (ctx) => {
    await ctx.sendChatAction("typing");
    await ctx.reply(`Assalomu aleykum ${ctx.chat.firstName}`, {
        parse_mode: "Markdown",
        reply_markup: startKeyboard,
    });
});

bot.on(["message"], async (ctx) => {
    await ctx.sendChatAction("typing");

    // 📌 Handle text buttons
    switch (ctx.text) {
        case "Men haqimda ✍🏻":
            await ctx.reply(
                "Mening ismim Baxtiyor, hozirda dasturchi bo'lib ishlayman 👨🏻‍💻.\n" +
                "[Instagram 🔺](https://instagram.com/baxt1yor_)\n" +
                "[Facebook 🔹](https://facebook.com/baxtiyor.eshametov)\n" +
                "Email 📧 baxtiyoreshametov@yandex.ru\n" +
                "[Batafsil](https://bit.ly/3bfrvPI)",
                {
                    parse_mode: "Markdown",
                    reply_markup: startKeyboard,
                }
            );
            break;

        case "Ortga ⬅️":
            await ctx.reply("Bosh sahifa 🏠", {
                parse_mode: "Markdown",
                reply_markup: startKeyboard,
            });
            break;

        case "Manzil 🔍":
            await ctx.sendLocation(41.285271, 61.210172, {
                reply_markup: startKeyboard,
            });
            break;

        case "Xabar jo`natish 📤":
            await ctx.reply("Xabarni kiriting:", {
                parse_mode: "Markdown",
                reply_markup: forceBtn,
                reply_parameters: { message_id: ctx.id },
            });
            break;
    }

    // 📞 Handle contact send
    if (ctx.contact?.phoneNumber) {
        await ctx.sendContact({
            chat_id: admin,
            phone_number: ctx.contact.phoneNumber,
            first_name: ctx.contact.firstName,
            last_name: ctx.contact.lastName,
        });
    }

    // 📤 Handle user reply to admin
    if (
        ctx.replyMessage?.text === "Xabarni kiriting:" &&
        ctx.chatId !== admin
    ) {
        await ctx.reply(
            "_☝🏻 Sizga shuni aytib o'tishim kerakki siz telegram sozlamalaringizdan \"Uzatilgan xabarlar\" bo‘limidan hammaga qilib qo‘yishingiz kerak, shundagina admin xabari sizga yetib keladi._\n\n" +
            "`⚙️ Sozlamalar -> Maxfiylik va xavfsizlik -> Uzatilgan xabarlar -> Hamma`\n" +
            "`⚙️ Settings -> Privacy and Security -> Forwarded Messages -> Everybody`\n" +
            "`⚙️ Настройки -> Конфиденциальность -> Пересылка сообщений -> Все`\n\n" +
            `*Sizning xabaringiz:* ${ctx.text}`,
            {
                parse_mode: "Markdown",
                reply_markup: cancelBtn,
            }
        );

        await ctx.forward({ chat_id: admin });
    }

    // 📥 Admin reply back to user
    if (
        ctx.replyMessage?.forwardOrigin instanceof MessageOriginUser &&
        ctx.chatId === admin
    ) {
        const userId = ctx.replyMessage.forwardOrigin.senderUser.id;

        if (ctx.text) {
            await ctx.send(`_Admin xabari sizga keldi:_\n${ctx.text}`, {
                chat_id: userId,
                parse_mode: "Markdown",
                reply_markup: startKeyboard,
            });
        }

        if (ctx.photo) {
            for (const file of ctx.photo) {
                await ctx.sendPhoto(file.fileId, {
                    chat_id: userId,
                    reply_markup: startKeyboard,
                });
            }
        }

        if (ctx.document) {
            await ctx.sendDocument(ctx.document.fileId, {
                chat_id: userId,
                reply_markup: startKeyboard,
            });
        }

        if (ctx.audio) {
            await ctx.sendAudio(ctx.audio.fileId, {
                chat_id: userId,
                reply_markup: startKeyboard,
            });
        }

        if (ctx.voice) {
            await ctx.sendVoice(ctx.voice.fileId, {
                chat_id: userId,
                reply_markup: startKeyboard,
            });
        }

        await ctx.reply(
            `*Javobingiz yuborildi shu ID ga:* \`${userId}\``,
            {
                parse_mode: "Markdown",
                reply_parameters: {
                    message_id: ctx.id,
                },
            }
        );
    }
});

export default bot;
