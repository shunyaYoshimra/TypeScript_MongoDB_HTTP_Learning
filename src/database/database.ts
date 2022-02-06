import { MongoClient, Db } from 'mongodb'
import { postSchema } from '../models/post.model';
import { userSchema } from "../models/user.model";

let DB: Db;

export const connectToTheDatabase = async () => {
const url = "mongodb://localhost:27017/";
try {
  var client = await MongoClient.connect(url);
  console.log("Successfully Connected!");
} catch (error) {
  throw error;
}
  DB = client.db("sample");
  createSchema();
};

export const getDatabase = (): Db | void => {
  if (DB) {
    return DB;
  } else {
    console.log("データベースのコネクションはありません");
    return;
  }
};

export const createSchema = async () => {
  userSchema();
  postSchema();
};