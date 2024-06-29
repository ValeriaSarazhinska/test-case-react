import initSqlJs, { Database } from "sql.js";
import {Transaction} from "../src/pages/Transactions/types";

class DatabaseService {
	private db: Database | null = null;

	public async initDatabase(): Promise<Database | null> {
		try {
			const SQL = await initSqlJs({
				locateFile: (file) => `https://sql.js.org/dist/${file}`,
			});
			this.db = new SQL.Database();

			this.createTransactionsTable();

			return this.db;
		} catch (err: any) {
			console.error("Failed to initialize the database", err);
			return null;
		}
	}

	private createTransactionsTable() {
		if (!this.db) return;

		const sqlStatement = `
      CREATE TABLE IF NOT EXISTS transactions (
        TransactionId TEXT,
        Status TEXT,
        Type TEXT,
        ClientName TEXT,
        Amount TEXT
      );
    `;
		this.db.run(sqlStatement);
	}


	public getDb(): Database | null {
		return this.db;
	}

	public getAllTransactions(): any[] | null {
		if (!this.db) return [];

		const sqlStatement = `SELECT * FROM transactions;`;
		const result = this.db.exec(sqlStatement);
		return result[0]?.values.map(([id, status, type, clientName, amount]: any) => ({
			id,
			status,
			type,
			clientName,
			amount,
		})) || [];
	}

	public setTransactions(transactions: Transaction[]): void {
		if (!this.db) return;
		transactions.forEach((transaction) => {
			this.setTransaction(transaction);
		});
	}

	public setTransaction(transactionData: Transaction): void {
		if (!this.db) return;

		const { id, status, type, clientName, amount } = transactionData;

		const existingTransaction = this.getTransactionById(id);
		if (existingTransaction) {
			const sqlStatement = `
                UPDATE transactions
                SET Status = '${status}', Type = '${type}', ClientName = '${clientName}', Amount = '${amount}'
                WHERE TransactionId = '${id}'
            `;
			this.db.run(sqlStatement);
		} else {
			const sqlStatement = `
                INSERT INTO transactions (TransactionId, Status, Type, ClientName, Amount)
                VALUES ('${id}', '${status}', '${type}', '${clientName}', '${amount}')
            `;
			this.db.run(sqlStatement);
		}
	}

	private getTransactionById(id: string): any[] | null {
		if (!this.db) return null;

		const sqlStatement = `SELECT * FROM transactions WHERE TransactionId = ${id};`;
		const result = this.db.exec(sqlStatement);

		return result[0]?.values || null;
	}

	public deleteTransactionById(id: string): void {
		if (!this.db) return;

		const sqlStatement = `
            DELETE FROM transactions WHERE TransactionId = '${id}';
        `;
		this.db.run(sqlStatement);
	}

	public updateTransactionStatus(id: string, status: string): void {
		if (!this.db) return;

		const sqlStatement = `
            UPDATE transactions
            SET Status = '${status}'
            WHERE TransactionId = '${id}'
        `;
		this.db.run(sqlStatement);
	}
}

export default new DatabaseService();
