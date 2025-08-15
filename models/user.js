import mongoose from 'mongoose'

mongoose.connect("mongodb://127.0.0.1:27017/testapp1");

const userSchema = mongoose.Schema({
    name: {
        type: String,
    }
    , email: {
        type: String,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
    }
})


export default mongoose.model('User',userSchema);