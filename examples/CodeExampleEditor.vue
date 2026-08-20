<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { basicSetup } from 'codemirror'
import { indentWithTab } from '@codemirror/commands'
import { javascript } from '@codemirror/lang-javascript'
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { EditorState, Prec } from '@codemirror/state'
import { EditorView, keymap } from '@codemirror/view'
import { tags } from '@lezer/highlight'

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  ariaLabel: {
    type: String,
    default: '可编辑 JavaScript 示例代码',
  },
  accent: {
    type: String,
    default: 'cyan',
    validator: (value) => ['cyan', 'blue', 'amber'].includes(value),
  },
})

const emit = defineEmits(['update:modelValue', 'run'])
const editorHost = ref(null)
let editorView = null

const accentTokens = {
  cyan: {
    accent: '#45eadf',
    activeLine: 'rgba(69, 234, 223, 0.065)',
    selection: 'rgba(42, 143, 151, 0.42)',
  },
  blue: {
    accent: '#69b9ff',
    activeLine: 'rgba(105, 185, 255, 0.07)',
    selection: 'rgba(53, 127, 184, 0.42)',
  },
  amber: {
    accent: '#e6bb52',
    activeLine: 'rgba(230, 187, 82, 0.065)',
    selection: 'rgba(150, 112, 35, 0.42)',
  },
}

const syntaxTheme = HighlightStyle.define([
  { tag: [tags.keyword, tags.modifier, tags.operatorKeyword], color: '#69b9ff', fontWeight: '600' },
  { tag: [tags.function(tags.variableName), tags.labelName], color: '#66ded2' },
  { tag: [tags.propertyName, tags.attributeName], color: '#a9c7ff' },
  { tag: [tags.variableName, tags.name], color: '#d8e8ef' },
  { tag: [tags.typeName, tags.className, tags.namespace], color: '#efacd1' },
  { tag: [tags.string, tags.special(tags.string), tags.regexp], color: '#bed779' },
  { tag: [tags.number, tags.bool, tags.null], color: '#f1c567' },
  { tag: [tags.operator, tags.punctuation, tags.separator], color: '#86a8b8' },
  { tag: [tags.comment, tags.docComment], color: '#587582', fontStyle: 'italic' },
  { tag: [tags.definition(tags.variableName), tags.local(tags.variableName)], color: '#a7e8e1' },
  { tag: [tags.invalid], color: '#ff8e8e', textDecoration: 'underline wavy' },
])

function createEditorTheme() {
  const tokens = accentTokens[props.accent]
  return EditorView.theme({
    '&': {
      height: '100%',
      minHeight: '100%',
      color: '#d8e8ef',
      backgroundColor: '#040c12',
      fontSize: '11px',
    },
    '&.cm-focused': {
      outline: `1px solid ${tokens.accent}`,
      outlineOffset: '-1px',
    },
    '.cm-scroller': {
      overflow: 'auto',
      fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
      lineHeight: '1.65',
      scrollbarColor: '#284a59 #071119',
    },
    '.cm-content': {
      minHeight: '100%',
      padding: '12px 0 24px',
      caretColor: tokens.accent,
    },
    '.cm-line': {
      padding: '0 14px',
    },
    '.cm-cursor, .cm-dropCursor': {
      borderLeftColor: tokens.accent,
      borderLeftWidth: '2px',
    },
    '&.cm-focused .cm-selectionBackground, ::selection': {
      backgroundColor: tokens.selection,
    },
    '.cm-activeLine': {
      backgroundColor: tokens.activeLine,
      boxShadow: `inset 2px 0 0 ${tokens.accent}`,
    },
    '.cm-gutters': {
      minWidth: '42px',
      borderRight: '1px solid #17303b',
      color: '#496674',
      backgroundColor: '#071119',
    },
    '.cm-lineNumbers .cm-gutterElement': {
      minWidth: '34px',
      padding: '0 9px 0 4px',
    },
    '.cm-activeLineGutter': {
      color: tokens.accent,
      backgroundColor: tokens.activeLine,
    },
    '.cm-foldGutter .cm-gutterElement': {
      color: '#527281',
      padding: '0 4px',
    },
    '.cm-matchingBracket': {
      color: '#ffffff',
      backgroundColor: 'rgba(105, 185, 255, 0.2)',
      outline: `1px solid ${tokens.accent}`,
    },
    '.cm-searchMatch': {
      backgroundColor: 'rgba(230, 187, 82, 0.24)',
      outline: '1px solid rgba(230, 187, 82, 0.72)',
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: 'rgba(69, 234, 223, 0.28)',
    },
    '.cm-panels': {
      color: '#cfe0e7',
      backgroundColor: '#09151d',
    },
    '.cm-panels.cm-panels-top': {
      borderBottom: '1px solid #1c3946',
    },
    '.cm-panel input': {
      border: '1px solid #284957',
      color: '#e4f2f6',
      backgroundColor: '#040c12',
    },
    '.cm-panel button': {
      border: '1px solid #284957',
      color: '#b9d2dc',
      backgroundColor: '#0b1a23',
    },
    '.cm-tooltip': {
      border: '1px solid #244653',
      color: '#d8e8ef',
      backgroundColor: '#08141c',
    },
    '.cm-tooltip-autocomplete > ul > li[aria-selected]': {
      color: '#ffffff',
      backgroundColor: 'rgba(43, 117, 145, 0.62)',
    },
  }, { dark: true })
}

function createState() {
  return EditorState.create({
    doc: props.modelValue,
    extensions: [
      basicSetup,
      javascript(),
      syntaxHighlighting(syntaxTheme),
      createEditorTheme(),
      EditorState.tabSize.of(2),
      EditorView.contentAttributes.of({
        'aria-label': props.ariaLabel,
        autocomplete: 'off',
        autocorrect: 'off',
        autocapitalize: 'off',
        spellcheck: 'false',
      }),
      Prec.high(keymap.of([
        {
          key: 'Mod-Enter',
          run: () => {
            emit('run')
            return true
          },
        },
        indentWithTab,
      ])),
      EditorView.updateListener.of((update) => {
        if (update.docChanged) emit('update:modelValue', update.state.doc.toString())
      }),
    ],
  })
}

onMounted(() => {
  editorView = new EditorView({
    state: createState(),
    parent: editorHost.value,
  })
})

watch(() => props.modelValue, (nextValue) => {
  if (!editorView) return
  const currentValue = editorView.state.doc.toString()
  if (nextValue === currentValue) return
  editorView.dispatch({
    changes: { from: 0, to: currentValue.length, insert: nextValue },
  })
})

onBeforeUnmount(() => {
  editorView?.destroy()
  editorView = null
})
</script>

<template>
  <div ref="editorHost" class="code-example-editor"></div>
</template>

<style scoped>
.code-example-editor {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
</style>
