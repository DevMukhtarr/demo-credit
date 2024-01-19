import mongoose, { Schema, Document } from 'mongoose';

// Enum representing transaction types
enum TransactionType {
  FUNDING = 'FUNDING',
  MONEY_TRANSFER = 'MONEY_TRANSFER',
}

interface ITransaction extends Document {
  user: string;
  type: TransactionType;
  amount: number;
  description?: string;
  recipients?: string[]; 
  timestamp: Date;
  transactionReference: string;
}

const transactionSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: [TransactionType.FUNDING, TransactionType.MONEY_TRANSFER],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  recipients: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
  },
  transactionReference: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);

export { Transaction, TransactionType };