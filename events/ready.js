const client = require('../index')
const chalk = require('chalk')

client.on('ready', () => {
    console.log(chalk.green(`Bot [${client.user.username}] online com sucesso!`))
})