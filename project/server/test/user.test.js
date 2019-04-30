//load the handmade test db
//call is synchronous bc unit testing requires the db to be reset
const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')




describe('Unit testing the /users route', function() {
	
    

    it('should create a user', function(){
        return request(app)
        .post('/api/users/test_user&test&testville&NC&password')
        .then(function(response){
            return request(app)
                .get('/api/users/test_user')
                .then(function(res2){
                    data = res2.body[0];
                    assert.equal(res2.status, 200);
                    assert.equal(data["name"], "test");              
            });
        });
    });

    it('should get user info', function() {
      return request(app)
        .get('/api/users/test_user')
        .then(function(response){
            assert.equal(response.status, 200);
            data = response.body[0];
            assert.equal(data["name"], "test");
        });
    });

    it('should update user info', function(){
        return request(app)
        .put('/api/users/test_user/test_change&testville&NC')
        .then(function(response){
            return request(app)
                .get('/api/users/test_user')
                .then(function(res2){
                    data = res2.body[0];
                    assert.equal(res2.status, 200);
                    assert.equal(data["name"], "test_change");              
            });
        });
    });

    
    it('should validate user creds', function(){
        return request(app)
            .get('/api/users/login/test_user&password')
            .then(function(res2){
                assert.equal(res2.status, 200);
        });
    });

    it('should update user creds and reject the old password', function(){
        return request(app)
        .put('/api/users/login/test_user&test_password2')
        .then(function(response){
            return request(app)
                .get('/api/users/login/test_user&test_password')
                .then(function(res2){
                    assert.equal(res2.status, 403);
                    assert.equal(res2.body, false);              
            });
        });
    });

    it('should update user interests', function(){
        interests = {
            interest1: "i1",
            interest2: "i2",
            interest3: "i3"
        };
        return request(app)
        .put('/api/users/test_user/interests').send(interests)
        .then(function(response){
            return request(app)
                .get('/api/users/test_user')
                .then(function(res2){
                    data = res2.body[0]["UserInterest"];
                    assert.equal(res2.status, 200);
                    assert.equal(data["interest1"], "i1");
                    assert.equal(data["interest2"], "i2");
                    assert.equal(data["interest3"], "i3");              
            });
        });
    });

    // it('should add timeslots for a user', function(){
    //     return request(app)
    //     .post('/api/users/test_user/timeslots/monday&1&5')
    //     .then(function(response){
    //         return request(app)
    //             .get('/api/users/test_user')
    //             .then(function(res2){
    //                 data = res2.body[0]["UserTimeSlots"][0];
    //                 assert.equal(res2.status, 200);
    //                 assert.equal(data["day_of_the_week"], "monday");
    //                 assert.equal(data["start_time"], 1);
    //                 assert.equal(data["end_time"], 5);              
    //         });
    //     });
    // });

    // it('should delete timeslots for a user', function(){
    //     return request(app)
    //     .delete('/api/users/test_user/timeslots/monday&1&5')
    //     .then(function(response){
    //         return request(app)
    //             .get('/api/users/test_user')
    //             .then(function(res2){
    //                 data = res2.body[0]["UserTimeSlots"];
    //                 assert.equal(res2.status, 200);
    //                 assert.equal(data.length, 0);
    //         });
    //     });
    // });

    it('should delete a user', function() {
        return request(app)
        .delete('/api/users/test_user')
        .then(function(response){
            return request(app)
                .get('/api/users/test_user')
                .then(function(res2){
                assert.equal(res2.status, 200);
                assert.equal(res2.body.length, 0);              
            });
        });
    });



});