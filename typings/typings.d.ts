declare global {
    namespace NodeJS {
        interface ProcessEnv {
            MONGO_URI: string
            NODE_ENV: 'development' | 'production'
            PORT: string
            JWT_KEY: string
            NEXT_PUBLIC_CLOUDINARY_API: string
        }
        interface Global {
            mongoose: {
                conn: any
                promise: any
            }
        }
    }
}

// interface MongoConnection = {
//     client: MongoClient
//     db: Db
// }

// mongoose: {
//     conn: MongoConnection | null
//     promise: Promise<MongoConnection> | null
// }

export {}
