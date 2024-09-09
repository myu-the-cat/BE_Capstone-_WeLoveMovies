# We Love Movies

The backend server side and DB config and communication layer for a frontend web application to provide users with data about movies, theaters, and reviews.

## Installation

1. Run `cp.env.sample .env`.
2. Update your `.env.` file with a connection URL to your Render database instance. The connection URL can be found in your Render database instance details (e.g., `"postgres://myfakedatabase:8t6FiWqSDF8GsR--7mrun245I9TofnWd@fakepostgres.db.render.com:5432/myfakedatabase"`). Make sure to append `?ssl=true` to the end of the URL to ensure a secure connection (e.g., `"postgres://myfakedatabase:8t6FiWqSDF8GsR--7mrun245I9TofnWd@fakepostgres.db.render.com:5432/myfakedatabase?ssl=true"`).
3. Run `npm install` to install project dependencies.
4. Run `npm run start:dev` to start your server in development mode.
