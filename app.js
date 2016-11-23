// Copyright 2015-2016, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');

const app = express();

// [START hello_world]
// Say hello!
/*
app.get('/', (req, res) => {
  res.status(200).send('Hello, world!');
});
// [END hello_world]
*/
 app.use(express.static(__dirname + '/www'));                 // set the static files location /public/img will be /img for users
app.get('*', function(req, res) {
        res.sendfile('./www/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });    
if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
