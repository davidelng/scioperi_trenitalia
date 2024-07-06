# Trenitalia news crawler

Since I'm sick and tired of losing trains in this country because they get canceled at the last minute due to strikes or malfunctions, I made a script that crawls the train service info page and send a message to my Telegram.

Their app won't even send a push notification and the only message you'll get it's a SMS, but only if you already have a ticket when the announcement is made.

Also, they have some APIs, but are literally unusable.

This script (based on [this web crawler](https://github.com/davidelng/webcrawler)) is meant to be used as a cronjob but can be converted into a serverless lambda.

The script logs its operations into log files and saves data into csv files, that are read on each execution to prevent sending the same information several times.
