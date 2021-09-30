import { Arguments, CommandBuilder } from 'yargs'
import chalk, { Chalk } from 'chalk'
import GroupsService from '../network/groups'
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
const groupsTable: GroupRow[] = new Array()
export const command: string = 'group <group_name>'
export const desc: string = 'show group standing'
export const builder: CommandBuilder<Options, Options> = (yargs) => yargs.positional('name', { type: 'string', demandOption: true })
export const handler = (argv: Arguments<Options>): void => {
  const { group_name } = argv
  const groupName = chalk.red(`Group Name ${group_name}`)
  GroupsService.get(group_name as string)

    .then((response) => {
      console.info(groupName)
      const result = response.data.data.table
      result.forEach((element: any) => {
        groupsTable.push({
          team: element.name,
          drawn: element.drawn,
          rank: element.rank,
          goals: element.goals_scored,
          lost: element.lost,
          won: element.won,
          matches: element.matches,
          points: element.points,
        })
      })
      console.table(groupsTable)
    })
    .catch((e) => {
      console.error(e)
    })
}
