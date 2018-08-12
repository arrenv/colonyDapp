// @flow
const path = require('path');

module.exports = {
  title: 'Colony UI Style Guide',
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/styleguide/Wrapper.jsx'),
  },
  sections: [
    {
      name: 'Typography',
      components: ['./src/modules/core/components/Heading/Heading.jsx'],
    },
    {
      name: 'Content',
      components: ['./src/modules/core/components/Icon/Icon.jsx'],
    },
    {
      name: 'Forms',
      components: [
        './src/modules/core/components/Fields/Input/Input.jsx',
        './src/modules/core/components/Fields/InputLabel/InputLabel.jsx',
        './src/modules/core/components/Fields/Textarea/Textarea.jsx',
        './src/modules/core/components/Button/Button.jsx',
        './src/modules/core/components/Fields/FileUpload/FileUpload.jsx',
        './src/modules/core/components/MnemonicGenerator/MnemonicGenerator.jsx',
        './src/modules/core/components/MnemonicDnDSorter/MnemonicDnDSorter.jsx',
        './src/modules/core/components/OmniPicker/OmniPicker.jsx',
      ],
      content: 'docs/Forms.md',
    },
    {
      name: 'Popovers, Modals & Dialogs',
      components: [
        './src/modules/core/components/Popover/Popover.jsx',
        './src/modules/core/components/Popover/Tooltip.jsx',
        './src/modules/core/components/Modal/Modal.jsx',
        './src/modules/core/components/Dialog/Dialog.jsx',
        './src/modules/core/components/Dialog/DialogProvider.jsx',
        './src/modules/core/components/Dialog/DialogSection.jsx',
        './src/modules/core/components/Dialog/ConfirmDialog.jsx',
      ],
    },
    {
      name: 'Loaders & Progress',
      components: [
        './src/modules/core/components/Preloaders/LogoLoader.jsx',
        './src/modules/core/components/Preloaders/SpinnerLoader.jsx',
        './src/modules/core/components/ProgressBar/ProgressBar.jsx',
        './src/modules/core/components/ProgressBar/StepBar.jsx',
      ],
    },
  ],
};
