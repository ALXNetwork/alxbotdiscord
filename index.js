const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
	console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
	client.user.setActivity(`he looked at ALX Network's channel`);
	});
	
client.on("guildCreate", guild => {
	console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
	client.user.setActivity(`he looked at ALX Network's channel`);
	});

client.on("guildDelete", guild => {
	console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
	client.user.setActivity(`he looked at ALX Network's channel`);
	});


client.on("message", async message => {

	if(message.author.bot) return;
	
	if(message.content.indexOf(config.prefix) !== 0) return;
	
		const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
		
		const command = args.shift().toLowerCase();
	
	if(command === "ping") {
		const m = await message.channel.send("Ping?");
		m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
	}
	
		if(command === "nemesys") {
		const m = await message.channel.send("NemeSyS?");
		message.channel.send("Aaa, ALXNetwork! Pai daca tot l-ai mentionat.. aboneaza-te la el! =D");
	}
  
	if(command === "say") {
		const sayMessage = args.join(" ");
		message.delete().catch(O_o=>{}); 
		message.channel.send(sayMessage);
	}
  
	if(command === "purge") {
		let messagecount = parseInt(args[1]) || 1;
		var deletedMessages = -1;
		message.channel.fetchMessages({limit: Math.min(messagecount + 1, 100)}).then(messages => {
			messages.forEach(m => {

				if (m.author.id == bot.user.id) {
					m.delete().catch(console.error);
					deletedMessages++;
					}
					});
					}).then(() => {

				if (deletedMessages === -1) deletedMessages = 0;
				message.channel.send(`:white_check_mark: Purged \`${deletedMessages}\` messages.`)
					.then(m => m.delete(2000));
					}).catch(console.error);
	}
  
	if(command === "kick") {
		if(!message.member.roles.some(r=>["@Overlord", "@Support"].includes(r.name)) )
			return message.reply("Sorry, you don't have permissions to use this!");
			
			let member = message.mentions.members.first() || message.guild.members.get(args[0]);
		
		if(!member)
			return message.reply("Please mention a valid member of this server");

		if(!member.kickable) 
			return message.reply("I cannot kick this user! Do they have a higher role? Do I have kick permissions?");
		
			let reason = args.slice(1).join(' ');
		if(!reason) reason = "No reason provided";
    
	await member.kick(reason)
		.catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
		message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because: ${reason}`);

	}
  
	if(command === "ban") {
		if(!message.member.roles.some(r=>["Administrator"].includes(r.name)) )
		return message.reply("Sorry, you don't have permissions to use this!");
    
	let member = message.mentions.members.first();
		if(!member)
		return message.reply("Please mention a valid member of this server");
		if(!member.bannable) 
		return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

	let reason = args.slice(1).join(' ');
	if(!reason) reason = "No reason provided";

    await member.ban(reason)
		.catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
		message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
	}
  
	if(command === "purge") {
		const deleteCount = parseInt(args[0], 10);
    
	if(!deleteCount || deleteCount < 2 || deleteCount > 100)
		return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
	const fetched = await message.channel.fetchMessages({limit: deleteCount});
		message.channel.bulkDelete(fetched)
		.catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
	}
});

client.on("guildMemberAdd", (member) => { // Check out previous chapter for information about this event
let guild = member.guild; 
let memberTag = member.user.tag; 
if(guild.systemChannel){
	guild.systemChannel.send(new Discord.RichEmbed() // Creating instance of Discord.RichEmbed
	.setTitle("A new user joined") // Calling method setTitle on constructor. 
	.setDescription(memberTag + " has joined the guild") // Setting embed description
	.setThumbnail(member.user.displayAvatarURL) // The image on the top right; method requires an url, not a path to file!
	.addField("Members now", member.guild.memberCount) // Adds a field; First parameter is the title and the second is the value.
	.setTimestamp() // Sets a timestamp at the end of the embed
	);
}
});

client.login(config.token);