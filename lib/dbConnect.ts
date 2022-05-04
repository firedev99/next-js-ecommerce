import chalk from 'chalk'
import mongoose from 'mongoose'

const { MONGO_URI, NODE_ENV, PORT } = process.env

let _global: NodeJS.Global = {
    mongoose: {
        conn: null,
        promise: null,
    },
}

let cached = _global.mongoose

async function dbConnect() {
    if (mongoose.connection.readyState !== 1) {
        if (cached.conn) {
            return cached.conn
        }

        if (!cached.promise) {
            const opts = {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                bufferCommands: false,
            }

            cached.promise = mongoose
                .connect(MONGO_URI, opts)
                .then((client) => {
                    console.log(
                        `${chalk.green('✓')} Server running in ${chalk.bgBlue(
                            NODE_ENV
                        )} mode on port: ${chalk.underline.blue(PORT)}`
                    )
                    console.log(
                        `${chalk.green(
                            '✓'
                        )} MongoDB Connected: ${chalk.underline.magenta(
                            client.connection.host
                        )}`
                    )
                    return mongoose
                })
        }

        cached.conn = await cached.promise
        return cached.conn
    }
}

export default dbConnect
