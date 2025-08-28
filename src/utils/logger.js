class Logger {
    constructor() {
        this.colors = {
            reset: '\x1b[0m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m'
        };
    }

    _formatMessage(level, message, data = null) {
        const timestamp = new Date().toISOString();
        let formattedMessage = `[${timestamp}] [${level}] ${message}`;
        
        if (data) {
            formattedMessage += '\n' + JSON.stringify(data, null, 2);
        }
        
        return formattedMessage;
    }

    info(message, data = null) {
        console.log(
            this.colors.blue + 
            this._formatMessage('INFO', message, data) + 
            this.colors.reset
        );
    }

    error(message, data = null) {
        console.error(
            this.colors.red + 
            this._formatMessage('ERROR', message, data) + 
            this.colors.reset
        );
    }

    warn(message, data = null) {
        console.warn(
            this.colors.yellow + 
            this._formatMessage('WARN', message, data) + 
            this.colors.reset
        );
    }

    success(message, data = null) {
        console.log(
            this.colors.green + 
            this._formatMessage('SUCCESS', message, data) + 
            this.colors.reset
        );
    }

    debug(message, data = null) {
        if (process.env.NODE_ENV === 'development') {
            console.log(
                this.colors.cyan + 
                this._formatMessage('DEBUG', message, data) + 
                this.colors.reset
            );
        }
    }
}

export const logger = new Logger();