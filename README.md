Date Created: 
# RESTful-API-Node

## Details: 

This is a RESTful Application programming interface implementation using NODE.js and MongoDB.
It maintains a data of movie genres, customers, movies, users and rentals in a movie renting company in form of a JSON object in Mongo DB databse and processes HTTP CRUD requests using Representational state transfer
software architectural style.

Frameworks used in this Implementation: 
1. Express
2. Nodemon
3. Joi
4. Mongoose

Joi and Mongoose are used for input validation and making sure user input does not cause an error at the backend.
Nodemon is used to update the localhost server everytime there is a change in the code
Express is used to structure the code into structured blocks therefore helping in organising the code into a clean readable format.


4 Different Request types:
** ALL 4 of these request types can be sent to the customers api, genres api, movies api, and rental api.

 1. Get: Client can ask for all employee data with url '/api/customers' or '' or the data of a specific customers using '/api/customers/:id' http get request at the specified url. This request causes mongoose framework to abstract data from MongoDB data and provide it to the user.
 
 2. Post: Client can add a new genre to the list of genres using url '/api/genre' and sending a http post request to the server and adding a json body with the genre information.
 
3. Put: Client can update the information of an existing customer using url:  '/api/customer/:id' with a json body for the employees new information. The client needs to send a HTTP put request to the specified url. This will cause mongoose to first search for the specified id, if the id does not exist, it will send back a 400 bad request error. Otherwise, it will send the details of the specified customer.

4. Delete: Client can delete the information of an existing customer using url: 'api/customer/:id' and send a HTTP delete request to the url. This will cause mongoose to first search for the specified id, if the id does not exist, it will send back a 400 bad request error. Otherwise, it will delete the details of the specified customer.

* if the name is below 4 characters long, the client gets a 400 warning notifying them that the name is too short
* if the age is below 18, the client gets a warning that the age of the new employee is not at least 18
* if any of the fields is missing is the JSON body, the client gets a 404 error notifying that the field is required 
* Joi takes care of these input validations
* mongoose takes care of input validation by defining a schema for each specific model. 
