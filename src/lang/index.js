import Vue from 'vue'
import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang导入Element的语言包 英文
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang g导入Element的语言包 中文
import enLocale from './en'  // 导入项目中用到的英文语言包
import zhLocale from './zh'  //导入项目中用到的中文语言包

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  // 设置语言 选项 en | zh
  locale: sessionStorage.getItem('lang') || 'zh', // 设置语种，使用sessionStorage储存语言标识
  // 设置文本内容
  messages
})

export default i18n
