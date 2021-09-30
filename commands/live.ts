import chalk from 'chalk'
import { alias, Arguments, CommandBuilder } from 'yargs'
import ApiService from '../network/api_service'
import { COUNTRY_COMPTETION_CODE_MAP } from '../utils/mapper'
const today = new Date().toDateString()
type Options = {
  name: string
}
const supported_leagues = Object.keys(COUNTRY_COMPTETION_CODE_MAP).join(',')

export const command: string = 'live <country_name>'
export const desc: string = `show live scores by country name, ex: ${supported_leagues}`
export const builder: CommandBuilder<Options, Options> = (yargs) => yargs.positional('name', { type: 'string', demandOption: true })

export const handler = (argv: Arguments<Options>): void => {
  const { country_name } = argv

  const competitionId = COUNTRY_COMPTETION_CODE_MAP[country_name as string]

  ApiService.live(competitionId).then((response) => {
    const result = response.data.data.match

    if (result.length > 0) {
      console.info(chalk.green(`Live score ${today}`))
    } else {
      console.info(chalk.red(`No result found  live score ${today}`))
    }
  })
}
