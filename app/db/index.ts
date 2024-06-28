import  initSqlJs, {Database} from "sql.js";

export const initDatabase = async () => {
    try {
        const SQL = await initSqlJs({ locateFile: file => `https://sql.js.org/dist/${file}` });
        const database = new SQL.Database();

        createTransactionsTable(database)
        insertDefaultTransactions(database)
    } catch (err: any) {
        return null;
    }
};

const createTransactionsTable = (db: Database) => {
    const sqlStatement = `
      CREATE TABLE IF NOT EXISTS transactions (
        TransactionId INTEGER PRIMARY KEY,
        Status TEXT,
        Type TEXT,
        ClientName TEXT,
        Amount REAL
      );
    `;
    db.run(sqlStatement);

};

const insertDefaultTransactions = (db: Database) => {
    const sqlStatement = `
      INSERT INTO transactions (TransactionId, Status, Type, ClientName, Amount)
      VALUES (1, 'Pending', 'Withdrawal', 'Dale Cotton', 28.43);
    `;
    db.run(sqlStatement);
};
