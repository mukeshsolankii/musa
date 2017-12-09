var express = require('express');
var morgan = require('morgan');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fetch = require('node-fetch');

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.set('view engine','ejs');

var users = null;
function fu(){
	fetch('https://jsonplaceholder.typicode.com/users')
	.then(function(res){
	    return res.json();
	}).then(function(json){
	   users = json;
	});
};

var posts = null;
function fp(){
fetch('https://jsonplaceholder.typicode.com/posts')
.then(function(res){
	return res.json();
}).then(function(json){
    posts = json;
});
};

var postarr = [];
app.get('/',function(req ,res){
    if(users == null){
	     fu();
		 res.send("Please refresh again!!");
    }else{	 
	     var name = 'Solanki';
	     res.render('index',{users : users , name : name , pa : postarr});
	}
    for(var i=1;i<users.length;i++){
	  var x = post(i);
	    if(x != undefined){
	       postarr.push(x);
	    }
    }		
});

//Main function for posts couting.....
function post(v){
	if(posts == null){
		fp();
	}else{
		var count = 0;
			for(var i=0;i < posts.length;i++){
		    	if(posts[i].userId == v){
		        count++;
	    	}
    }
    return count;
  }
}

var port = 8080;
app.listen(8080,function(){
    console.log(`your app is started at "${port}" !`);
});