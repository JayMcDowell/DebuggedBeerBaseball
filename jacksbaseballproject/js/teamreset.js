function resetData() {
	var teamData = [];

	console.log("Retrieving all team data for season reset.");

	$.ajax({
        url: "/backliftapp/team",
        type: "GET",
        dataType: "JSON",
        success: function (data) {
        	console.log("Retrieved the following teams:");
        	for(var i = 0; i < data.length; i++) {
        		var team = {
        			teamName: data[i][teamName],
        			firstName: data[i][firstName],
        			lastName: data[i][lastName],
        			phone: data[i][phone],
        			sponsor: data[i][sponsor],
        			zip: data[i][zip],
        			wins: 0,
        			losses: 0,
        			percentage: 0
        		}
				console.log(team);
				teamData.push(team;
        	}

        }// end league success
    });// end GET

	console.log("Attempting to delete team data.");
	$.ajax({
        url: "/backliftapp/team",
        type: "DELETE",
        dataType: "JSON",
        success: function() {
        	console.log("Team data deleted.");
        }
    });

	console.log("Reposting retrieved team data with reset win/losses.");

	//Posting in for-loops is bad kids, but I'm too lazy to write this well
	var success = true;
	for(var i = 0; i < teamData.length; i++) {
		console.log("Posting:");
		console.log(teamData[i]);
		$.ajax({
	        url: "/backliftapp/team",
	        type: "POST",
	        dataType: "JSON",
	        data: teamData[i],
	        success: function (data) {
	        	console.log("Success.");
	        },
	        error: function() {
	        	console.log("Failure.")
	        	success = false;
	        }
	    }); // end POST
	}
	if(!success) {
		console.log("Failure occurred in data re-post.");
		console.log("Please verify the consistency of your data against the following dump:");
		for(var i = 0; i < teamData.length; i++) {
			console.log(teamData[i]);
		}
	}	
}