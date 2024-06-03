$(document).ready(function(){
	setTimeout(function(){
		$('.pgs, .pgs-nav, .pgs-footer').removeClass('pgs-active-panel');
		$('.pgs-btn').removeClass('pgs-btn-active');
	},1500);

	$('.pgs-btn').click(function(){
		$(this).toggleClass('pgs-btn-active');
		$('.pgs, .pgs-nav, .pgs-footer').toggleClass('pgs-active-panel');
	});

	$(".pgs-nav").mCustomScrollbar({
		theme:"dark-thick",
		scrollInertia: 400,
		advanced:{
			updateOnBrowserResize: true
			/*updateOnContentResize: true*/
		}
	});
});
