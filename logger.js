import Pino from 'pino';
import fs from 'fs';

const currentDate = new Date().toJSON().slice(0, 10);

const streams = [
    {
        level: 'info',
        stream: fs.createWriteStream(`./logs/${currentDate}.log`, { flags: 'a' }),
      },
      {
        level: 'error',
        stream: fs.createWriteStream(`./logs/${currentDate}.log`, { flags: 'a' }),
      },
];

const logger = Pino({level:'info'},Pino.multistream(streams));

export { logger }