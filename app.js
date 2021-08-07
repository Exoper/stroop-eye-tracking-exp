// Modules and variables
const express = require('express'),
nodemailer = require('nodemailer'),
//bodyParser = require('body-parser'),
//{ AsyncParser } = require('json2csv'),
fs = require("fs"),
createCsvWriter = require('csv-writer').createObjectCsvWriter;

var data_dict = {};


// --- INSTANTIATE THE APP
app = express();
// --- STATIC MIDDLEWARE 
app.use(express.static(__dirname+'/public'));
app.use('/jspsych', express.static(__dirname + "/jspsych"));

//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:false}));

console.log(__dirname);

// --- VIEW LOCATION, SET UP SERVING STATIC HTML
app.set('views', __dirname+'/public/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// --- ROUTING
app.get('/', function(request, response) {
    response.render('index.html');
});


app.get('/experiment', function(request, response) {
    response.render('Stroop_colorword.html');
});

app.post('/save_data', function(request,response){
	data_dict['stroop_acc'] = request.body.stroop_acc;
	data_dict['stroop_total'] = request.body.stroop_total;
	data_dict['stroop_cong'] = request.body.stroop_cong;
	data_dict['stroop_inc'] = request.body.stroop_inc;
	data_dict['cpt_acc'] = request.body.cpt_acc;
	data_dict['cpt_rt'] = request.body.cpt_rt;
	data_dict['tmt_avg'] = request.body.tmt_avg;
	data_dict['tmt_total'] = request.body.tmt_total;
	response.status(201).send({success:true});
// 	const csvWriter = createCsvWriter({
//     path: 'data/'+request.body.subject_id+'.csv',

//     header: [
//         {id: 'success', title: 'success'},
//         {id: 'trial_type', title: 'trial_type'},
//         {id:'trial_index' , title:'trial_index'},
//         {id: 'time_elapsed', title:'time_elapsed'},
//         {id: 'internal_node_id', title:'internal_node_id'},
//         {id:'subject', title:'subject'},
//         {id: 'rt', title:'rt'},
//         {id:'stimulus' , title:'stimulus'},
//         {id:'response' , title:'response'},
//         {id:'load_time' , title:'load_time'},
//         {id:'raw_gaze' , title:'raw_gaze'},
//         {id:'percent_in_roi' , title:'percent_in_roi'},
//         {id:'average_offset' , title:'average_offset'},
//         {id:'validation_points' ,title:'validation_points'},
//         {id:'samples_per_sec' ,title:'samples_per_sec'},
//         {id:'view_history',title:'view_history'},
//         {id:'type',title:'type'},
//         {id:'Congruency',title:'Congruency'},
//         {id:'letter',title:'letter'},
//         {id:'webgazer_data',title:'webgazer_data'},
//         {id:'webgazer_targets',title:'webgazer_targets'},
//         {id:'correct',title:'correct'}
//     ]
// });
	
// 	const data = JSON.parse(request.body.data);

// 	csvWriter.writeRecords(data)
//   .then(()=> {
//   	//console.log(data);
//   	response.status(201).send({success:true});
//   });

 });

app.get('/report',function(request,response){
	response.render('report.html',{stroop_inc:data_dict['stroop_inc'],stroop_cong:data_dict['stroop_cong'],
									stroop_acc:data_dict['stroop_acc'],stroop_total:data_dict['stroop_total'],
									cpt_acc:data_dict['cpt_acc'],cpt_rt:data_dict['cpt_rt'],
									tmt_avg:data_dict['tmt_avg'],tmt_total:data_dict['tmt_total']})
});

// --- START THE SERVER 
var server = app.listen(process.env.PORT || 3000 , function(){
    console.log("Listening on port %d", server.address().port);
});

