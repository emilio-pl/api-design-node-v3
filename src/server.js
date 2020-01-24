import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')
app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

router.get('/router', (req, res) => {
	res.json({ me: 'holis' })
})

// app.use(router) // another way to implement it
// the difference is that it won't have /api as route
app.use('/api', router)

app.get('/data', (req, res) => {
	res.send({ message: 'holis' })
})

app.post('/data', (req, res) => {
	console.log(req.body)
	res.send({ message: 'okay' })
})

app.get(/^(me)[A-Za-z]*/, (req, res) => {
	res.send({ message: 'entrando a me' })
})

app.get('/user*', (req, res) => {
	res.send({ message: req.route })
})

app.get('/:id/nice', (req, res) => {
	res.send({ message: req.params })
})

export const start = () => {
	app.listen(3000, () => {
		console.log('server is on port 3000')
	})
}
