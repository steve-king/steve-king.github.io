jQuery(document).ready(function($){

	//var windowWidth = $(window).width();

	_.extend(sk.config, {
		// Set config vars in here
		//prevWidth : windowWidth,
		//currentWidth : windowWidth,
	});

	sk.init();
});

sk.init = function(){

	sk.getDOMSelectors();

	sk.onResize();
	$(window).on('resize', _.debounce(function(){		
		sk.onResize();
	}, 200));

	sk.postsLayout();
};

sk.getDOMSelectors = function(){
	sk.dom = {};
	sk.dom.$window = $(window);
	sk.dom.$postsContainer = $('.posts-container');
};

sk.onResize = function(){
	sk.config.prevWidth = (sk.config.currentWidth != undefined) ? sk.config.currentWidth : sk.dom.$window.width();
	sk.config.prevHeight = (sk.config.currentHeight != undefined) ? sk.config.currentHeight : sk.dom.$window.height();

	sk.config.currentWidth  = sk.dom.$window.width();
	sk.config.currentHeight = sk.dom.$window.height();
	
	if( sk.packery !== undefined ){
		sk.packery.layout();
	}
};

sk.postsLayout = function(){
	sk.packery = new Packery(sk.dom.$postsContainer[0], {
		itemSelector: '.post',
		isResizeBound : false
	});
};


