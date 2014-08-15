// Accordion Panel

$(function() {
	$("#accordion").accordion();
});

$("#toggle-CBN").on("click", function() {
			var self = $(this); 
			if (self.hasClass("active_CBN")) {
				//$(".new").css({
				//	"visibility": "hidden"
				//});
				$(".CurrentBN").animate({
					opacity: 1
				}, 500);
				$("#toggle-CBN").css({
					"color": "orange"
				});
				self.removeClass("active_CBN");
			} else {
				//$(".new").css({
				//	"visibility": "visible"
				//});
				$(".CurrentBN").animate({
					opacity: 0
				}, 500);
				$("#toggle-CBN").css({
					"color": "#404040"
				});
				self.addClass("active_CBN");
			}
			return false;
});
 
// Toggle New Bike Network 

$("#toggle-NBN").on("click", function() {
			var self = $(this); 
			if (self.hasClass("active_NBN")) {
				//$(".new").css({
				//	"visibility": "hidden"
				//});
				$(".New").animate({
					opacity: 0
				}, 350);
				$("#toggle-NBN").css({
					"color": "#404040"
				});
				self.removeClass("active_NBN");
			} else {
				//$(".new").css({
				//	"visibility": "visible"
				//});
				$(".New").animate({
					opacity: 1
				}, 350);
				$("#toggle-NBN").css({
					"color": "orange"
				});
				self.addClass("active_NBN");
			}
			return false;
});


// Toggle Upgrade Bike Network 

$("#toggle-UBN").on("click", function() {
			var self = $(this); 
			if (self.hasClass("active_UBN")) {
				//$(".upGrade").css({
				//	"visibility": "hidden"
				//});
				$(".Upgrade").animate({
					opacity: 0
				}, 350);
				$("#toggle-UBN").css({
					"color": "#404040"
				});
				self.removeClass("active_UBN");
			} else {
				//$(".upGrade").css({
				//	"visibility": "visible"
				//});
				$(".Upgrade").animate({
					opacity: 1
				}, 350);
				$("#toggle-UBN").css({
					"color": "orange"
				});
				self.addClass("active_UBN");
			}
			return false;
});








		
