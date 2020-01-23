import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

const log = (req, res, next) => {
	console.log('logging')
	req.mydata = 'hello11'
	next()
}

app.get('/data', log, (req, res) => {
	res.send({ message: req.mydata })
})

app.post('/data', (req, res) => {
	console.log(req.body)
	res.send({ message: 'okay' })
})

app.get(/^(me)[A-Za-z]*/, log, (req, res) => {
	res.send({ message: 'entrando a me' })
})

app.get('/user*', log, (req, res) => {
	res.send({ message: req.route })
})

app.get('/:id/nice', log, (req, res) => {
	res.send({ message: req.params })
})

export const start = () => {
	app.listen(3000, () => {
		console.log('server is on port 3000')
	})
}
