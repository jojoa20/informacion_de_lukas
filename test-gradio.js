const { Client } = require("@gradio/client");

async function test() {
  try {
    console.log("Testing coqui/xtts...");
    const client = await Client.connect("coqui/xtts");
    console.log("Success coqui/xtts!");
  } catch (e) {
    console.error("Failed coqui/xtts:", e.message);
  }
}
test();
