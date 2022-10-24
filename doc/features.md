# Features
## App name
* The app's name is `Sekre` meaning __secure__ in _Norwegian_.
## Backend
- [x] Use [Realm React](https://www.mongodb.com/docs/realm/sdk/react-native/use-realm-react/).
### Persist data (Own table)
- [ ] Store `main key`.
- [x] Table containing IDs of secrets that use the `main key`.
- [X] Secrets table.
  
## Frontend
### Design
1. [Bottom navigation bar](https://callstack.github.io/react-native-paper/bottom-navigation.html).
   * For Navigation between major pages.
2. Main content.
3. Top bar
   1. For going back.
   2. Page title.
   3. Major buttons.
   
### Secret List (Major)
#### Top bar
- [x] Shows the title `Manage secrets`.
- [x] Show list of `secret`s.
- [x] Tapping an item navigates to the `secret` editor.
- [x] Pull down gesture refreshes list.
- [x] Each item has quick action buttons:
  - [ ] Show button 
    - [ ] Reveals the `secret`.
    - [x] UI
  - [ ] Copy button 
    - [ ] Copies the `secret` to the clipboard using [@react-native-clipboard/clipboard](https://www.npmjs.com/package/@react-native-clipboard/clipboard).
    - [x] UI
  -  _Implimentation note_: Authentication is still required after tapping these unless the secret uses the `main key`.
- [ ] Filter secrets
  - [ ] by label
  - [x] UI
### Creation Form (Major)
#### Top bar
- [x] Submit button at the top bar.
- [x] Shows the title `Create secret`.

#### Text fields:
- [x] Secret's label.
- [x] The `secret` itself.
- [x] The `key` for the `secret`.

#### Buttons:
- [x] Use main password.
- [ ] Generate `secret`.
- [ ] Clear inputs.
- [ ] Visibility toggles for `key` and `secret`.
#### Submission
- [ ] Validation.
  - [x] Hide button unless valid
  - [ ] Focus non-empty fields.
  - [ ] No duplicate label.
- [x] Encrypt `secret` using [Crypto JS' AES-256](https://cryptojs.gitbook.io/docs/).
- [x] Insert `secret` to the local DB.

### Secret Editor
#### Top bar
- [x] Go back
#### Secondary bottom navigation bar.
_buttons displayed from right to left._
- [ ] Delete
  - [x] UI
  - [x] Logic
  - [ ] Confirmation prompt
- [ ] Edit (optional)
- [x] Show
  - [x] UI
  - [x] Logic
- [x] Copy
  - [x] UI
  - [x] Logic

### Auth Page
- [x] Title shows intent.
- [x] Accepts children props.
  - [x] Before `key field`.
  - [x] After `key field`. 
- [ ] Show `key field`.
- [ ] Button to toggle `key` visibility.
- [ ] Major buttons
  - [-] Go back (unused)
  - [x] Submit

## Settings (Major)
- [ ] About the app.
- [ ] About the devs.
- [ ] User manual.
- [ ] Export data.
- [ ] Import data.
## Splash screen
- [x] On new install, setup `main key` reuse `Auth`.
- [ ] Guided tutorial (optional).