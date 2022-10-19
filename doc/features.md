# Features
## App name
* The app's name is `Sekre` meaning __secure__ in _Norwegian_.
## Backend
- [x] Use [Realm JS](https://www.mongodb.com/docs/realm/sdk/react-native/).
### Persist data (Own table)
- [ ] Store `main key`.
- [ ] Table containing IDs of secrets that use the `main key`.
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
- [ ] Use main password.
- [ ] Generate `secret`.
- [ ] Clear inputs.
- [ ] Visibility toggles for `key` and `secret`.
#### Submission
- [ ] Validation.
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
- [ ] Edit (optional)
- [ ] Show
- [ ] Copy

### Auth Page
- [ ] Title shows intent.
- [ ] Accepts children props.
  - [ ] Before `key field`.
  - [ ] After `key field`. 
- [ ] Show `key field`.
- [ ] Button to toggle `key` visibility.
- [ ] Major buttons - Cancel and Submit.

## Settings (Major)
- [ ] About the app.
- [ ] About the devs.
- [ ] User manual.
- [ ] Export data.
- [ ] Import data.
## Splash screen
- [ ] On new install, setup `main key` reuse `Auth`.
- [ ] Guided tutorial (optional).