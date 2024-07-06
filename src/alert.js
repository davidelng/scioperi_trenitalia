import { logger } from './logger.js';

async function sendAlert(message) {
    let telegramToken = process.env.TELEGRAM_TOKEN;
    let telegramChatId = process.env.TELEGRAM_CHAT_ID;
    let url = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${telegramChatId}&parse_mode=Markdown&text=${encodeURIComponent(message)}`;
    let res = await fetch(url);
    if (res.status >= 400) {
        logger.error(`Got HTTP error on Telegram, code: ${res.status}`);
    }
}

export { sendAlert }