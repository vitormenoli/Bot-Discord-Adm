const Discord = require('discord.js')
const ms = require('ms')

module.exports = {
    name: 'tempmute',
    description: 'Retira a permissão do usuário interagir no servidor por um tempo determinado.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membro',
            description: 'Mencione um membro.',
            type: Discord.ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: 'tempo',
            description: 'Duração do castigo do usuário.',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'motivo',
            description: 'Escreva o motivo do castigo.',
            type: Discord.ApplicationCommandOptionType.String,
            required: false
        },
    ],

    run: async(client, interaction) => {
        if(!interaction.member.permissions.has(Discord.PermissionFlagsBits.ModerateMembers)) {
            interaction.reply({ ephemeral: true, content: `👋 Olá **${interaction.user.username}**, você não possui a permissão \`Membros de Castigo\` para utilizar este comando.` })
        } else {
            const user = interaction.options.getUser('membro')
            const membro = interaction.guild.members.cache.get(user.id)

            const tempo = interaction.options.getString('tempo')
            let milisec = ms(tempo)

            let motivo = interaction.options.getString('motivo')
            if (!motivo) motivo = 'Indefinido'
            
            if(!milisec) {
                interaction.reply({ ephemeral: true, content: `❌ Olá **${interaction.user.username}**, você não inseriu um tempo válido.` })
            } else {
                membro.timeout(milisec, motivo).then( () => {
                    interaction.reply({ content: `✅ Olá **${interaction.user.username}**, o membro ${membro} (${membro.id}) foi castigado durante \`${tempo}\` com sucesso.` })
                }).catch(err => {
                    interaction.reply({ content: `❌ Olá **${interaction.user.username}**, não foi possível castigar o membro ${membro} (${membro.id}).` })
                })
            }
        }
    }
}