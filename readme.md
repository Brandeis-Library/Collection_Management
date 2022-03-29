_{Collection Management Applicaiton}_

#### _{A series of modules for managing your libraries physical colltion to fill in functionality that is not included in the Ex Libris suite of products.}, {3/29/2022}_

#### By _**{Chris Underwood}**_

## Description

\_{A series of modules for managing your libraries physical colltion to fill in functionality that is not included in the Ex Libris suite of products.

The 1st module being built is inventory. When a barcode is scanned it goes to Alma and finds/returns the item object. When the item obj is received a series of API calls happen automatically: 1) the inventory data is updated on the item record, 2) where the call number is in the proper order, 3) replacement cost is verifeid to be at least a mininum amount and 4) any data in the 538a field is retrieved from the holdings record and shown.

There are customized error messages for all async functions via redux on the front end.

Future modules include a stack map feature, bulk checkin, integration with iron mountain offsite storage, and an admin section.
}\_

## Setup/Installation Requirements

- Download the files
- Run npm install in the root of both backend & frontend folders
- Configure the .env file using .env2 as a model at both folder roots.
- run npm start @ both folders root to start the application.
- profit!

_{Leave nothing to chance! You want it to be easy for potential users, employers and collaborators to run your app. Do I need to run a server? How should I set up my databases? Is there other code this app depends on?}_

## Known Bugs

_{ This is a work in progess so it is likely that if you download it today, you will likely have some incomplete functionality. Contact support below for more information. }_

## Support and contact details

_{libsys-group@brandeis.edu}_

## Technologies Used

_{Node.js, vanilla JS, npm, axios, cors. dotenv, Express.js, lc_call_number_compare, mongoose, morgan, mongodb, nodemon, xmldom, xpath, create-react-app, react, react-bootstrap, react-dom, react-redux, react-redux-loading-bar, react-router-dom, react-scripts, redux-logger, redux-thunk}_

### License

\_{MIT License

Copyright (c) [2022][brandeis university library]

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.}\_

Copyright (c) 2022 **_{Chris Underwood, Library Applications Developer, Brandeis University Library}_**
