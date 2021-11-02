export interface IBlockItem {
  width?: number
  height?: number
  left: number
  top: number
  key: string
  zIndex: number
}

export interface IDataConfig {
  container: {
    width: number
    height: number
  }
  blocks: IBlockItem[]
}

export interface IComponentInfo {
  key: string
  label: string
  preview: () => JSX.Element | string
  render: () => JSX.Element | string
}
