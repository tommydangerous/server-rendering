# Server Rendering

## Development

Install Node packages
```sh
$ npm install
```

Start development server
```sh
$ npm start
```

## Production

Compile to from ES6 to ES5
```sh
$ npm run build
```

Run production server
```sh
$ npm run production
```

## How to Use

Get a health check
```sh
$ curl http://localhost:8080/health #=> OK
```

Render component via POST
```sh
$ curl -d '{ "component": "Test", "props": { "name": "Kylo" } }' \
  -H "Content-Type: application/json" \
  http://localhost:8080/render
```

Sample response
```javascript
{
  "metadata": {
    "component": "Test",
    "props": {
      "name": "Kylo"
    }
  },
  "html": "<h1 data-reactid=\".o5xoba8b28\" data-react-checksum=\"245574295\"><span data-reactid=\".o5xoba8b28.0\">Hello </span><span data-reactid=\".o5xoba8b28.1\">Kylo</span></h1>"
}
```

You can render the component via GET in your browser (only in development):
```
http://localhost:8080/test/render?component=Test&name=Kylo
```
