import mysql from "mysql2"
import { MongoClient } from 'mongodb'
import { DB_INSERT_RESPONSE, DB_SELECT_RESPONSE } from "../../types/database/db.response.types"
import { CUSTOMER, CUSTOMER_ACTION } from "src/types/customer/customer.types"
// import { CUSTOMER_ACTION } from "../../types/database/customer.types"
// import { AUTH_CLIENT_DTO } from "../../types/auth/client.dto.type"


export abstract class Database {
  dbHost?: string
  dbName: string
  dbUser: string
  dbPassword: string
  db: mysql.Connection | MongoClient

  constructor(db: mysql.Connection | MongoClient) { this.db = db }

  public abstract insertData(): Promise<DB_INSERT_RESPONSE | Promise<() => DB_INSERT_RESPONSE>>;
  public abstract selectData(): Promise<DB_SELECT_RESPONSE >;
  public abstract selectMultiplyData(): Promise<DB_SELECT_RESPONSE> | Promise<() => Promise<DB_SELECT_RESPONSE>[]>;
  public abstract updateData(): Promise<DB_INSERT_RESPONSE | boolean>;
  public abstract deleteData(): Promise<boolean>;

}



// // CustomerDb -> is a CustomerDatabaseService abstract class 
// export abstract class CustomerDb {

//   constructor(){}

//   // for the getUserData request 
//   public abstract getDataByFilter(dto: AUTH_CLIENT_DTO | CUSTOMER_ACTION): Promise<DB_SELECT_RESPONSE>;

//   // // save user action data by each interaction
//   // public abstract saveDataByFilter(dto: action): Promise<DB_INSERT_RESPONSE>;
//   // // for the signUpNewUser request 
//   // public abstract saveDataByFilter(dto: userDto): Promise<DB_INSERT_RESPONSE>;
  

//   // // for the revoke access request
//   // public abstract deleteDataByFilter(key: string): Promise<boolean>;
//   // // for the delete user action history request 
//   // public abstract deleteDataByFilter(actionHistory: action): Promise<boolean>;
// }


// // WalletDb -> is a WalletDatabaseService abstract class 
// export abstract class WalletDb {

//   constructor(){}

//   // should update ------------->>
//   public abstract getDataByFilter(userEmail: string): Promise<boolean>;
//   public abstract getDataByFilter(dto: userDto): Promise<DB_SELECT_RESPONSE>;
//   public abstract getDataByFilter(actionHistory: action): Promise<DB_SELECT_RESPONSE>;

//   public abstract saveDataByFilter(dto: action): Promise<DB_INSERT_RESPONSE>;
//   public abstract saveDataByFilter(dto: userDto): Promise<DB_INSERT_RESPONSE>;
  
//   public abstract deleteDataByFilter(key: string): Promise<boolean>;
//   public abstract deleteDataByFilter(actionHistory: action): Promise<boolean>;
// }