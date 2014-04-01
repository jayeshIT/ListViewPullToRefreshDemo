var pageid1 = 0;
var endlimit1 = 5;

var req_header = [];
req_header.push({
	title : "Content-Type",
	value : "application/x-www-form-urlencoded"
});

Alloy.Globals.forSaleFunction = function() {
	var dataitems = [];
	for (var i = 0; i < 5; i++) {
		var items = {
			properties : {
			},
			template : "item_template",
			view : {
				backgrounColor : 'transparent'
			},
			imagePic_default : {
				defaultImage : '/default/thumbnail-fotos.png'
			},
			imagePic : {
				image : "/appicon.png",
			},
			description_label : {
				text : 'Before Pull to refresh'
			},
			price_label : {
				text : 100
			},
			date_label : {
				text : '20-jan-2013' + i
			}
		};
		dataitems.push(items);
	};
	$.listview_section.setItems(dataitems);
};
Alloy.Globals.forSaleFunction(pageid1, endlimit1);
Alloy.Globals.reload = function() {
	var dataitems = [];
	for (var i = 0; i < 5; i++) {
		var items = {
			properties : {
			},
			template : "item_template",
			view : {
				backgrounColor : 'transparent'
			},
			imagePic_default : {
				defaultImage : '/default/thumbnail-fotos.png'
			},
			imagePic : {
				image : "/appicon.png",
			},
			description_label : {
				text : 'After Pull to refresh'
			},
			price_label : {
				text : 100
			},
			date_label : {
				text : '11-jan-2013' + " " + i
			}
		};
		dataitems.push(items);
	};
	$.listview_section.appendItems(dataitems);

};
function getFormattedDate() {
	var date = new Date();
	return date.getMonth() + '/' + date.getDate() + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();
}

function resetPullHeader() {
	$.pulltorefresh.actInd.hide();
	$.pulltorefresh.imageArrow.transform = Ti.UI.create2DMatrix();
	$.pulltorefresh.imageArrow.show();
	$.pulltorefresh.labelStatus.text = 'Pull down to refresh...';
	$.pulltorefresh.labelLastUpdated.text = 'Last Updated: ' + getFormattedDate();
	$.classified_list_view.setContentInsets({
		top : 0
	}, {
		animated : true
	});
	Alloy.Globals.reload();
}

function pullListener(e) {
	if (e.active == false) {
		var unrotate = Ti.UI.create2DMatrix();
		$.pulltorefresh.imageArrow.animate({
			transform : unrotate,
			duration : 180
		});
		$.pulltorefresh.labelStatus.text = 'Pull down to refresh...';
	} else {
		var rotate = Ti.UI.create2DMatrix().rotate(180);
		$.pulltorefresh.imageArrow.animate({
			transform : rotate,
			duration : 180
		});
		$.pulltorefresh.labelStatus.text = 'Release to get Vegetables...';
	}
}

function pullendListener(e) {
	$.pulltorefresh.labelStatus.text = 'Loading Vegetables...';
	$.pulltorefresh.imageArrow.hide();
	$.pulltorefresh.actInd.show();
	$.classified_list_view.setContentInsets({
		top : 80
	}, {
		animated : true
	});
	setTimeout(function() {
		resetPullHeader();
	}, 2000);
}

$.classified_list_view.addEventListener('pull', pullListener);
$.classified_list_view.addEventListener('pullend', pullendListener);

