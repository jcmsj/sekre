# Sekre
A mobile password manager built with react native.
## [Features roadmap](./doc/features.md)

## Getting started (Development)

### Copying the project.
1. We'll be using [`Yarn`](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable) to speedup development, so install it.
1. `cd` to the directory in which the project folder will be created in step 2.
2. `git clone https://github.com/jcmsj/sekre.git`.
   - If you don't know git you can learn the basics [here](https://youtu.be/hwP7WQkmECE).
3. `cd <project_folder>` (e.g. `cd sekre`)
4. `yarn install --check-files`.

### VS Code setup
1. Save the project as a workspace.
2. Install the following extensions
   - _Note_: Do this inside the IDE.
   1. [Git Lens](https://marketplace.visualstudio.com/items?itemName=eamodio.gitlens)
   2. [AVD Manager](https://marketplace.visualstudio.com/items?itemName=toroxx.vscode-avdmanager).
   3. [React Native Tools](https://marketplace.visualstudio.com/items?itemName=msjsdiag.vscode-react-native).
    
### Launching the app
* Open 3 terminals:
   1. Launch your android emulator. 
   - Preferably Pixel 5 Android 12 (API 31).
   1. `yarn start` - starts metro server.
   2. `yarn android` - builds the app and launches it in the emulator.
* VS Code
  1. Start the emulator by going to the `AVD Manager tab` in the sidebar.  
  2. Start the `react native packager` (there's a button at the bottom of the window).
  3. Start the app by clicking the play button near the left of the filename tabs.