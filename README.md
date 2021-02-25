# README #

### What is this repository for? ###
* Boilerplate for Cucumber, Javascript, Axios, Selenium stack

### Prerequisites ###
1. Node.js version 10.13.0 or newer with NPM version 6.4.1 or newer
2. Google Chrome installed on local PC

### How do I get set up? ###
1. Clone repository to your local PC
2. Navigate to repository folder using Git Bash on Windows
3. Run: ```npm install```
4. After the npm completes installation you can run the tests using cucumber

### How to run tests? ###
* Run all tests against the Staging environment:
$ ./run.sh stage
* Run all tests against the Test environment:
$ ./run.sh test
* Run all smoke tests against the Staging environment:
$ ./run.sh stage --tags @smoke
* Run all login tests against the Test environment:
$ ./run.sh test features/login.feature

### References ###
* [Axios](https://github.com/axios/axios) - Promise based HTTP client for the browser and node.js
* [Cucumber JS](https://github.com/cucumber/cucumber-js) - Cucumber for JavaScript
* [Learn Markdown](https://bitbucket.org/tutorials/markdowndemo)
