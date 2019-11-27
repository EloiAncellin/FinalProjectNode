var mysql = require('mysql');



const saveTodoList= function(Connection, todoList){

	Connection.query('DELETE FROM tdList');
	var date, username, content, query;
	//if(todoList.length>1){
		for(var i=0; i<todoList.length; i++){
			username = todoList[i][1];
			content=todoList[i][2];
			date=todoList[i][3];
				query = 'INSERT INTO tdList (content, username, date)VALUES(\''  + username + '\', \'' + content + '\',\' ' + date + '\');';
				Connection.query(query, (err, rows) =>{
					if(err) throw err;
				})
		}
}


const getTodoList = function(Connection, todoList){
	Connection.query('SELECT * FROM tdList', (err,rows) => {
  		if(err) throw err;
 		for(var elem of rows){
 			var temp = [];
 			temp.push(elem.id);
 			temp.push(elem.content);
 			temp.push(elem.username);
 			temp.push(elem.date);
 			todoList.push(temp);
 		}
	});
}


module.exports = {getTodoList, saveTodoList};