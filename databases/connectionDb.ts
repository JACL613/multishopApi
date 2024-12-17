const mongoose = require('mongoose')
let conecctionString = process.env.DB_URI

mongoose.connect(`${conecctionString}`)
  .then(() => {
    console.log('Data bases Listening')
  })
  .catch((err: { message: any }) => {
    console.log({
      status: 400,
      error: err.message
    })
  })
