# Necktie - Doctor Booking App

## Tech Stack & Choice of Package

| Package | Usage / Reason |
| ------- | -------------- |
| React | Base Framework |
| Material UI v5 | UI Library, it provided a rich set of ready-to-use components, eg. DataTable, Button, Dialog |
| @emotion/react | Mui required dependency |
| @emotion/styled | Mui required dependency |
| @fontsource/roboto | Google Font |
| @mui/icons-material | Icon library with material design |
| @mui/lab | Provided some Mui experimental API, e.g. LoadingButton |
| @mui/x-date-pickers | Provided a set of ready-to-use UI components for Date & Time inputs |
| axios | Promise-based HTTP client for making outbound HTTP requests |
| dayjs | JS library for handling Date/Time, lightweight (~2k) alternative to Moment.js |
| react-rotuer-dom | Enable the application to have client-side routing |
| vite | Next Gen of Module bundler, have better DX & faster hot reload during development |

This project is using `yarn` as a package manager since `yarn` have a better performance, and can download & install the dependencies in parallel, `npm` is in sequential order.

## Assumptions
- Assume each appointment lasts for 1 hour
- Assume the user can't book the timeslot that will exceed the doctor's availability, e.g. can't book `18:30 - 19:30` session when `end` is `18`
- Assume the user can't book any past timeslots, e.g. Current time = `2022-03-06 12:59`, then they can't book any past session (e.g. on or before `2022-03-06 11:00 - 12:00`), but booking for `13:00 - 14:00` is allowed
- Assume the backend will perform the duplicate record checking, e.g. will reject the Booking request if the record exists
- Assume the backend will check & escape any illegal characters to prevent SQL injection and XSS attack.

## Potential Improvement

### UI/UX & Functionality
- Better Responsive design
- Better Choice of colour palette
- Better UI on Doctor's Profile Card, Date picker & Timeslot selection <br/>
e.g. <br/> 
    - Should we make the `Doctor's Profile List` be virtualized list or have the pagination for it?
    - Should we adjust the styles of the timeslot selection button instead of having the traditional radio button styles
    - Should we display the [`Skeleton`](https://mui.com/material-ui/react-skeleton/) of the Doctor's Profile while it's getting data from the backend or data isn't yet ready?
- Develop a `Booking Record` page to allow users to view their placed bookings
- Allow users to cancel their bookings
- Get the booking records first when the app onLoad, and disable the exact timeslot if he placed a booking successfully

### Browser compatibility
Since we are using the Vite as a module bundler for this project, it serves source code as a Native ESM, which might not support some old browsers. To address the old browser compatibility issue, we can make use of `@vitejs/plugin-legacy` to generate the legacy chunk & ES language feature polyfills.

[Ref for Vite](https://vitejs.dev/guide/build.html#browser-compatibility)

### Search Engine Optimization (SEO)
This project / application is currently introduced as a Single page application (SPA) with Client side rendering / routing (CSR), it might not be SEO friendly.

To improve the SEO performance on React SPA, we can 
- utilize some 3rd libraries: e.g. `react-helmet` to manage the content of document's `<Head>`
- using the [ReactDOMServer](https://reactjs.org/docs/react-dom-server.html) API on a `Node` server to realize SSR

If SEO needs to be covered later on, we can migrate this project to `Next.js`, since `Next.js` is based on `React`, and better more SEO-friendly features, e.g. `Server side rendering (SSR)`, `Static side generation (SSG)`, `Incremental static regeneration (ISR)`.

[Link to Next.js](https://nextjs.org/)

### State Management
To prevent the situation of props drilling & keeping some state on the global scope, this project used `context` as a Global Store.

We may integrate other state management libraries if we have more state/data that need to be stored in a global scope, e.g. `Redux`, `Recoil`.

[Redux](https://react-redux.js.org/)<br/>
[Recoil](https://recoiljs.org/)

### Testing
Due to the given time limit, testing isn't covered in this project. <br/>
For <br/>
- Unit testing: we can use [`vitest`](https://vitest.dev/), [`jest`](https://jestjs.io/)
- End to End (E2E) testing: we can use [`Cypress`](https://www.cypress.io/), [`Puppeteer`](https://pptr.dev/) for testing the core / booking flow

### Code quality
To improve the code quality, we can consider adopting below items:
1. [`ESLint`](https://eslint.org/) - JavaScript linter
2. [`Stylelint`](https://stylelint.io/) - CSS linter
3. [`Prettier`](https://prettier.io/) - for formatting the code
4. [`SonarQube`](https://www.sonarsource.com/products/sonarqube/) - analysis for any code smell, bugs, security vulnerability  

### Version control
To have a better & traceable track record on git commits, we can consider adopting below items: 
1. Git hooks e.g. `pre-commit`
2. `commitlint`, [`Commitizen`](https://github.com/commitizen/cz-cli) & follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specifications
3. Divide your feature into a smaller chunk of commit changes
e.g. <br/>
1 commit with a lot of code changes <br/>
`feat(Profile): done Doctor's Profile component` <br/>
into n commits <br/>
`feat(Profile): finish Doctor's Profile UI` <br/>
`...` <br/>
`feat(Profile): integrate the create booking API` <br/>

## Production Consideration

1. Since we're using CSR mode for this application, routing & page navigation only can be done on client side, so we need to modify the config if using the Apache / Nginx as HTTP server, to redirect all the incoming traffic to /index.html. Otherwise, it will result in HTTP 404 - page not found if the user directly accesses the URL on the browser.

Ref: <br/>
For Nginx: [Link](https://stackoverflow.com/questions/43555282/react-js-application-showing-404-not-found-in-nginx-server) <br />
For Apache: [Link](https://stackoverflow.com/questions/51357947/react-app-on-server-while-refreshing-the-page-shows-404-page)

2. 

[Investigation on Request Header](docs/img/endpoint_header.png)

As we can see on the request header, `access-control-allow-origin` has set to `*`, it's not considered a best practice on CORS. We should always specify the domain in this field to prevent other malicious users / domains to adopt our API.

3. We should always use the Production build instead of the development build for the production environment.

4. Be aware of the bundle / chunk size, a larger chunk might lead to long FP (First Paint), FCP (First Contentful Paint) & TTI (Time to Interactive), if the chunks are large after minification, we should consider code-split the application.
