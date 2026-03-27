require('dotenv').config({ path: '.env.local' });
const { Client } = require("@gradio/client");

async function testSpace(name) {
  try {
    console.log("Testing " + name + "...");
    const client = await Client.connect(name, { hf_token: process.env.HUGGINGFACE_API_KEY });
    console.log("Success " + name + "!");
    return true;
  } catch (e) {
    console.error("Failed " + name + ":", e.message);
    return false;
  }
}

async function run() {
  await testSpace("coqui/xtts");
}

run();
