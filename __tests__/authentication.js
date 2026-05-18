'use strict';
const should = require('should');

const zapier = require('zapier-platform-core');

const App = require('../index');
const appTester = zapier.createAppTester(App);


describe('authentication', () => {
    zapier.tools.env.inject();

    it('should authenticate', (done) => {
        const bundle = {
            authData: {
                application_id: process.env.TEST_APPLICATION_ID,
                integration_key: process.env.TEST_INTEGRATION_KEY
            }
        };

        appTester(App.authentication.test, bundle)
            .then((response) => {
                should.exist(response.data);
                done();
            })
            .catch(done);
    });

});
