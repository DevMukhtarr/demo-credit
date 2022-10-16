import { Request, Response } from "express";
import "dotenv/config";
import { db } from "../../knexfile";

export const fundWallet = async (req: Request, res: Response) =>{
    try {
        const { amount } = req.body
        const id = res.locals.user.user_id

        const balance = await db('users').select('demowallet').where({
            id: id
        })

        const username_indb = await db('users').where({
            id: id
        })

        const username = JSON.parse(JSON.stringify(username_indb))[0].username

        const balance_value = JSON.parse(JSON.stringify(balance))[0].demowallet
        
        await db('users').where({
            id: id
        }).update({
            demowallet: balance_value + amount
        })

        await db('transaction_history').insert({
            username: username,
            transaction_reference: "funded wallet",
            credit: amount,
            debit: 0,
            balance: balance_value + amount
        })
    
        return res.status(200).json({
            status: true,
            message:"Wallet Funded successfully"
        });
    } catch (error) {
        return res.status(500).json({
            status: true,
            message:"An error occured" + error
    })
}
}

export const transferFunds = async (req: Request, res:Response) =>{
    try {
        const { username, amount } = req.body
        const id = res.locals.user.user_id
    
        const receiver = await db('users').where({
            username: username
        })
    
        const sender = await db('users').where({
            id: id
        })

        const sender_username = JSON.parse(JSON.stringify(sender))[0].username
        console.log(receiver)
        const receiver_username = JSON.parse(JSON.stringify(receiver))[0].username
    
        if(receiver.length == 0){
            return res.status(424).json({
                status: false,
                message: "receiver username does not exist"
        })
    }
    
    if( sender_username == username ){
            return res.status(424).json({
                status: false,
                message: "cannot send to self"
        })  
    }else{
        const receiver_balance = JSON.parse(JSON.stringify(receiver))[0].demowallet
        const sender_balance = JSON.parse(JSON.stringify(sender))[0].demowallet
    
        if(sender_balance < amount){
            return res.status(424).json({
                status: false,
                message: "insufficient balance"
        })
        }
    
        await db('users').where({
           id: id
        }).update({
            demowallet:  sender_balance - amount
        })
    
        await db('users').where({
            username: username
        }).update({
            demowallet: receiver_balance + amount
        })

        if ( sender_username ){
            await db('transaction_history').insert({
                username: sender_username,
                transaction_reference: "transferred funds",
                credit: 0,
                debit: amount,
                balance: sender_balance + amount
            })
        }

        if ( receiver_username ){
            await db('transaction_history').insert({
                username: receiver_username,
                transaction_reference: "received funds from " + sender_username,
                credit: amount,
                debit: 0,
                balance: receiver_balance + amount
            })
        }

        return  res.status(200).json({
            status: true,
            message:"Transferred successfully"
        });
    }   
    } catch (error) {
        return  res.status(500).json({
            status: false,
            message:"An error occured" + error
        });
    }
}

export const withdrawFunds = async (req: Request, res:Response) => {

    try {
        const { amount } = req.body

        const id = res.locals.user.user_id

        const user = await db('users').where({
            id: id
        })

        const user_balance = JSON.parse(JSON.stringify(user))[0].demowallet
        const username = JSON.parse(JSON.stringify(user))[0].username

        if( amount > user_balance ){
            return res.status(424).json({
                status: false,
                message:"insufficient balance"
            });
        }

        await db('users').where({
            id: id
         }).update({
             demowallet:  user_balance - amount
         })

         await db('transaction_history').insert({
            username: username,
            transaction_reference: "made withdrawal of " + amount + " demo credit",
            credit: 0,
            debit: amount,
            balance: user_balance - amount
        })

         return res.status(200).json({
            status: true,
            message:"withdrawal successful"
        });

        
    } catch (error) {
        return  res.status(500).json({
            status: false,
            message:"An error occured"
        })
    }
}