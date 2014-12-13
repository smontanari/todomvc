# TodoMVC Examples with sMocker

This folder contains implementations of the TodoMVC sample applications that have been adapted from the original implementations in order to use the [**sMocker**](https://github.com/smontanari/smocker) library. Where the originals rely on the localStorage API to make up for the lack of a backend store, I re-wrote them by using actual ajax calls to retrieve/update data, so that they represent code that would likely run in a real server. The ajax calls are then stubbed out using different sMocker scenarios to simulate server responses.

### What these examples show
These examples contain the same practical scenarios for each library. The intent is to demonstrate the different ways **sMocker** can be used to effectively test a single page javascript Web Application.

### Install
Once you have cloned/downloaded this repository, you will have download the javascript dependencies by executing `bower install` from the example directory of your library of choice.

### How to run
You should be able to run these examples the same way you run the originals, i.e. by opening the index.html file in your browser. However, sMocker will not trigger any scenario unless explicitly instructed through the *test_scenario* parameter appended to the url.

For instance, in order to run "scenario1" for the angularjs example you will need to open the following file url in your browser:
"**file:///.../todomvc/smocker-examples/angularjs/index.html?test_scenario=scenario1**"

> **Chrome users:** Chrome is not very friendly when running/downloading javascript from the local file system, so one option is to start your Chrome browser from the command line with the following flag:

	$ <path-to-chrome-app> --allow-file-access-from-files

### The scenarios
At the moment these examples include two scenarios (the code is in the *js/smocker-scenarios.js* file):

- **scenario1**: this scenario shows how to use a *static fixture* in sMocker, i.e. how to stub the response data simply through an external file.
- **scenario2**: this scenario defines a *dynamic fixture* which returns the data after a delay of 2 seconds, so that you also have the time to observe a simple overlay displayed by the application while waiting for the response.

### Automated functional tests with Funcunit
If you want to take it one step further open the functional-tests.html file in your browser and see the execution of a few of functional tests (implemented with [**Funcunit**](http://funcunit.com/)). This is to show how quickly you can run functional tests for a single page javascript Web Application without having to run any backend server.
> **Note**: in order to execute the tests successfully you will have to allow popup to be opened for that url/file. In Chrome you can simply add the "--disable-popup-blocking" switch when launching the browser.