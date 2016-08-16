public function unix_to_time(unix_timestamp){
	var date = new Date(unix_timestamp*1000);
	var hours = date.getHours();
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

	return formattedTime;
}