var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var dateFormat = require('dateformat');
dateFormat.i18n = {
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    monthNames: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Jui', 'Jul', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec', 'Janvier', 'Février', 'Mars', 'Avirl', 'Mai', 'Juin', 'Julliet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    timeNames: ['a', 'p', 'am', 'pm', 'A', 'P', 'AM', 'PM']};
var ent = require('ent');

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

/* On utilise un namespace pour le chat et un pour la TodoList */
var chatIO = io.of('/my-chat');
var todoListIO = io.of('/my-todoList');

/*Le port est 8090*/
server.listen(8081);

//Déclaration des variables
var id = 0;
var todoList = [];
var user = [];
user[0] = [];
user[1] = [];


/* On utilise les sessions */
app.use(session({secret: 'todotopsecret'}))

/* S'il n'y a pas de todolist dans la session,
 on en crée une vide sous forme d'array avant la suite */
    .use(function (req, res, next) {
        if (typeof(req.session.todolist) === 'undefined') {
            req.session.todolist = [];
        }
        next();
    });

    /* On affiche la page du chat */
app.get('/chat', function (req, res) {
        res.render('index.ejs', {todolist: req.session.todolist});
    })

    /* On redirige vers la todolist si la page demandée n'est pas trouvée */
    .use(function (req, res, next) {
        res.redirect('/chat');
    });



todoListIO.on('connection', function (socket) {
    socket.on('add user', function (pseudo) {
        pseudo = ent.encode(pseudo);
        socket.pseudo = pseudo;
        todoListIO.emit('update todolist', todoList);
    });
    socket.on('add task', function (task) {
        task = ent.encode(task);
        var now = new Date();
        todoList.push([id, task, socket.pseudo, dateFormat(now, "d mmm à H:MM:ss")]);
        id++;
        todoListIO.emit('update todolist', todoList);
    });
    socket.on('remove task', function (task_id) {
        for (var i=todoList.length-1; i>=0; i--) {

            if (todoList[i][0] === task_id) {
                todoList.splice(i, 1);
                break;
            }
        }
        todoListIO.emit('update todolist', todoList);
    });
    socket.on('manage task', function (task) {
        var now = new Date();
        for (var i=todoList.length-1; i>=0; i--) {

            if (todoList[i][0] === task[0]) {
                todoList[i][1] = task[1];
                todoList[i][2] = socket.pseudo;
                todoList[i][3] = dateFormat(now, "d mmm à H:MM:ss");
                break;
            }

        }
        todoListIO.emit('update todolist', todoList);
    });
    socket.on('go up', function (id) {
        for (var i=todoList.length-1; i>=0; i--) {

            if ((todoList[i][0] === id) && (i>0)) {
                var swap = todoList[i];
                todoList[i] = todoList[i - 1];
                todoList[i - 1] = swap;
                break;
            }

        }
        todoListIO.emit('update todolist', todoList);

    });
    socket.on('go down', function (id) {
        for (var i=todoList.length-2; i>=0; i--) {

            if ((todoList[i][0] === id)) {
                var swap = todoList[i];
                todoList[i] = todoList[i + 1];
                todoList[i + 1] = swap;
                break;
            }

        }
        todoListIO.emit('update todolist', todoList);

    });
});


chatIO.on('connection', function (socket) {

    socket.on('add user', function (pseudo) {
        pseudo = ent.encode(pseudo);
        var now = new Date();
        socket.pseudo = pseudo;
        user[0] = [socket.pseudo, dateFormat(now, "d mmm à H:MM:ss")];
        user[1].push([pseudo, dateFormat(now, "d mmm à H:MM:ss")]);
        chatIO.emit('user joined', user);
    });

    socket.on('disconnect', function () {
        var now = new Date();
        user[0] = [socket.pseudo, dateFormat(now, "d mmm à H:MM:ss")];
        for (var i=user[1].length-1; i>=0; i--) {
            if (user[1][i][0] === socket.pseudo) {
                user[1].splice(i, 1);
                break;
            }
        }
        chatIO.emit('user disconnected', user);
    });

    socket.on('send message', function (message) {
        if(message === null){
            message = " ";
        }
        message = ent.encode(message);
        var now = new Date();
        chatIO.emit('nouveau_message', [socket.pseudo,message,dateFormat(now, "H:MM:ss | d mmm")])
    })

});


