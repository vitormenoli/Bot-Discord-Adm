const Discord = require('discord.js')

module.exports = {
    name: 'say',
    description: 'Digite algo para eu falar.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'mensagem',
            description: 'Escreva algo para eu reproduzir.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],

    run: async (client, interaction) => {
        if (!interaction.member.permissions.has(Discord.PermissionFlagsBits.ManageGuild)) {
            interaction.reply({ ephemeral: true, content: `👋 Olá **${interaction.user.username}**, você não possui a permissão \`Gerenciar Servidor\` para utilizar este comando.` })
        } else {
            const mensagem = interaction.options.getString('mensagem')
            interaction.reply({ content: `${mensagem}` })
        }
    }
}