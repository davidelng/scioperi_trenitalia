import fs from 'fs';
import path from 'path';
import Pino from 'pino';

const currentDate = new Date().toJSON().slice(0, 10);
const logPath = path.join(path.resolve(process.cwd()), 'logs', `${currentDate}.log`);

const streams = [
    {
        level: 'info',
        stream: fs.createWriteStream(logPath, { flags: 'a' }),
      },
      {
        level: 'error',
        stream: fs.createWriteStream(logPath, { flags: 'a' }),
      },
];

const logger = Pino({level:'info'},Pino.multistream(streams));

export { logger }