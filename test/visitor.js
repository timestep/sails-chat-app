var chai = require('chai')
	, chaiHttp = require('chai-http');

chai.use(chaiHttp);

var app = 'http://localhost:1337'

describe('A visitor',function(){

	describe('visits the page',function(){
	
		it('should be successful', function(done){
	
			chai.request(app).get('/')
				.res(function(res){
					expect(res).to.have.status(200);
				});
			done();

		});
	
	});

});