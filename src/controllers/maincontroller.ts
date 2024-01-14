import { Request, Response } from "express";
import User from "../models/user";
import Transaction from "../models/transaction";
import "dotenv/config";

export const fundWallet = async (req: Request, res: Response) =>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            status: true,
            message:"An error occured" + error
    })
}
}

export const transferFunds = async (req: Request, res:Response) =>{
    try {
      
    } catch (error) {
        return  res.status(500).json({
            status: false,
            message:"An error occured" + error
        });
    }
}

export const withdrawFunds = async (req: Request, res:Response) => {

    try {
        
    } catch (error) {
        return  res.status(500).json({
            status: false,
            message:"An error occured"
        })
    }
}