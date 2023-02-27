import { createApp } from "vue";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
import { boot } from "quasar/wrappers";


// Prism
import Prism from "prismjs";
// highlight code
import "prismjs/components/prism-json";

VMdEditor.use(vuepressTheme, {
  Prism,
});

const app = createApp(/*...*/);

export default boot(({ app }) => {
  app.use(VMdEditor);
});
