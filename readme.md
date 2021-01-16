# Chat platform
In this folder you'll find the backend (api folder) and the frontend, that's an Angular app. 
At the beginning the backend was a laravel application, then I noticed that Laravel was overkill for just an api, so I moved to 
Lumen, that's almost similar and fits best for api purposes.
## Backend setup
So navigating to api/chat-platform you'll find the .env file.
Of course you must change the DB_HOST value. Then you must create a database schema named after the DB_DATABASE value. 
For push notifications as you can see I've done it with Pusher, it's still hosted so you can keep the Pusher keys and ids, of course it's better if you create a dedicated Pusher account, mostly for your users' privacy.

Now go with a terminal in api/chat-platform

`composer install`

Then create the database Tables

`php artisan migrate`

Create user role records and first admin account.

It will have

username: MasterAdmin password: Admin123@

`php artisan db:seed`


Finally you can try it with the php toy server: 


`php -S localhost:8000 -t public`


Of course pay attention to the server url you choose because need to be set in the angular frontend.

## Frontend setup
Now go in to frontend/src you'll find a file `proxy.conf.json` there change the target value with the server url you chose before. Then go to the file in frontend/app/globals/endpoint.js then change the baseUrl value to the same server url you chose, also the same with repositoryUrl, it's needed to retrieve users attachments. 
Then from the root of the folder named frontend:

`npm install`


`ng serve`

