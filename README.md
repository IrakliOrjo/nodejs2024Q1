# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {[https://github.com/IrakliOrjo/nodejs2024Q1](https://github.com/IrakliOrjo/nodejs2024Q1.git)}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm run start
```

App will start on port (4000 as default)
You can access OpenApi(Swagger) on adress {http://localhost:4000/api}

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
