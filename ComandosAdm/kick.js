const Discord = require('discord.js')

module.exports = {
    name: 'kick',
    description: 'Expulsa um membro.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membro',
            description: 'Membro que será expulso.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'motivo',
            description: 'Motivo a qual o membro será expulso.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        },
    ],

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.KickMembers)) {
            interaction.reply({ ephemeral: true, content: `👋 Olá **${interaction.user.username}**, você não possui a permissão \`Expulsar Membros\` para utilizar este comando.` })
        } else {
            const user = interaction.options.getUser('membro')
            const member = interaction.guild.members.cache.get(user.id)
            let motivo = interaction.options.getString('motivo')
            if(!motivo) motivo = 'Indefinido'

            member.kick(motivo).then( () => {
                interaction.reply({ content: `✅ Olá **${interaction.user.username}**, o membro ${member} (${member.id}) foi expulso com sucesso.` })
            }).catch(err => {
                interaction.reply({ content: `❌ Olá **${interaction.user.username}**, não foi possível expulsar o membro ${member} (${member.id}).` })
            })
        }
    }
}