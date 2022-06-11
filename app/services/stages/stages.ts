import {
  execute as hello
} from './hello'


export type CustomerDescriptionType = 'hello' | 'menu' | 'request'

interface StagesInterface {
  customer?: {
    description: CustomerDescriptionType
    execute: Function
  }
}

const stages: StagesInterface[] = [
  {
    customer: {
      description: 'hello',
      execute: hello
    }
  },
]

export default stages
