jQuery(document).ready(function($){

	// Set config values
	// Extension of the config stuff defined in footer.html
	_.extend(sk.config, {
		columnWidth : 280
	});

	sk.init();
});

sk.init = function(){

	sk.getDOMSelectors();

	// Resize event listener
	sk.onResize();
	sk.dom.$window.on('resize load', _.debounce(function(){		
		sk.onResize();
	}, 200));

	sk.postsLayout();
};

// Grab all the jQuery DOM selectors we'll need
sk.getDOMSelectors = function(){
	sk.dom = {};
	sk.dom.$window = $(window);
	sk.dom.$postsContainer = $('.posts-container');
};

// Resize event handler
sk.onResize = function(){

	// Save the previous width and height (do we need these?)
	sk.config.prevWidth = (sk.config.currentWidth !== undefined) ? sk.config.currentWidth : sk.dom.$window.width();
	sk.config.prevHeight = (sk.config.currentHeight !== undefined) ? sk.config.currentHeight : sk.dom.$window.height();

	// Save current width and height
	sk.config.currentWidth  = sk.dom.$window.width();
	sk.config.currentHeight = sk.dom.$window.height();

	// Set class on postcontainer for number of columns.
	var postsContainerWidth = sk.dom.$postsContainer.width(),
		numColumns = Math.floor(postsContainerWidth / sk.config.columnWidth);

	// 1 column minimum, 6 columns maximum 
	if( numColumns < 1){ numColumns = 1; }
	if( numColumns > 6){ numColumns = 6; }

	// add/remove col number classes
	sk.dom.$postsContainer.removeClass('_1col _2col _3col _4col _5col _6col');
	sk.dom.$postsContainer.addClass('_'+numColumns+'col');
	
	// Layout the packery items again
	if( sk.packery !== undefined ){
		sk.packery.layout();
	}
};

sk.postsLayout = function(){
	// Initialise packery and it's options
	sk.packery = new Packery(sk.dom.$postsContainer[0], {
		itemSelector: '.post',
		isResizeBound : false // We define our own resize function so we will call packery.layout() from there instead
	});
};


