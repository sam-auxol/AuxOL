window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

})

window.addEventListener('scroll', function() {
	// 获取页面垂直滚动距离
	var scrollDistance = window.scrollY || document.documentElement.scrollTop;

	// 获取要显示的 div
	var contentDiv = document.querySelector('.content-block');

	// 当滚动距离大于 600px 时显示 div
	if (scrollDistance > 600 && scrollDistance<900) {
		contentDiv.style.display = 'flex';
		contentDiv.style.blackgroundColor='rgba(237, 238, 237, 0.36)';
	}
	else if(scrollDistance >= 900){
		contentDiv.style.display = 'flex';
		contentDiv.style.blackgroundColor='rgba(237, 238, 237, 0.76)';

	}
	else {
		contentDiv.style.display = 'none';
	}
})



