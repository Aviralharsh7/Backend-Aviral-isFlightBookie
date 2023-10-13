function compareTime( timeString1, timeString2){

    let currentDateTime = new Date();
    let dateTime1 = new Date(timeString1);    // new JS date object 
    let dateTime2 = new Date (timeString2);
    
    currentDateTime.setHours(currentDateTime.getHours() +24);
    
    // we check if arr, dep time are 24 hours ahead of current time
    if (
        dateTime1.getTime() >= currentDateTime.getTime() &&
        dateTime2.getTime() >= currentDateTime.getTime()
    ){  
        // check if arr time is ahead of dep time
        // getTime() returns the number of milliseconds since January 1, 1970 00:00:00.
        return dateTime1.getTime() > dateTime2.getTime(); 
    }
    return false;
}

module.exports = {
    compareTime
};


// Epoch times are measured in milliseconds. 
// The Unix epoch (or Unix time or POSIX time or Unix timestamp) 
// is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), 
// not counting leap seconds (in ISO 8601: 1970-01-01T00:00:00Z).
