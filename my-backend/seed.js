const mongoose = require("mongoose");
const data = require("./data.json");
mongoose.connect("mongodb://localhost:27017/<ABC>>").then(async () => {
  await mongoose.connection.db.collection("<ABC>>").deleteMany({});
  await mongoose.connection.db.collection("<ABC>").insertMany(data);
  console.log("Database Seeded!");
  process.exit(0);
});
