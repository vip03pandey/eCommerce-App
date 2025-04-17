const mongoose=require('mongoose')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        match:[/.+\@.+\..+/,"Please enter a valid email"]
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true
    },
    role:{
        type:String,
        required:true,
        enum:["customer","admin"],
        default:"customer"
    },
    
},{timestamps:true})

// password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); // fixed line
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});



// Match User entered password with the password in the database
userSchema.methods.matchPassword=async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

module.exports=mongoose.model('User',userSchema)