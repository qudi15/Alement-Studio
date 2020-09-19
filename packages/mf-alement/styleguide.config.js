const path = require('path')
module.exports = {
  // set your styleguidist configuration here
  title: 'Alement Studio',
  components: 'src/components/**/*.vue',
  pagePerSection: true,
  styleguideDir: 'dist',
  compilerConfig: {
    objectAssign: 'Object.assign',
    transforms: {
      // make async/await work by default (no transforms)
      asyncAwait: false
    }
  },
  sections: [
    {
      name: 'Introduction',
      sections: [
        {
          name: 'Alement Studio',
          content: './doc/al-studio.md'
        },
        {
          name: 'Alement Schema',
          content: './doc/al-schema.md'
        },
        {
          name: 'Alement Library',
          content: './doc/al-library.md'
        },
        {
          name: 'Alement Editor',
          content: './doc/al-editor.md'
        },
        {
          name: 'Alement IDE',
          content: './doc/al-ide.md'
        },
        {
          name: 'Alement BFF',
          content: './doc/al-bff.md'
        },
        {
          name: 'Alement Service',
          content: './doc/al-service.md'
        },
        {
          name: 'Alement Cloud SDK',
          content: './doc/al-cloud-sdk.md'
        }
      ],
      sectionDepth: 2
    },
    {
      name: 'Alement Schema',
      sections: [
        {
          name: 'Alement Base',
          content: './src/schemas/al-base.md'
        },
        {
          name: 'Alement Button',
          content: './src/schemas/al-button.md'
        },
        {
          name: 'Alement Layout',
          content: './src/schemas/al-layout.md'
        },
        {
          name: 'Alement Rule',
          content: './src/schemas/al-rule.md'
        },
        {
          name: 'Alement Checkbox',
          content: './src/schemas/al-checkbox.md'
        },
        {
          name: 'Alement Form',
          content: './src/schemas/al-form.md'
        },
        {
          name: 'Alement Table',
          content: './src/schemas/al-table.md'
        },
        {
          name: 'Alement Rich Text Editor',
          content: './src/schemas/al-rich-text-editor.md'
        },
        {
          name: 'Alement Page Search',
          content: './src/schemas/al-page-search.md'
        },
        {
          name: 'Alement Page Detail',
          content: './src/schemas/al-page-detail.md'
        },
        {
          name: 'Alement Collapse',
          content: './src/schemas/al-collapse.md'
        },
        {
          name: 'Alement Modal Search',
          content: './src/schemas/al-modal-search.md'
        },
        {
          name: 'Alement Tabs',
          content: './src/schemas/al-tabs.md'
        },
        {
          name: 'Alement Upload',
          content: './src/schemas/al-upload.md'
        }
      ],
      sectionDepth: 2
    },
    {
      name: 'Alement Library Vue Element-ui',
      pagePerSection: true,
      content: './doc/elements.md',
      components: './src/components/**/*.vue',
      sectionDepth: 2
    }
  ],
  // defaultExample: true,
  // sections: [
  //   {
  //     name: 'First Section',
  //     components: 'src/components/**/[A-Z]*.vue'
  //   }
  // ],
  // webpackConfig: {
  //   // custom config goes here
  // },
  theme: './config/theme.js',
  styles: './config/styles.js',
  renderRootJsx: path.join(__dirname, 'config/styleguide.root.js'),
  require: [path.join(__dirname, 'src/main.js')]
}
