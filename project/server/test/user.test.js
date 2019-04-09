//load the handmade test db
//call is synchronous bc unit testing requires the db to be reset
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')




describe('Unit testing the /users route', function() {
	
    it('should return get user info', function() {
      return request(app)
        .get('/api/users/bhc17@duke.edu')
        .then(function(response){
            assert.equal(response.status, 200);
            data = response.body[0];
            assert.equal(data["name"], "Chip");
        });
    });

    it('should delete a user', function() {
        return request(app)
        .delete('/api/users/bhc17@duke.edu')
        .then(function(response){
            return request(app)
            	.get('/api/users/bhc17@duke.edu')
        		.then(function(res2){
            	assert.equal(res2.status, 200);
            	assert.equal(res2.body.length, 0);            	
        	});
        });
    });

});