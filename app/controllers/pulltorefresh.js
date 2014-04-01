var args = arguments[0] || {};
function getFormattedDate() {
	var date = new Date();
	return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
}

$.labelLastUpdated.text = 'Last Updated: ' + getFormattedDate();
