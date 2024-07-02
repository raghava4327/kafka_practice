const { kafka } = require("./client");
console.log(kafka)
async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");
  admin.connect();
  console.log("Admin Connection Success...");

  console.log("Creating Topic [text-messages]");
  await admin.createTopics({
    topics: [
      {
        topic: "text-messages",
        numPartitions: 2,
      },
    ],
  });
  console.log("Topic Created Success [text-messages]");

  console.log("Disconnecting Admin..");
  await admin.disconnect();
}

init();