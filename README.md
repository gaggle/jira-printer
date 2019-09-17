# Jira Printer

## How to use
To install dependencies:
```bash
npm ci
```

To start an auto-reloading development server use the `npm start` target,
however a TOKEN_SECRET environment variable is required to successfully start.
E.g.:
```bash
TOKEN_SECRET=foobar npm start
```
Then visit http://localhost:3000:

(but please use a strong secret, 
its used to encrypt client/server data and if it's too weak it would be possible to spoof the server)

During development it is tiring to continuously have to log in,
so these environment variables may be used to pre-fill the login form:
* `JIRA_URL`
* `JIRA_TOKEN`
* `JIRA_USER`


## Acceptance criteria
To manually verify against regressions these requirements must be adhered to: 

**I CAN LOG IN**
  * GIVEN I have no cookies and go to Home page
  * THEN I'm asked for Jira credentials


  * GIVEN I'm on Home Page and logged in
  * THEN I have a cookie with expiration date in 2 hours

    
  * GIVEN I'm on Home Page and logged in an hour ago
  * WHEN I reload the page
  * THEN cookie expiration date is in 2 hours
  
  
  * GIVEN I'm on Home page and logged in
  * WHEN I clear my cookies and reload the page
  * THEN I'm asked for Jira credentials

**I CAN SEARCH FOR JIRA ISSUES**
  * GIVEN I search for "SEC-123, SEC-234, SEC-345" from Home page
  * THEN I'm taken to Issues page
  * AND I see issues "SEC-123 SEC-234 SEC-345"

**I CAN PRINT JIRA ISSUES**
  * GIVEN I see issues "SEC-123,SEC-234"
  * WHEN I print
  * THEN I get printed version of SEC-123 SEC-234


## Todo/Ideas
* FIX: index.js:1 Warning: Expected server HTML to contain a matching <header> in <main>.
* TRY: https://usehooks.com/useSpring/
* TRY: Formic, for the form
* Fleshed out on-boarding/login flow
    * Welcome-screen, handle "new user doesn't know what any of this is"
    * Ability to disconnect
* "Print preview"-oriented layout
    * Preview issues printed to A4
    * Handle multiple pages gracefully
* Generalize the Jira schema logic
    * Make a demo-deploy somewhere for easy demoing?
    * Update README.md with links to deployed/demo version
    * Write blog introducing the tool
