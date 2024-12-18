import {catchAsyncErrors} from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../middleware/errorMiddleware.js";
import { User } from "../models/userSchema.js";
import {generateToken}from "../utils/jwtToken.js";

export const patientRegister=catchAsyncErrors(async(req,res,next)=>{
    const{
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,role,
    
    }=req.body;
    if(
    !firstName ||
    !lastName ||
    !email ||
    !phone||
    !password||
    !gender ||
    !dob||
    !nic||
    !role
    ){
        return next(new ErrorHandler("please fill full form!",400));

    }
    let user=await User.findOne({email});
    if(user){
        return next(new ErrorHandler("user Already registerd",400));

    }
    user=await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    nic,role,
    });
    generateToken(user,"user Registered",200,res);

   
    
});

export const login =catchAsyncErrors(async(req,res,next)=>{
const{email,password,confirmPassword,role}=req.body;
if(!email || !password || !confirmPassword|| !role){

return next(new ErrorHandler("please provide all details",400))

}

if(password!==confirmPassword){
    return next(new ErrorHandler("password and confirm password do not match",400));
}
const user=await User.findOne({email}).select("+password");
if(!user){
    return next(new ErrorHandler("invlid password or Email",400));

}

const isPasswordMatched=await user.comparePassword(password);
if(!isPasswordMatched){
    return next(new ErrorHandler("wrong password or email"));
}

if(role!==user.role){
    return next(new ErrorHandler("user not this role",400));
}
generateToken(user,"user Login successfull",200,res);

});

export const addNewAdmin=catchAsyncErrors(async(req,res,next)=>{
    const{
        firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
    }=req.body;
    if(
        !firstName ||
        !lastName ||
        !email ||
        !phone||
        !password||
        !gender ||
        !dob||
        !nic
        ){
            return next(new ErrorHandler("please fill full form!",400));
        }
        const isRegistered=await User.findOne({email});
        if(isRegistered){
            return next(new ErrorHandler(`${isRegistered.role} with this email already exists!`));

        }
        const admin=await User.create({
            firstName,
        lastName,
        email,
        phone,
        password,
        gender,
        dob,
        nic,
        role:"Admin",
        });
        res.status(200).json({
            success:true,
            message:"new admin registered",
        });
});

export const getAllDoctors=catchAsyncErrors(async(req,res,next)=>{
const doctors=await User.find({role:"Doctor"});
res.status(200).json({
    success:true,
    doctors,
});
});

export const getUserDetails=catchAsyncErrors(async(req,res,next)=>{
const user=req.user;
res.status(200).json({
    success:true,
    user,
});
});

export const logoutAdmin=catchAsyncErrors(async(req,res,next)=>{

res.status(200).cookie("adminToken","",{
httpOnly:true,
expires:new Date(Date.now()),


}).json({
    success:true,
    message:"Admin user logout successfully",
});
});

export const logoutPatient=catchAsyncErrors(async(req,res,next)=>{

    res.status(200).cookie("patientToken","",{
    httpOnly:true,
    expires:new Date(Date.now()),
    
    
    }).json({
        success:true,
        message:"patient logout successfully",
    });
    });

    export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
        if (!req.files || Object.keys(req.files).length === 0) {
          return next(new ErrorHandler("Doctor Avatar Required!", 400));
        }
        const { docAvatar } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
        if (!allowedFormats.includes(docAvatar.mimetype)) {
          return next(new ErrorHandler("File Format Not Supported!", 400));
        }
        const {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password,
          doctorDepartment,
        } = req.body;
        if (
          !firstName ||
          !lastName ||
          !email ||
          !phone ||
          !nic ||
          !dob ||
          !gender ||
          !password ||
          !doctorDepartment ||
          !docAvatar
        ) {
          return next(new ErrorHandler("Please Fill Full Form!", 400));
        }
        const isRegistered = await User.findOne({ email });
        if (isRegistered) {
          return next(
            new ErrorHandler(`${isRegistered.role}With This role Already Exists!`, 400)
          );
        }
        const cloudinaryResponse = await cloudinary.uploader.upload(
          docAvatar.tempFilePath
        );
        if (!cloudinaryResponse || cloudinaryResponse.error) {
          console.error(
            "Cloudinary Error:",
            cloudinaryResponse.error || "Unknown Cloudinary error"
          );
          return next(
            new ErrorHandler("Failed To Upload Doctor Avatar To Cloudinary", 500)
          );
        }
        const doctor = await User.create({
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password,
          role: "Doctor",
          doctorDepartment,
          docAvatar: {
            public_id: cloudinaryResponse.public_id,
            url: cloudinaryResponse.secure_url,
          },
        });
        res.status(200).json({
          success: true,
          message: "New Doctor Registered",
          doctor,
        });
      });


