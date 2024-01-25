# nodejs_webhook_listener
 
A basic app written in node to which you can post webhooks. Both GET and POST requests can be sent to it and will be saved in node-cache
There is also a dockerfile if you want to dockerize this app

### How to use it
* First make a request to / to get a webhookId that you can use.
* Then you can make GET and POST requests to /:webhookId
* The headers, body, form data, URL parameters, and cookies are all stored in an Array and sent to node-cache and the cache key is your webhookId
* You can also DELETE your data by making a DELETE request to /:webhookId
* To retrieve your data make a request to /retrieveData/:webhookId
* Right now 50 items are stored in the cache. Cache is kept for 2 hours after which it is deleted automatically



# nodejsexpenses
Connect to mongo container using portainer or other means

### Case is important for the DB name

* mongo --username xxx --password xxx
* use expenses
* db.createUser({user:"xxx",pwd:"xxx",roles:[{role: "readWrite" , db:"expenses"}]},{w:"majority",wtimeout:5000})


    


# password_pusher_node
 pglombardo/PasswordPusher but in node and APIs  
 This project is pretty much this project but in Node and APIs https://github.com/pglombardo/PasswordPusher

##### How things fit together
* Everything is written in JS and uses Sequelize as the ORM and MySQL as the backend and jsonvalidator to validate JSON  
* app.js calls apiRoutes.js which calls passwordController.js This is pretty much the main flow. The project is small and simple

##### Docker
You can build the image with the included Dockerfile, or get it from here: https://hub.docker.com/repository/docker/necrolingus/password_pusher_node  
The best way to run this is in docker compose, with a mysql container.  

##### Want to use a different DBMS?
* Install the appropriate driver: https://sequelize.org/master/manual/getting-started.html  
* In dbConfig.js change your dialect  
* In createDb.js add the relevant code to create the DB in your chosen DMBS. This is done so I did not have to bootstrap stuff outside of this project. This way everything is contained in one project  

##### The main takeaways:
* dbConfig.js is the main place for all configs  
* There is a POST to create a password. A GET to GET a password. A DELETE to delete a password (the DELETE will probably never be used)  
* Passwords are stored encrypted in the DB. Check out cipherHandler.js  
* Old records are deleted automatically by vacuumDb.js which runs as a setInterval

##### What environment variables do I need to pass
There is a .env.sample file in the api folder. For docker, you of course have to pass these variables.  
ENCRYPTIONKEY  
DBHOST  
DBPORT  
DBUSER  
DBPASSWORD  
DATABASE  

#### A quick rundown
##### POST:  
<your_url>:8080/api/password  
**Request:** {"password":"i am a super strong password!","hoursToLive":2,"viewsToLive":3}  
**Response:** {"status": "good","outcome": "db9d3915-2ecb-4671-b8d5-3519df48f0a1"}  
This UUID is what you share with the peson so they can get the password  
hoursToLive is how long this password should be in the DB before it gets deleted  
viewToLive is how many times it can be viewed before it gets deleted  

##### GET:
<your_url>:8080/api/db9d3915-2ecb-4671-b8d5-3519df48f0a1  
**Response:**  
{  
    "status": "good",  
    "outcome": {  
        "uniqueId": "c53d5b02-2361-4228-a283-5e53bee683a7",  
        "password": "i am a super strong password!",  
        "hoursToLive": "2021-06-07T19:14:29.531Z",  
        "viewsToLive": 3,  
        "createdAt": "2021-06-07T15:14:29.000Z",  
        "updatedAt": "2021-06-07T15:14:29.000Z"  
    }  
}  
After every view viewsToLive will get decremented

##### DELETE:
<your_url>:8080/api/c53d5b02-2361-4228-a283-5e53bee683a7  
**Response:** {"status": "good", "outcome": 1}    
Outcome contains the number of records deleted (will always be 1 or 0)  
I dont think anyone will ever use DELETE, but there will for sure be a use case for it somewhere  


#### Will I create a gui for it?
* Probably at some point




# takealot_sales_puller

## How to use it

You can schedule this to run in Cron or the like  
Raname .env.sample to .env and add the relevant details (Your takealot API key will go in here).  
The start date can be configured in .env. It will pull up to today's date.  
Right now it supports MySQL only.


## What is left to do
#### Dedupe
Right now keep forceDbRecreate as true in dbConfig.js as the application pulls all sales and inserts all sales into the DB every time it runs, so maybe only run it once per day or so.  
It does not take long though to pull and insert all records. It takes but a few seconds for 800 records or so (this includes a 2 second sleep to prevent rate limiting).


### Email new sales
A feature to email new sales could be nice.


# custom_mqtt_bridge_for_sonoff
ISP cant do port forwarding, so wrote my own bridge

Will subscribe to remote server topic, then pass it on to local server topic, then immediately subscribe to "stat"/xxx topic to get the status of the sonoff device, then pass that back in a new connection to the remote server again, closing both internal connections once it is done, leaving only the outer connection open.

Simple enough to expand on and use out of the box


# magic_mirror
my magic mirror docker-compose and config

