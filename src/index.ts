import express from 'express'

// constants
const port = process.env.PORT || 80

// initialize application
const app = express();
app.get('/', (_, res) => {
	res.status(200).send('Hello world!')
})

app.listen(port, () => console.log(`running express application on localhost:${port}`))

