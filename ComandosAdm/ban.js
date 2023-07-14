const Discord = require('discord.js')

module.exports = {
    name: 'ban',
    description: 'Bane um membro.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membro',
            description: 'Membro que será banido.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'motivo',
            description: 'Motivo a qual o membro será banido.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        },
    ],

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.BanMembers)) {
            interaction.reply({ ephemeral: true, content: `👋 Olá **${interaction.user.username}**, você não possui a permissão \`Banir Membros\` para utilizar este comando.` })
        } else {
            const user = interaction.options.getUser('membro')
            const member = interaction.guild.members.cache.get(user.id)
            let motivo = interaction.options.getString('motivo')
            if(!motivo) motivo = 'Indefinido'

            member.ban({ reason: [motivo] }).then( () => {
                interaction.reply({ content: `✅ Olá **${interaction.user.username}**, o membro ${member} (${member.id}) foi banido com sucesso.` })
            }).catch(err => {
                interaction.reply({ content: `❌ Olá **${interaction.user.username}**, não foi possível banir o membro ${member} (${member.id}).` })
            })
        }
    }
}