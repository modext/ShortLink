# ShortLink Service

ShortLink is a URL shortening service that allows you to convert long URLs into shortened versions, making them easier to share. This service also tracks the usage statistics of each shortened URL.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the ShortLink service, ensure that you have Node.js and npm (Node Package Manager) installed on your system. You can download and install them from [Node.js official website](https://nodejs.org/).

### Installing

A step by step series of examples that tell you how to get a development environment running.

First, clone the repository to your local machine using Git:

```sh
git clone https://github.com/modext/ShortLink.git
cd ShortLink

```
### Starting the Frontend Service
Then, for the frontend:
```sh
cd client/shortlink
```
Then, install the dependencies using npm:
```sh
npm install
```

To start the service, run the following command in the root directory of the project:
```sh
npm run dev
```
This will launch the ShortLink Frontend service on http://localhost:3000. 
### Starting the Backend Service
```sh
cd server
```

Then, install the dependencies using npm:
```sh
npm install
```
### Starting the Backend Service
To start the service, run the following command in the root directory of the project:
```sh
npm start
```
This will launch the ShortLink service on http://localhost:8000. The service is now ready to encode and decode URLs.

### Running the Tests
To run the automated tests for this system, use the following command:
```sh
npm test
```
This command will execute the test suite and output the test results, indicating whether the tests passed or failed.

## Using the API
#### Encode a URL
To shorten a URL, send a POST request to /encode with the original URL in the request body:

```sh
curl -X POST -H "Content-Type: application/json" -d '{"originalUrl": "http://example.com"}' http://localhost:8000/encode
```
#### Decode a URL
To decode a shortened URL and retrieve the original URL, send a POST request to /decode with the short URL in the request body:
```sh
curl -X POST -H "Content-Type: application/json" -d '{"shortUrl": "http://short.url/abcd1234"}' http://localhost:8000/decode
```
#### Retrieve Statistics
To get the statistics for a shortened URL, send a GET request to /statistic/{shortPath}:

```sh
curl http://localhost:8000/statistic/abcd1234
```
* Replace abcd1234 with the path of your short URL.*
  
## Test from Frontend
The App is the ready to be tested from the frontend. Navigate and test.

## Author
Orji Modestus
orjimodestus@gmail.com

