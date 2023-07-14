const Discord = require('discord.js')
const token = require('./meutoken').token
const fs = require('fs')

const client = new Discord.Client({ 
    intents: [
        Discord.IntentsBitField.Flags.Guilds,
        Discord.IntentsBitField.Flags.GuildMembers,
        Discord.IntentsBitField.Flags.MessageContent,
        Discord.IntentsBitField.Flags.GuildMessages,
        Discord.IntentsBitField.Flags.GuildModeration
    ]
})

client.on('interactionCreate', (interaction) => {
    if (interaction.type !== Discord.InteractionType.ApplicationCommand) {
        return
    } else {
        if (!client.slashCommands.get(interaction.commandName)) {
            interaction.reply({ ephemeral: true, content: 'Houve um erro no comando selecinado.' })
        } else {
            client.slashCommands.get(interaction.commandName).run(client, interaction)
        }
    }
})

client.slashCommands = new Discord.Collection()
module.exports = client

fs.readdir('./events', (err, file) => {
    for(let evento of file) {
        require(`./events/${evento}`)
    }
})

fs.readdir('./handler', (err, file) => {
    for(let main of file) {
        require(`./handler/${main}`)
    }
})

client.login(token)