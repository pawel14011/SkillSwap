const http = require('http')
const express = require('express')
const { Server } = require('socket.io')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
require('dotenv').config()

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const offerRoutes = require('./routes/offerRoutes')
const matchRoutes = require('./routes/matchRoutes')
const adminRoutes = require('./routes/adminRoutes')
const reviewRoutes = require('./routes/reviewRoutes')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:5173', // Adres frontendu
		methods: ['GET', 'POST'],
	},
})

// Middlewares
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Rate Limiting
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minut
	max: 100, // limit 100 żądań na IP
	standardHeaders: true,
	legacyHeaders: false,
})
app.use(limiter)

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/offers', offerRoutes)
app.use('/api/matches', matchRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/admin', adminRoutes)

// Error Handler
app.use(errorHandler)

// Socket.io connection
io.on('connection', socket => {
	console.log('A user connected:', socket.id)

	socket.on('join_match_room', matchId => {
		socket.join(matchId)
		console.log(`User ${socket.id} joined room ${matchId}`)
	})

	socket.on('send_message', async data => {
		const { matchId, senderId, receiverId, content } = data

		try {
			const message = await prisma.message.create({
				data: {
					matchId,
					senderId,
					receiverId,
					content,
				},
				include: {
					sender: {
						select: { id: true, username: true, avatarUrl: true },
					},
				},
			})
			// Emit message to the specific match room
			io.to(matchId).emit('receive_message', message)
		} catch (error) {
			console.error('Error saving message:', error)
			socket.emit('error_sending_message', { error: 'Could not save message' })
		}
	})

	socket.on('disconnect', () => {
		console.log('User disconnected:', socket.id)
	})
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
