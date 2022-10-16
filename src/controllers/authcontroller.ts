import "dotenv/config";
import { db } from "../../knexfile";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { Request, Response } from "express";
import { inspector } from "../../knexfile";
// new user sign up
export const signUp = async (req:Request, res:Response) => {
    const { firstname, lastname, username, email, password, confirm_password } = req.body

    if(!(firstname && lastname && email && password && confirm_password)){
        return res.status(400).send("All inputs are required");
    }

    if( password !== confirm_password){
        return res.status(409).json({
            status: false,
            message:"Password and confirm password does not match"
        });
        
    }

    const encryptedPassword = await bcrypt.hash(password, 12)
    // olduser 
    const Olduser = await db.select('email').from('users').where({email: email})

    if(Olduser.length == 1){
        return res.status(424).json({
            status: false,
            message:"user with this email exists"
        });
    }


    const newUser = await db('users')
            .insert({
                firstname: firstname,
                lastname: lastname,
                username: username,
                email: email,
                password: encryptedPassword
        })

    const jwt_token = jwt.sign({
        user_id: newUser[0],
        email: email
    }, process.env.JWT_TOKEN_KEY, {
        expiresIn: "365d",
    })
    
    return res.status(200).json({
        status: true,
        message:"New user created succesfully",
        access_token: jwt_token
    });
}

// signin 
export const signIn = async (req: Request, res: Response) =>{
    
    const { email, password } = req.body

    // validating user input
    if (!(email && password)) {
        return res.status(400).send("All inputs are required");
      }

    const user = await db.select('*').from('users').where({email: email})

    if(user.length == 0){
        return res.status(409).json({
            status: false,
            message:"Incorrect email or password"
        });
    }
    
    const email_indb = JSON.parse(JSON.stringify(user))[0].email
    
    if(email_indb == email){
        const password_indb = JSON.parse(JSON.stringify(user))[0].password
        const id_indb = JSON.parse(JSON.stringify(user))[0].id
        if (await bcrypt.compare(password, password_indb)){
            const jwt_token = jwt.sign({
                user_id: id_indb,
                email: email
            }, process.env.JWT_TOKEN_KEY, {
                expiresIn: "365",
            })
            
            return res.status(200).json({
                status: true,
                message:"user signed in succesfully",
                access_token: jwt_token
            }); 
        }
        return res.status(424).json({
            status: false,
            message:"Incorrect email or password"
        });
    }
}