import { findStrikes } from './crawl.js';
import { sendAlert } from './alert.js';

async function main() {
    const baseURL = 'https://www.trenitalia.com/it/informazioni/Infomobilita/notizie-infomobilita.html';
    let strikes = await findStrikes(baseURL);
    if (strikes && strikes.length > 0) {
        await sendAlert(strikes);
    }
}

main();
