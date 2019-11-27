


const goDown = function(todoList, id){
	for (var i=todoList.length-2; i>=0; i--) {

            if ((todoList[i][0] === id)) {
                var swap = todoList[i];
                todoList[i] = todoList[i + 1];
                todoList[i + 1] = swap;
                break;
            }

        }
}


const goUp = function(todoList, id){
	for (var i=todoList.length-1; i>=0; i--) {

            if ((todoList[i][0] === id) && (i>0)) {
                var swap = todoList[i];
                todoList[i] = todoList[i - 1];
                todoList[i - 1] = swap;
                break;
            }
        }
}


module.exports ={
	goDown,
	goUp
};
