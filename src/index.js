import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const logging = require('@jenkins-cd/logging');
logging.setLogLevel('org.jenkinsci.sse', logging.Level.DEBUG);

var sse = require('@jenkins-cd/sse-gateway');

// Connect to the SSE Gateway, providing an optional client Id.
var connection = sse.connect('react-sse-test', () => {
  console.log('onConnect')
}, {
  jenkinsUrl: 'http://114.132.204.65:8080'
});
// subscribe to all events on the "job" channel...
var jobSubs = connection.subscribe('job', function (event) {
  var event = event.jenkins_event;
  var jobName = event.job_name;

  if (event === 'job_run_ended') {
    var runStatus = event.job_run_status;
    var runUrl = event.jenkins_object_url;

    // Do whatever ....
  }
});
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
