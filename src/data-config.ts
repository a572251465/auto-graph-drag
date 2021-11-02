import { IDataConfig } from '@/types/common'

const dataConfig: IDataConfig = {
  container: {
    width: 600,
    height: 500
  },
  blocks: [
    {
      key: 'text',
      left: 50,
      top: 100,
      zIndex: 1
    },
    {
      key: 'button',
      left: 0,
      top: 0,
      zIndex: 1
    },
    {
      key: 'input',
      left: 200,
      top: 200,
      zIndex: 1
    }
  ]
}

export default dataConfig
