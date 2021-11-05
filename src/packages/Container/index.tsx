import { defineComponent, reactive } from 'vue'
import Left from '@/components/Left/index'
import Right from '@/components/Right/index'
import Top from '@/components/Top/index'
import Editor from '@/components/Editor/index'
import Menu from '@/components/Menu/index'
import dataConfig from '@/data-config'

import './index.scss'
import {IBlockItem, IDataConfig} from '@/types/common'
import emits from "@/utils/emits";
import {editDataConfig} from "@/utils/constant";

type IValues = Partial<{left: number, top: number, isCenter: boolean}>


export default defineComponent({
  name: 'container',
  components: {
    Left,
    Right,
    Top,
    Editor
  },
  setup() {
    const state = reactive<{ data: IDataConfig; currentPageShowFlag: boolean }>(
      { data: dataConfig, currentPageShowFlag: false }
    )

    /**
     * @author lihh
     * @description 编辑配置菜单
     * @param id 查询id
     * @param value 修改的值
     */
    const editDataConfigHandle = function editDataConfigHandle(id: number, value: IValues) {
      const index: number = state.data.blocks.findIndex(item => item.id === id)
      if (index === -1) return

      state.data.blocks[index] = {
        ...state.data.blocks[index],
        ...value
      }
    }
    emits.on(editDataConfig, editDataConfigHandle)

    /**
     * @author lihh
     * @description 点击显示菜单页面
     * @param flag 显示的菜单页面的标识
     */
    const showMenuPage = function showMenuPage(flag: boolean) {
      state.currentPageShowFlag = flag
    }

    return () => (
      <div class="container">
        <Menu v-model={state.currentPageShowFlag} />
        <Left
          class="container-left"
          modelValue={state.data}
          currentPageShowFlag={state.currentPageShowFlag}
          {...{ onShowMenuPage: showMenuPage }}
          v-model={state.data}
        />
        <Right class="container-right" />
        <Top class="container-top" />
        <Editor
          class="container-editor"
          modelValue={state.data}
          v-model={state.data}
        />
      </div>
    )
  }
})
