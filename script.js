var dis = document.getElementById('dis')
var info = document.getElementById('info')
info.style.display = "none"
dis.style.display = "none"
const firebaseConfig = {
	apiKey: "AIzaSyClGmWdBBiC5805nEGFKLnWv4p1qgAio40",
	authDomain: "medicine-indicator-1fbc8.firebaseapp.com",
	databaseURL: "https://medicine-indicator-1fbc8-default-rtdb.firebaseio.com",
	projectId: "medicine-indicator-1fbc8",
	storageBucket: "medicine-indicator-1fbc8.appspot.com",
	messagingSenderId: "553743088878",
	appId: "1:553743088878:web:594db03aa078359f7d47ff",
	measurementId: "G-5EQ8TP9ER6"
};
firebase.initializeApp(firebaseConfig);

// Set database variable
var database = firebase.database()
var Shakti_Sena = 0;
var Catalyst = 0;

function get() {
	var party1 = document.getElementById('party1').checked;
	var party2 = document.getElementById('party2').checked;
	var Roll_no = document.getElementById('Roll_no').value
	console.log(party1)
	console.log(party2)
	var user_ref = database.ref(`users/${Roll_no}/Profile/`)
	user_ref.on('value', function (snapshot) {
		var h4 = document.getElementById('info')
		var data = snapshot.val()
		h4.innerHTML = 'Name:- ' + data.Name + ' | ' + 'Roll No.:- ' + data.Roll_No;
		console.log(data);
		if (data.Turn == '1') {
			dis.style.display = "block"
			info.style.display = "block"
			if (party1 == true) {
				Shakti_Sena += 1;
				database.ref(`users/${Roll_no}/Profile/`).update({
					Vote: "Shakti Sena",
					Turn: '0',
				})
				database.ref(`Shakti_Sena/`).update({
					Vote: Shakti_Sena,
				})
			}
			if (party2 == true) {
				Catalyst += 1;
				database.ref(`Catalyst/`).update({
					Vote: Catalyst,
				})

				database.ref(`users/${Roll_no}/Profile/`).update({
					Vote: "Catalyst",
					Turn: '0',
				})
			}
		}
		else if(data.Turn == "0"){
			var h4 = document.getElementById('info')
			dis.style.display = "none"
			info.style.display = "block"
			h4.innerHTML = "You Have Already Given The Vote";
			
		}
		console.log(data.Turn)
	})
	party1 = false;
	party2 = false;
	info.style.display = "none"
	dis.style.display = "none"
	
	party1 = document.getElementById('party1').checked = false;
	party2 = document.getElementById('party2').checked = false;
	
}
