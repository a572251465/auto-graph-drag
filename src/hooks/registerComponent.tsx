import { ElButton, ElInput } from 'element-plus'
import { IComponentInfo } from '@/types/common'

/**
 * @author lihh
 * @description 注册组件事件
 */
const registerComponentHandle = function registerComponentHandle() {
  const componentList: IComponentInfo[] = []
  const componentMap: Record<string, IComponentInfo> = {}

  return {
    componentList,
    componentMap,
    register: (component: IComponentInfo) => {
      if (componentList.includes(component)) return

      componentList.push(component)
      componentMap[component.key] = component
    }
  }
}

const { componentList, componentMap, register } = registerComponentHandle()

// 注册组件
register({
  key: 'text',
  label: '文本',
  preview: () => '预览文本',
  render: () => '渲染文本'
})
register({
  key: 'button',
  label: '按钮',
  preview: () => <ElButton>预览按钮</ElButton>,
  render: () => <ElButton>渲染按钮</ElButton>
})
register({
  key: 'input',
  label: '输入框',
  preview: () => <ElInput placeholder="请入预览内容" />,
  render: () => <ElInput placeholder="请入渲染内容" />
})

export { componentMap, componentList, register }
