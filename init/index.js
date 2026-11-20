const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  
  // Map through the data to extract just the image URL string
  const formattedData = initData.data.map((obj) => ({
    ...obj,
    image: obj.image.url, 
  }));

  await Listing.insertMany(formattedData);
  console.log("data was initialized");
};

initDB();