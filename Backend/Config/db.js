import mongoose from 'mongoose'

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://zainabrd93:DzainB5@ecommerce-final-project.v68ca.mongodb.net/')
    console.log('DB connection established')
  } catch (error) {
    console.error('Error connecting to DB:', error.message)
  }
}