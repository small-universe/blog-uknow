import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "教程笔记",
      icon: "book",
      prefix: "tutorial/",
      children: "structure"
    },
    {
      text: "文章",
      icon: "book",
      prefix: "posts/",
      children: "structure",
    }
  ]
});
