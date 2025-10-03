import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt";
export const signup = async()=>{
    const {email,fullName,password,bio} = req.body;
    try {
        if(!email || !fullName || !password|| !bio){
            return res.status(400).json({msg:"All fields are required"})
           const user = await userModel.findOne({
            email:email.toLowerCase()
           })
           if (user){
            return res.status(400).json({msg:"User already exists"})
        }
    }
     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password,salt);
     const newuser = await user.create({
        fullName , email,password:hashedPassword,bio
     });
     const token = generateToken(newuser._id);

     res.json({UserData:newuser,token,message:"account created Sucessfully"})
  }  catch (error) {
    console.log(error.message)
        res.json({message:"Signup Failed"})
    }
}

// controller for login
export  const login = async(req,res)=>{
    try {
        const {email,password} = req.body ;
        const UserData = await user.findOne({
            email
        })
      const isPasswordCorrect = await bcrypt.compare(process , UserData.password)
      if(!isPasswordCorrect){
       return  res.send({message:"Invalid Password"});
      }

      const token = generateToken(UserData._id)
    } 
    catch (error) {
        console.log(error.message)
        res.json({message:"Signup Failed"})
    }
}