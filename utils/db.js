function DB() {
    //
    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'Hades870122',
        database: 'comic'
    });
    var events = require('events');
    //
    var _signal = new events.EventEmitter();
    this.signal = function() {
        return _signal;
    };
    //
    this.initialize = function() {
        connection.connect(function(err){
            if (err) {
                console.log('connection error');
                console.info(err);
                return;
            }
            console.log('connection mysql');
        });
    };
    //
    this.queryComicByID = function(id) {
        connection.query("select * from manga where ID = " + id, function(err, rows){
            if (err) {
                console.info(err);
                _signal.emit('query_error');
                return;
            }
            if (rows.length == 0) {
                console.log('query_result_empty');
                _signal.emit('query_empty');
                return;
            }
            console.log('query success');
            //console.info(rows);
            _signal.emit('query_success', rows);
        });  
    };
}

module.exports = DB;