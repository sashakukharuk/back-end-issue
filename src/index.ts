import app from './app'
const PORT = process.env.PORT || 5000
import {Logger} from './logger/logger'

app.listen(PORT, () => Logger.get().info('Server running no port:' + PORT))
