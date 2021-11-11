import { IBlockItem } from '@/types/common'

const editorCanvas = Symbol('editorCanvas')
const editDataConfig = 'editDataConfig'
const lastClickElement = 'lastClickElement'

const quoteValues = {
  [editorCanvas]: null as null | HTMLDivElement,
  [lastClickElement]: null as null | IBlockItem
}

export { editorCanvas, quoteValues, editDataConfig }
