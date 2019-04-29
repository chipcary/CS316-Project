const assert = require('assert');
const expect = require('chai').expect
const request = require('supertest');
const app = require('../app')


describe('Unit testing the /projects route', function() {
    before(function() {
        test_project = {
        "creator_email" : "test_user",
        "project_name":"test_project",
        "tag" : "b",
        "start_date": "2019-10-10",
        "end_date": "2019-10-11",
        "curr_capacity": "0",
        "goal_capacity": "10",
        "city": "Durham",
        "state": "NC"
        };
        request(app)
        .post('/api/users/test_user&test&testville&NC')
        .then(function(response){
            return;          
        });
    });
    after(function() {
        return request(app)
        .delete('/api/users/test_user')
        .then(function(response){
            return;          
        });
    });

    it('should get all projects', function() {
      return request(app)
        .get('/api/projects')
        .then(function(response){
            assert.equal(response.status, 200);
        });
    });

    it('should create a new project', function() {
      return request(app)
        .post('/api/projects/').send(test_project)
        .then(function(response){
            return request(app)
                .get('/api/projects/search-substr/test_project')
                .then(function(res2){
                    res2.body = res2.body.rows[0]
                    project_pid = res2.body["pid"];
                    prev_pid = project_pid - 1;
                    assert.equal(res2.status, 200);
                    assert.equal(res2.body["project_name"], "test_project");
                    assert.equal(res2.body["curr_capacity"], 1);              
            });
        });
    });

    it('should get all projects created by a user', function() {
        return request(app)
                .get('/api/projects/test_user/created')
                .then(function(res2){
                    assert.equal(res2.status, 200);
                    assert.equal(res2.body[0]["project_name"], "test_project");
                });
    });
    it('should add user to a project', function() {
      return request(app)
                .post('/api/projects/' + prev_pid +'/users/test_user')
                .then(function(res2){
                    assert.equal(res2.status, 200);
                    joined_project = res2.body;
                });
    });

    it('should get all projects joined by a user', function() {
        return request(app)
                .get('/api/projects/test_user/joined')
                .then(function(res2){
                    console.log(res2.body)
                    assert.equal(res2.status, 200);
                    assert.equal(res2.body.length, 2);
                });
    });

    it('should get a specific project', function() {
       return request(app)
                .get('/api/projects/' + project_pid)
                .then(function(res2){
                    assert.equal(res2.status, 200);
                    assert.equal(res2.body["project_name"], "test_project");
                    assert.equal(res2.body["curr_capacity"], 1);              
            });
    });

    it('should get recommended projects for a user', function() {
      return request(app)
                .get('/api/projects/bhc17@duke.edu/best')
                .then(function(res2){
                    assert.equal(res2.status, 200);
            });
    });

    

    it('should remove user from a project', function() {
       return request(app)
                .delete('/api/projects/' + prev_pid +'/users/test_user')
                .then(function(res2){
                    return request(app)
                    .get('/api/projects/test_user/joined')
                    .then(function(res2){
                        assert.equal(res2.status, 200);
                        assert.equal(res2.body[0]["pid"], project_pid);

                    });
            });
    });

    it('should update a project', function() {
        update_data = {project_name: "updated"}
        return request(app)
        .put('/api/projects/' + project_pid).send(update_data)
        .then(function(response){
            return request(app)
                .get('/api/projects/' + project_pid)
                .then(function(res2){
                    assert.equal(res2.status, 200);
                    assert.equal(res2.body["project_name"], "updated");
                    assert.equal(res2.body["curr_capacity"], 1);              
            });
        });
      
    });

    it('delete a project', function() {
       return request(app)
        .delete('/api/projects/' + project_pid)
        .then(function(response){
            return request(app)
                .get('/api/projects/' + project_pid)
                .then(function(res2){
                    assert.equal(res2.status, 200);
                    assert.deepEqual(res2.body, {});
            });
        });
    });
});