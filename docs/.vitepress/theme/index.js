import DefaultTheme from "vitepress/theme";
import LayerExamplePreview from './components/LayerExamplePreview.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('LayerExamplePreview', LayerExamplePreview)
    app.component('SdkExamplePreview', LayerExamplePreview)
  },
}
