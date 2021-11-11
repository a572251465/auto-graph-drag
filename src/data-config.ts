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
      isCenter: true,
      top: 100,
      zIndex: 1,
      id: 0,
      isFocus: false,
      isInit: true
    },
    {
      key: 'button',
      left: 0,
      isCenter: true,
      top: 0,
      zIndex: 1,
      id: 1,
      isFocus: false,
      isInit: true
    },
    {
      key: 'input',
      left: 200,
      isCenter: true,
      top: 200,
      zIndex: 1,
      id: 2,
      isFocus: false,
      isInit: true
    }
  ]
}

export default dataConfig
