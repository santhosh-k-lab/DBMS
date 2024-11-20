import mongoose from "mongoose";

export const dbconnection=()=>{
    mongoose.connect(process.env.MONGO_URI,
        {
        dbName : "Hospital_management_system"
    }).then(()=>{
        console.log("connected to database")
    }).catch(err=>{
        console.log(`some error occured while connecting to dstsbase:${err}`)
    })
};
    