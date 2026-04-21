
export function mapMeta() {
    return {
        server_time: new Date().toISOString(),
        enviroment: process.env.NODE_ENV || 'development',
    }
}