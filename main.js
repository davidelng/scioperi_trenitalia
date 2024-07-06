import { findStrikes } from './src/crawl.js';
import { sendAlert } from './src/alert.js';
import { checkDiff, createMessage } from './src/util.js';

async function main() {
    const baseURL = 'https://www.trenitalia.com/it/informazioni/Infomobilita/notizie-infomobilita.html';
    let strikes = await findStrikes(baseURL);
    if (strikes && strikes.length) {
        let diff = checkDiff(strikes);
        if (diff && diff.length) {
            let msg = createMessage(diff);
            await sendAlert(msg);
        }
    }
}

main();
