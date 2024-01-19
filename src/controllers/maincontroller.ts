import { Request, Response } from "express";
import User from "../models/user";
import { Transaction, TransactionType } from "../models/transaction";
import { transactions } from "../config/testtransactions";
import { generateTransactionReference } from "../config/utils";
import axios from "axios";
import "dotenv/config";
const config = process.env;

const squadcoPrivateKey = config.SQUADCOPRIVATEKEY;

const headers = {
            Authorization: `Bearer ${squadcoPrivateKey}`,
          };
export const testUser = async (req: Request, res: Response) =>{
    const user = res.locals.user
    console.log(user)
}
export const makeSingleTransfer = async (req: Request, res: Response) =>{
    try {
            const transfer = await axios.post(`https://sandbox-api-d.squadco.com/payout/transfer`, {
                "remark": "Second single transaction test",
                "bank_code":"000013",
                "currency_id": "NGN",
                "amount": "10000",
                "account_number":"0123456789",
                "transaction_reference":"SBLYDJBXZZ_123478",
                "account_name":"BOLUS PAUL"
            }, { headers })
           
            if(transfer.status == 200){
                return res.status(200).json({
                    status: true,
                    message:"Transfer Sucessful",
                    data: {
                        success: transfer.data
                    }
                });
            }else if(transfer.status == 401){
                return res.status(401).json({
                    status: false,
                    message:"Unauthorized"
                });
            }else if(transfer.status == 403){
                return res.status(403).json({
                    status: false,
                    message: "Forbidden",
                });
            }

        } catch (error) {
            console.log(error.response)
        return res.status(500).json({
            status: false,
            message:"An error occured " + error,
        });
    }
}

export const getBalance = async (req: Request, res: Response,) => {
    try {
        const user_id = res.locals.user.user_id;

        const user = await User.findById(user_id);

        const balance = user.balance;

        return res.status(200).json({
            status: true,
            message:"An error occured ",
            data: {
                balance
            }
        });
    } catch (error) {
        return res.status(500).json({
            status: false,
            message:"An error occured " + error,
        });
    }
}

export const makeMultipleTransactions = async (req: Request, res: Response) =>{
    try {
        const batchSize = 5;
        const batchTransactions = async (transactions, batchSize) => {
            for (let i = 0; i < transactions.length; i += batchSize) {
              const batch = transactions.slice(i, i + batchSize);
              await sendBatch(batch);
            }
          };
          
          const sendBatch = async (batch) => {
            const responses = [];
            for (const transaction of batch) {
              try {
                const makeTransaction = await axios.post('https://sandbox-api-d.squadco.com/payout/transfer', transaction, {
                  headers,
                });
          
                responses.push({
                  status: makeTransaction.status,
                  data: makeTransaction.data,
                });
              } catch (error) {
                responses.push({
                  status: error.response ? error.response.status : 500,
                  error: error.message,
                });
              }
            }
          
            return responses;
          };
          
          batchTransactions(transactions, batchSize);

    } catch (error) {
        return res.status(500).json({
            status: false,
            message:"An error occured " + error 
        })
    }
}

export const fundWallet = async (req: Request, res: Response) =>{
    const { amount } = req.body;
    const headers = {
        Authorization: `Bearer ${squadcoPrivateKey}`,
      }
      const user = res.locals.user
      const transactionReference = generateTransactionReference();
    try {
        const sendMoney = await axios.post(`https://sandbox-api-d.squadco.com/transaction/initiate`, {
            "amount": parseFloat(amount)*100,
            "email": user.email,
            "currency":"NGN",
            "initiate_type": "inline",
            "transaction_ref": transactionReference,
            "callback_url":"http://squadco.com"
        }, { headers });

        if(sendMoney.status == 200){
            await User.findByIdAndUpdate(
                user.user_id,
                { $inc: { balance: amount } }
                )

            await Transaction.create({
                user: user.user_id,
                type: TransactionType.FUNDING,
                amount: parseFloat(amount),
                transactionReference: transactionReference,
                description: "Funding successful"
            })

            return res.status(200).json({
                status: true,
                message:"Transaction Processing, Follow checkout url to complete transaction",
                data: {
                    info: sendMoney.data
                }
            });
        }else if(sendMoney.status == 401){
            return res.status(401).json({
                status: false,
                message:"Unauthorized"
            });
        }else if(sendMoney.status == 400){
            return res.status(400).json({
                status: false,
                message: "Bad request",
            });
        }
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