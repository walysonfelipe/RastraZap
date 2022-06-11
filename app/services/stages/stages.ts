import {
  execute as hello
} from './hello'

import {
  execute as tracker
} from './tracker'

export type CustomerDescriptionType = 'hello' | 'tracker' 

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
  {
    customer: {
      description: 'tracker',
      execute: tracker
    }
  },
]

export default stages
