const {createLogger, transports, format} = require("winston");
const {combine, timestamp, printf, label} = format;

const printFormat = printf(({timestamp, label, level, message}) => {
    return `${timestamp} [${label}] ${level} : ${message}`;
});

const printLogFormat = combine(
    // colorize(),
    label({
        label: "simple-login"
    }),
    timestamp({
        format: "YYYY-mm-dd"
    }),
    printFormat
);

// 개발중일 때는 보통 파일로도 출력하고 콘솔로도 출력함
const opts = {
    file: new transports.File({
        dirname: "./log",
        filename: "access_winston.log",
        level: "info",
        format: printLogFormat
    }),
    console: new transports.Console({
        level: "info",
        format: printLogFormat
    })
}

const logger = createLogger({
    transports: [opts.file]
});

// 프로젝트가 개발 중인 서버라면 콘솔에도 로그 출력
if (process.env.NODE_ENV !== "production") {
    logger.add(opts.console);
}

module.exports = logger;