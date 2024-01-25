# nodejsexpenses
Connect to mongo container user portainer or other means

### Case is important for the DB name

mongo --username xxx --password xxx

use expenses

db.createUser({user:"xxx",pwd:"xxx",roles:[{role: "readWrite" , db:"expenses"}]},{w:"majority",wtimeout:5000})

