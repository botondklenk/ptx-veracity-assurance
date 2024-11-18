# Express App

A sample Express app template with a simple CRUD API and Swagger documentation.

### Prerequisites

- Node.js
- npm

### Installation

Clone the repo or dowload it and push it to your own repo.

### Running the app

```bash
npm install

npm start 
# or 
npm run dev
```

#### Development mode
Running the app in development mode will use `nodemon` to watch for changes and restart the server.
And the swagger documentation can be accessed at `/docs`.

### Docker

```bash
docker build --network=host -t express-app -f docker/app/Dockerfile .
docker run -p 3000:3000 express-app
```

