const qrcode = require("qrcode-terminal");
const spawn = require("child_process").spawn;




const { Client, LocalAuth,Chat} = require("whatsapp-web.js");
const chat = new Chat;
const client = new Client({
  authStrategy: new LocalAuth(),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("message", (message) => {
  msg = message.body;
  fromm = message.from;//message is from chat or a group
  sender_name = message.notifyName;
  type_of_msg = message.hasMedia;
  if (fromm.endsWith('@c.us') && type_of_msg == false){
    const pythonProcess = spawn('python',["try.py",msg]);

    console.log(msg)
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());

    if (data != "Null"){
      message.reply(data.toString());
    }

    const pp_new = spawn('python',["write.py",sender_name,msg,data.toString()])
    
  });
    
  }
  
 
  
  
  
    
   
});


// client.on("message", (message) => {
//   message.reply("LOL")
// });

// ------------------------ mention all the people in a group -------------------------

// client.on("message", async (msg) => {
//   if (msg.body === "trying our bot") {
//     const chat = await msg.getChat();

//     let text = "";
//     let mentions = [];

//     for (let participant of chat.participants) {
//       const contact = await client.getContactById(participant.id._serialized);

//       mentions.push(contact);
//       text += `@${participant.id.user} `;
//     }

//     await chat.sendMessage(text, { mentions });
//   }
// });

client.on("ready", () => {
  console.log("your bot is ready to listen message");
});

client.initialize();