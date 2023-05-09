# Template of React + TypeScript Client Codebases
[![linter](https://github.com/viven-inc/react-typescript-template/actions/workflows/linter.yml/badge.svg)](https://github.com/viven-inc/react-typescript-template/actions/workflows/linter.yml)

## Basic Authentication
- [1Password Link](https://share.1password.com/s#4OJf9yJ5G1a8KDFJ8FYbKjB5dJfhoLFCZwjaiNES-8Y)

## Getting Started

1. Download `.env` File from [this link](https://share.1password.com/s#UwHL8Fmkmqq84kW3ICwC5hWA52pUF9KGcox5spxFECk)

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
