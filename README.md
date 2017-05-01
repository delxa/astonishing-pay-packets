# astonishing-pay-packets

## Getting started

**Note:* This app uses SQLite for persisting Payslips. If you are on Mac, you should have it installed. Otherwise, view the [downloads page](https://www.sqlite.org/download.html)

1. `git clone https://github.com/delxa/astonishing-pay-packets.git` to clone the repo
2. `npm install` to grab all the dependencies
3. `npm test` to execute unit tests against the PayCalculator Class
4. `npm start` to start the backend server and to compile the frontend app (via Webpack)
5. `http://localhost:3000` with your browser to view the awesome.


## Choice of technologies

- **JS** - I like JS and I find that I can get a lot done using it.
- **Express.js Server** - Makes wiring up routes simple. Offers great support for middleware.
- **React + React Router** - I haven't used React Router yet so was a good opportunity to see how well it handles a small single page app. React is generally 
- **Webpack + Babel** - Bundling and transpiling of ES6 to something browsers can understand. Currently unminified, hence large!
- **SQLite and Sequelize** - SQLite is lightweight file-based database engine. Sequelize is an ORM library that works with SQLite, MySQL, MSSQL and PostGRE.
- **Vows.js for Testing** - Nice little node-based unit testing framework that supports running tests in parallel. Not convinced a better approach than jasmine. Fast though.

## Assumptions

- In checking if a Payslip has been created, it is sufficient to match on payslips with matching Firstname and Surname between the start and end of the calendar month.
- Have not segmented payslips into Employer as beyond the scope of this exercise.
- Have assumed that extensibility for this particular App not important. In the case that it is, would have opted to go with redux.


## Decisions and considerations

- React sans Redux - I quite like Redux but I felt using it for this was going to add just too much complexity.  Arguably, it would have kept the components a lot cleaner and centralising the state would have been nice. I did originally set off down this path but seemed like overkill halfway through.
- I'm really unhappy with how big the app has gotten to support such a simple set of actions. The front end is 5mb, most vendor files jsut to poly-fill all the modern behavior (ES6, fetch, etc)
- React gives you a nice and extensible approach to creating really well-architected apps. But when you are trying to do relatively simplistic stuff like this, it makes you jump through a lot of hoops. I regret not just pointing Angular 1.x at this problem. But I wouldn't have learnt anything new, had I taken that approach.
- I ran out of time to do so, but integration tests against the API endpoints would be nice too. Lots of good tooling for Node.js.
