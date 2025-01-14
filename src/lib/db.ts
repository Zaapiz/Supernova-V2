import { MongoClient } from "mongodb";
let client: MongoClient;
if (process.argv[2] == "Docker") {
  client = new MongoClient("mongodb://mongodb:27017");
} else {
  client = new MongoClient("mongodb://mongodb:27017");
  // client = new MongoClient("mongodb://127.0.0.1:27017");
}

export {client}