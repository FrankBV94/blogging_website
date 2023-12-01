/** Node modules */
import moment from "moment"
import { v4 as uuid } from 'uuid'
import fs from "fs"
import { promises } from "fs"
import path from "path"

const logEvents = async (message, logName) => {
  const dateTime = `${moment().format("DD-MM-YYYY hh:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await promises.mkdir(path.join(__dirname, "..", "logs"));
    }

    await promises.appendFile(
      path.join(__dirname, "..", "logs", logName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t${req.headers.origin}\t${req.url}`, "reqLog.txt");
  console.log(`${req.method} ${req.path}`);
  next();
};

module.exports = { logger, logEvents };
