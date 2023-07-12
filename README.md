# Template of React + TypeScript Client Codebases
[![linter](https://github.com/viven-inc/react-typescript-template/actions/workflows/linter.yml/badge.svg)](https://github.com/viven-inc/react-typescript-template/actions/workflows/linter.yml)

## Basic Authentication
- [1Password Link](https://share.1password.com/s#HRUsJ956H4Rh1S8hQOae2vocMMB6ni6kHP1cBBhNni4)

## Microsoft Account Credential

### You can login at [this page](https://login.microsoftonline.com/)
- [👩‍🍳Meal Maker Account](https://share.1password.com/s#fbGk_ZEvlFeKfBoIXUPOc1S4EdeEpFl7x3G6hp1AU6s)
- [🧑‍🎓Student Account](https://share.1password.com/s#BSkmikfW3L3ETgwOKyKWqlVI8AAiLkVtbvsoJsoNGYY)
- [👩 Parent Account](https://share.1password.com/s#RLeztxaIPajB4LUzUHJtYoT2bkqNB7XPmBuURFAdCns)
- [👩‍🏫 Teacher Account](https://share.1password.com/s#lJtoqHHiFmoxod2bUmMwffHAkX7lQVtb2o2_e7IVunk)

## Getting Started

1. Download `.env` File from [this link](https://share.1password.com/s#p9pHwDc16pJFpbSrjDYKILKM49qjKlWcl0qRUJOotHY)

2. In the root directory, please run 

```
yarn 
```

3. Run 

```
yarn start
```

## Call the Postman Request
- Set [env](https://share.1password.com/s#EGyw6CvKwF9F30XtVZYuN8FkNRKoAdRC-c12g3kUdt0) in Sidebar Menu, `development` Environments 

## File Structure
```
------- public 
    |--- src 
        |--- assets
            |--- imgs
            |--- icons
            |--- json
            |--- locales // Multi language resource files
                |--- en
                    |--- translation.json
                |--- jp
                    |--- translation.json
        |--- build
        |--- components
        |--- constants
        |--- modules
        |--- pages
            |--- home
                |--- components
                |--- index.tsx
        |--- queries
        |--- states //(Recoil Atoms)
        |--- themes
        |--- types
        |--- UILibrary
        |--- App.tsx // Implement all providers
        |--- Body.tsx // Implement layout and routing
```
