const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
  const message= line
    await producer.send({
      topic: "text-messages",
      messages: [
        {
          partition: (message.toLowerCase().includes("hi") || message.toLowerCase().includes("hello")) ? "Greeting messages" : "Other messages",
          key: "messageUpdate",
          value: JSON.stringify({ message }),
        },
      ],
    });
  }).on("close", async () => {
    await producer.disconnect();
  });
}
init()