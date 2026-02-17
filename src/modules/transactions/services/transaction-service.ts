import { env } from "@/lib/env";
import { Transaction } from "../constants/transaction";


export const getTransactions = async () : Promise<Transaction[]> => {
    const res = await fetch(`${env.API_URL || 'https://recruitment-test.flip.id/frontend-test'}`);
    const data : Record<string, Transaction> = await res.json();
    return Object.values(data);
}