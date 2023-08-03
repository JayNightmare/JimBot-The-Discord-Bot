const { Client, GatewayIntentBits, EmbedBuilder, PermissionsBitField, Permissions, MessageManager, Embed, Collection } = require(`discord.js`);
const { VoicePermissions } = require("oceanic.js");
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] }); 
const prefix = 'PREFIX';

client.on("ready", () => {
    console.log("Bot is online");

    client.user.setActivity(`I am Alive`, {type: "READING"});
})

client.on("messageCreate", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // message array

    const messageArray = message.content.split(" ");
    const argument = messageArray.slice(1);
    const cmd = messageArray[0];

    // commands

    // test command
    if (command === 'test') {
        message.channel.send("Bot Prefix is working")
    }
    //

    // Ban and Unban commands
    if (command === "ban") {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));

        if (!message.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return message.channel.send("No >:("), console.log(`${member.user} tried using the **BAN** command and failed`);
        if (!member) return message.channel.send("you must be joking?"), console.log("No member mentioned");
        if (message.member === member) return message.channel.send("Why lmao?"), console.log("No reason given");
        if (!member.kickable) return message.channel.send("You cannot ban them!"), console.log(`Attempted Ban Member is better than ${member.user}`);

        let reason = argument.slice(1).join(" ") || "Why has this person been subjected to such a terrible crime if no evidence has been presented???"

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: ${member.user} has been **BANISHED** | ${reason}`)

        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setDescription(`:white_check_mark: you have been **BANISHED** from ${message.guild.name} | ${reason}`)

        member.send({embeds: dmEmbed}).catch(err => {
            console.log(`${member.user} has their damn DMs off, better luck next time`);
        })

        member.ban().catch(err => {
            message.channel.send("There was an error banning user")
        })

        message.channel.send({ embeds: [embed] });
    }
    //
    if (command === "unban") {
        const member = args[0];

        let reason = argument.slice(1).join(" ") || `We felt like it. Cope`;
        const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(`:white_check_mark: ${member.user} has been **UNBANISHED**`)

        message.guild.bans.fetch()
            .then(async bans => {
                if (bans.size == 0) return message.channel.send(`Ban List total: 0 \n try banning some people to add to the list lmao`);

                let bannedID = bans.find(ban => ban.user.id == member);
                if (!bannedID) return await message.channel.send(`That user ID does not seem to be banned on our server`);

                await message.guild.bans.remove(member, reason).catch(err => {
                    return message.channel.send("*sparks* there seems to be an error *sparks*")
                })

                await message.channel.send({ embeds: [embed] })
            })
    }
    //

    if (command === "kick") {
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" " || x.user.username === argument[0]));

        if (!message.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return message.channel.send("No >:("), console.log(`${member.user} tried using the **KICK** command and failed`);
        if (!member) return message.channel.send("you must be joking?"), console.log("No member mentioned");
        if (message.member === member) return message.channel.send("Why lmao?"), console.log("No reason given");
        if (!member.kickable) return message.channel.send("You cannot ban them!"), console.log(`Attempted kick Member is better than ${member.user}`);

        let reason = argument.slice(1).join(" ") || "Why has this person been subjected to such a terrible crime if no evidence has been presented???"

        const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("KICKED IN THE NUTS")
        .setDescription(`${member.user} has *"moved"* to a different realm by the moderators\n\nReason: ${reason}`)

        const dmEmbed = new EmbedBuilder()
        .setColor("Red")
        .setTitle(`Kicked from ${message.guild.name}`)
        .setDescription(`You were naughty in ${message.guild.name} because of this reason: ${reason}.\n\n*You are still able to join back but can result in a perma ban if deemed worthy*`)

        member.send({embeds: dmEmbed}).catch(err => {
            console.log(`${member.user} has their damn DMs off, better luck next time`);
        })

        member.kick().catch(err => {
            message.channel.send("There was an error kicking user")
        })

        message.channel.send({ embeds: [embed] });
    }
})

/* const functions = fs.readdirSync("./src/functions").filter(file => file.endsWith(".js"));
const eventFiles = fs.readdirSync("./src/events").filter(file => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands"); 

(async () => {
    for (file of functions) {
        require(`./functions/${file}`)(client);
    }
    client.handleEvents(eventFiles, "./src/events");
    client.handleCommands(commandFolders, "./src/commands");
})(); */

client.login(`TOKEN`);
