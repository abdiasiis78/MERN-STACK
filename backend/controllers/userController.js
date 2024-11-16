import User from "../models/user.js";

export const UserRegisteration = async (req, res) => {
    try{
       
        const {email, userName, password} = req.body;

    const existingUser = await User.findOne({
        $or:[
            {email: email.toLowerCase()},
            {userName: userName.toLowerCase()}
        ]
    })

    if(existingUser){
        return res.status(400).send(" email or pasword alredy exists")
    }

   const userInfo = new User({
    email: email,
    userName: userName,
    password: password
   })

   await userInfo.save()
   userInfo.password = undefined

   return res.status(201).send(userInfo)

    }catch(error){
     console.log("Something went wrong",error.message)
     res.status(500).send("Registaration Error", error.message)
     
     }
    }
