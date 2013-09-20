var chai = require('chai')
  , should = chai.should()
	, chaiHttp = require('chai-http')


chai.use(chaiHttp);

var app = 'http://localhost:1337';
var visit_root_path = chai.request(app).get('/')
var visit_user_path = chai.request(app).get('/user')
var global;
console.log(app)
describe('JSON ENDPOINT',function(){
console.log('meow1');
	describe('root path',function(){
console.log('meow2');
		it('should be successful', function(){
      console.log('meow');
			visit_user_path.res(function(res){
        global = res;
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

console.log(global);