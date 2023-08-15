const jsonServer = require('json-server')
const path = require('path')

const dataServer = jsonServer.create()
const newReviewsServer = jsonServer.create()

const dataMiddlewares = jsonServer.defaults({readOnly: true})
const newReviewsMiddlewares = jsonServer.defaults()

const dataRouter = jsonServer.router(path.join(__dirname, '..', 'database', 'database.json'))
const newReviewsRouter = jsonServer.router(path.join(__dirname, '..', 'database', 'new_reviews_database.json'))


dataServer.use(dataMiddlewares)
dataServer.use(dataRouter)

newReviewsServer.use(newReviewsMiddlewares)
newReviewsServer.use(newReviewsRouter)


dataServer.listen(3030, () => {
  console.log('JSON Data Server is running')
})

newReviewsServer.listen(3031, () => {
  console.log('JSON New reviews Server is running')
})
