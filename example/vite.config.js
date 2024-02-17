import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import {_main as cljsPreprocess} from "svelte-preprocess-cljs";
import { compileString } from "squint-cljs/lib/compiler.js";

const squint = () => ({
  name: "svelte-plugin-squint",
  script({ content, attributes: { lang } }) {
    if (lang !== "cljs") return;

    try {
      const code = compileString(content);
      return { code };
    } catch (e) {
      console.log(e);
    }
  },
});

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [svelte({
		preprocess: [squint()],
	})],
});
