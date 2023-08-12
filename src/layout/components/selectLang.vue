<template>
  <div class="LanguageSelect">
    <el-switch v-model="isChinese" active-color="#13ce66" inactive-color="#409eff" :active-text="$t('navbar.zh')" :inactive-text="$t('navbar.en')" @change="switchlanguage">
    </el-switch>
  </div>
</template>
<script>
export default {
  name: 'LanguageSelect',
  data() {
    return {
      isChinese: '',
    }
  },
  created () {
    this.isChinese = this.$i18n.locale === 'zh' ? true : false
  },
  methods: {
    // 切换语言
    switchlanguage() {
      const lang = this.isChinese ? 'zh' : 'en'
      const langlabel= lang==='zh' ? this.$t('navbar.zh') :this.$t('navbar.en')
      this.$message({type: 'success',message: `${this.$t('navbar.switch')}${langlabel}`})
      this.$i18n.locale = lang
      sessionStorage.setItem('lang', lang)
      window.location.reload()
    }
  }
}
</script>
<style lang="scss" scoped>

 
</style>