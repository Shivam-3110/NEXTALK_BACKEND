import bcrypt from "bcryptjs";
import { generateToken } from "../../utils/jwt.js";
import cloudinary from "../../config/cloudinary.js";
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
// controller to update user profile..
export const updateUserProfile = async(req,res)=>{
    try {
        const {profilePic,fullName,bio} = req.body ;
        const userId = req.user._id ;
        let updateUser ;
        if(!profilepic){
            await user.findByIdAndUpdate(userId,{bio,fullName},{new:true});
        }
        else{
            const upload = await cloudinary.uploader.upload(profilePic);
            updateUser = await user.findByIdAndUpdate(userId,{profilePic:upload.secure_url,bio,fullName},{new:true});
        }
        res.json({user:updateUser,message:"Profile Updated Successfully"})

    } catch (error) {
        console.log(error.message);
          res.json({message:"Profile Updated Successfully"})
    }
}
export const checkAuth = (req, res) => {
  res.json({ user: req.user });
};