import app from './app'
const PORT = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000
import {Logger} from './logger/logger'

app.listen(PORT, () => Logger.get().info('Server running no port:' + PORT))
