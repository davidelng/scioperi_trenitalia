import fs from 'fs'
import path from 'path';
import { logger } from './logger.js';
import { parse } from 'csv-parse/sync'
import { stringify } from 'csv-stringify/sync'

function readRows(path) {
    if (!fs.existsSync(path)) {
        return false;
    }
    let data = fs.readFileSync(path, {encoding: 'utf-8'})
    let rows = parse(data, {delimiter: ";", from_line: 2});
    return rows;
}

function writeRows(path, columns, rows, header = false) {
    const data = stringify(rows, {header: header, columns: columns, delimiter: ';'});
    fs.writeFileSync(path, data, {encoding: 'utf-8', flag: 'a'});
}

function addStrikesToCSV(csvPath, strikes, header) {
    const today = new Date();
    const currentDate = today.toJSON().slice(0, 10);
    const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

    let columns = ['timestamp', 'strike'];
    let rows = strikes.map(s => [`${currentDate} ${currentTime}`, s]);

    logger.info(`Adding ${strikes.length} new strikes`);
    writeRows(csvPath, columns, rows, header);
}

function checkDiff(strikes) {
    const currentDate = new Date().toJSON().slice(0, 10);
    const csvPath = path.join(path.resolve(process.cwd()), 'data', `${currentDate}.csv`);

    let rows = readRows(csvPath);

    if (!rows || rows.length < 1) {
        addStrikesToCSV(csvPath, strikes, true);
        return strikes;
    }

    rows = rows.map(row => row[1]);
    let newStrikes = strikes.filter(s => !rows.includes(s));
    if (newStrikes.length) {
        addStrikesToCSV(csvPath, newStrikes, false);
        return newStrikes;
    }

    logger.info('No new strikes found');
    return false;
}

function createMessage(strikes) {
    let message = "Nuovi scioperi\n\n";
    for (let s of strikes) {
        message += s + "\n\n";
    }
    return message;
}

export { checkDiff, createMessage }