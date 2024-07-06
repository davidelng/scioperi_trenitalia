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
    const data = stringify(rows, {header: header, columns: columns});
    fs.writeFileSync(path, data, {encoding: 'utf-8', flag: 'a'});
}

function checkDiff(strikes) {
    const today = new Date();
    const currentDate = today.toJSON().slice(0, 10);
    const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
    const csvPath = path.join(path.resolve(process.cwd()), 'data', `${currentDate}.csv`);

    let rows = readRows(csvPath);

    if (!rows || rows.length < 1) {
        let columns = ['timestamp', 'strike'];
        rows = strikes.map(s => [`${currentDate} ${currentTime}`, s]);
        writeRows(csvPath, columns, rows, true);
        return strikes;
    }
}
