const User=require("../model/user")
const mongoose=require("mongoose")


const updateUser = async (req,res)=>{
    try{
        const id=req.params.id
        const data= await User.findByIdAndUpdate(id,req.body,{new:true})
        console.log(data)
        if(data){
            res.status(200).json({
                data:data,
                userId:data.id,
                success:true
            })
        }
    }catch(error){
        res.status(500).json({
            success:false,
            message:"user not updated"
        })
    }
}



module.exports={updateUser}