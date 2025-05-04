export const errorHandler = (err,req,res,next)=>{

    let error = {...err}
    error.message = err.message

    if(err.name === 'ValidationError'){
        const msg = Object.values(err.errors).map((e)=>e.message)
        error = new Error(msg)
    }

    if(err.name === 'CastError'){
        const message = `Resource not Found ${err.path}`
        error = new Error(message)
    }

    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} not allowed`
        error = new Error(message)
    }

    res.json({
        message: error.message,
        success:false,
    })
}