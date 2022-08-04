<template>
    <div class="border">
      <div class="flex flex-wrap gap-2" v-if="editor">
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
          H1
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
          H2
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
          H3
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
          <span class="font-bold">Ж</span>
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
          <span class="italic">К</span>
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
          <span class="line-through">зачеркнутый</span>
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
          код
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().unsetAllMarks().run()">
          clear marks
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().clearNodes().run()">
          clear nodes
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
          параграф
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
          маркеры
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
          с нумерацией
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
          блок с кодом
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
          цитата
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().setHorizontalRule().run()">
          полоса
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().setHardBreak().run()">
          hard break
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().undo().run()">
          Назад
        </button>
        <button class="bg-primary px-1" @click="editor.chain().focus().redo().run()">
          Вперёд
        </button>
      </div>
      <editor-content :editor="editor"/>
    </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'

export default {
  components: {
    EditorContent
  },
  props:{
    modelValue: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue'],

  data() {
    return {
      editor: null
    }
  },
  watch: {
    modelValue(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) {
        return
      }

      this.editor.commands.setContent(value, false)
    }
  },
  mounted() {
    this.editor = new Editor({
      content: this.modelValue,
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
        },
      },
      extensions: [
        StarterKit
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      }
    });
  },
  beforeUnmount() {
    this.editor.destroy()
  },
}
</script>

<style scoped>
.is-active {
  background: #00d000;
}
</style>
