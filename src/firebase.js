import firebase from 'firebase/app';
import 'firebase/firestore';

class Firebase {
    constructor() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDKABQD0tdjAYq4cblgxf4JtqS1cPVh_Vg",
            authDomain: "dino-forest.firebaseapp.com",
            databaseURL: "https://dino-forest.firebaseio.com",
            projectId: "dino-forest",
            storageBucket: "dino-forest.appspot.com",
            messagingSenderId: "668056514880",
            appId: "1:668056514880:web:218f162f138ac34ad70aa5",
            measurementId: "G-S4B999TE2P"
        };

        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);

        // Setup access to the database
        this.db = firebase.firestore();
    }
    
    saveScore(name, score) {
        this.db.collection("scores").doc().set({
            name: name,
            score: score
        })
        .then(() => {            
            const nickname = document.getElementById("name");
            nickname.disabled = true;
    
            const saveBtn = document.getElementById("save");
            saveBtn.disabled = true;
            saveBtn.value = "Score Saved"
            saveBtn.style.backgroundColor = "white";
            saveBtn.style.color = "black"
        })
        .catch((error) => {
            const saveBtn = document.getElementById("save");
            saveBtn.value = "Try Again"
            saveBtn.style.backgroundColor = "red";
            saveBtn.style.borderColor = "red";
        });
    }

    getScores() {
        // Clear current scores in our scoreboard
        document.getElementById('scoreboard').innerHTML = '<tr><th>Rank</th><th>Name</th><th>Score</th></tr>';

        // Get the top 5 scores from our scoreboard
        this.db.collection("scores").orderBy("score", "desc").limit(5).get().then((snapshot) => {
            let rank = 0;
            snapshot.forEach((doc) => {
                rank += 1;
                document.getElementById('scoreboard').innerHTML += '<tr>' +
                    '<td>' + rank + '</td>' +
                    '<td>' + doc.data().name + '</td>' +
                    '<td>' + doc.data().score + '</td>' +
                    '</tr>';
            })
        })
    }


    resetInput() {
        const nickname = document.getElementById("name");
        nickname.disabled = false;
        nickname.style.borderColor = "white";
        nickname.placeholder = "Enter a name";
        nickname.value = "";

        const saveBtn = document.getElementById("save");
        saveBtn.disabled = false;
        saveBtn.innerHTML = "Save Score"
        saveBtn.style.backgroundColor = "transparent";
        saveBtn.style.color = "white"
        saveBtn.style.borderColor = "white";
    }

}

export default Firebase;
    