const { Telegraf, Markup } = require('telegraf')
require('dotenv').config()
const text = require('./const')

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply(`Привет ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!`))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('freedom', async (ctx) => {
    try{
        await ctx.replyWithHTML('<b>Кнопки</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Кнопка 1', 'btn_1'), Markup.button.callback('Кнопка 2', 'btn_2')],
                [Markup.button.callback('Кнопка 1', 'btn_1'), Markup.button.callback('Бабло', 'btn_3')]
            ]
        ))

    } catch(e) {
        console.error(e)
    }

})

bot.action('btn_3', async (ctx) => {
    try{
        await ctx.answerCbQuery()
        await ctx.replyWithHTML('Клиенты где?!', {
            disable_web_page_preview: true
        })
    } catch(e) {
        console.error(e)
    }
})




bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))