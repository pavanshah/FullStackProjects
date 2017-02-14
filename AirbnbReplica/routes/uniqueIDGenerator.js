var returnUniqueID = function (){

	var uniqueID;
	var timeStamp = new Date();
	
	//9 digit unique id generated using 4 digits random number, 2 digits of second and 3 digits of millisecond
	//ensures uniqueness at every request
	uniqueID = Math.floor(Math.random()*9000) + 1000;
	uniqueID = uniqueID+padZeroForTime(timeStamp.getSeconds());
	uniqueID = uniqueID+padZeroForMilliseconds(timeStamp.getMilliseconds());
	
	console.log("Unique id :"+uniqueID);
	
	return uniqueID
}

function padZeroForTime(time) {

    return time < 10 ? '0' + time : '' + time;
}

function padZeroForMilliseconds(time) {

    return time < 100 ? '0' + time : '' + time;
}


exports.returnUniqueID = returnUniqueID;