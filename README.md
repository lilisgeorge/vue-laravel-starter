## About

Vue-laravel-starter is a basic boilerplate for building vue single-page applications with a headless laravel as the backend. The purpose of creating it is to provide a head start when starting a new idea.

## Installation

Clone repository
Create a database
Install dependencies by running `npm install` within `client` folder and `composer install` within `api` folder.
Setup `.env.development.local` inside `client` folder and `.env` inside `api` folder. There are `.example` files for both of these.

## Prepare webserver

If you are using Valet then simply call `valet link domain_name` within `path/to/api` folder and Valet will take care of everything.

If you are using Laravel Homestead then follow the official guidelines on how to set up a site.

Else create a virtual host that points a local domain and to `path/to/api/public` folder.

Finally update `VUE_APP_API_URL` inside `.env.development.local`.

## Run

Navigate inside `client` folder and run `npm run serve`.

## Build

Navigate inside `client` folder and run `npm run build`.

This command will generate the production files within `api/public/app` folder and create `app.blade.php` inside `api/resources/views` folder.