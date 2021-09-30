import { Arguments, CommandBuilder } from 'yargs'
import chalk from 'chalk'
import ApiService from '../network/api_service'
import { Table } from 'console-table-printer'
type Options = {
  name: string
}
type GroupRow = {
  team: string
  rank: string
  points: string
  won: string
  matches: string
  lost: string
  goals: string
  drawn: string
}
export const command: string = 'group <group_name>'
export const desc: string = 'show group standing (groups naming A,B,C,D,E,F,H)'
export const builder: CommandBuilder<Options, Options> = (yargs) => yargs.positional('name', { type: 'string', demandOption: true })
export const handler = (argv: Arguments<Options>): void => {
  const { group_name } = argv
  const groupName = chalk.red(`Group ${group_name} standing`)
  const table = new Table({
    columns: [
      {
        name: 'team',
        alignment: 'left',
      },
    ],
  })
  ApiService.groups(group_name as string)

    .then((response) => {
      console.info(groupName)
      const result = response.data.data.table
      result.forEach((element: any) => {
        table.addRow(
          {
            rank: element.rank,
            team: element.name,
            points: element.points,
            matches: element.matches,
            drawn: element.drawn,
            goals: element.goals_scored,
            won: element.won,
            lost: element.lost,
          },
          { color: 'green' }
        )
      })
      table.printTable()
    })
    .catch((e) => {
      console.error(e)
    })
}
