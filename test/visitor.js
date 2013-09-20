var chai = require('chai')
  , should = chai.should()
	, chaiHttp = require('chai-http')


chai.use(chaiHttp);

var app = 'http://localhost:1337';
var visit_root_path = chai.request(app).get('/')
var visit_user_path = chai.request(app).get('/user')

describe('JSON ENDPOINT',function(){
	describe('root path',function(){

		it('should be successful', function(){

			visit_user_path.res(function(res){
        console.log(res);
				// res.should.be.json;
        // res.should.be.html
        // res.should.be.html;
			});
		});
	});

  // describe('user index',function(){

  // 	it('should be successful', function(done){
  // 		visit_user_path.res(function(res){
  // 			expect(res).to.have.status(200);
  // 		});
  // 		done();
  // 	})

  // 	it('should be JSON', function(done){
  // 		visit_user_path.res(function(res){
  // 			expect(res).to.be.json;
  // 		});
  // 		done();
  // 	})

  //   it('should contain values', function(done){
  //     visit_user_path.res(function(res){
  //       expect(res).to.not.be.json;
  //     })
  //     done();
  //   })

  // })
});

