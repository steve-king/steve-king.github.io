jQuery(document).ready(function($){

	// Set config values
	// Extension of the config stuff defined in footer.html
	_.extend(sk.config, {
		columnWidth : 400
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

	sk.mailTo();
	sk.scrollLinks();

	if( Modernizr.touch ){
		FastClick.attach(document.body);
	}
};

// Grab all the jQuery DOM selectors we'll need
sk.getDOMSelectors = function(){
	sk.dom = {};
	sk.dom.$window = $(window);
	sk.dom.$postsContainer = $('.posts-container');
	sk.dom.$mailTo = $('.mailto');
	sk.dom.$scrollLink = $('.scroll-link');
};

// Resize event handler
sk.onResize = function(){

	// Save the previous width and height (do we need these?)
	//sk.config.prevWidth = (sk.config.currentWidth !== undefined) ? sk.config.currentWidth : sk.dom.$window.width();
	//sk.config.prevHeight = (sk.config.currentHeight !== undefined) ? sk.config.currentHeight : sk.dom.$window.height();

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

	// Init packery when there is room for more than one column
	if( sk.packery === undefined && numColumns > 1){
		sk.initPackery();
	}
};

sk.initPackery = function(){
	// Initialise packery and it's options
	sk.packery = new Packery(sk.dom.$postsContainer[0], {
		itemSelector: '.post',
		isResizeBound : false // We define our own resize function so we will call packery.layout() from there instead
	});
};


// Simple mailto link obfuscation
// Grab the separate user and domain strings from the data attrs
// build the string and insert into href on mouseover
// Means user can right click and copy the email address straight away (a click event wouldn't work for that)
// Fallback to standard click event on touch devices (no mouseover)
sk.mailTo = function(){

	var theEvent = '';

	if( Modernizr.touch ){
		theEvent = 'touchstart';
	} else {
		theEvent = 'mouseover';
	}
	
	sk.dom.$mailTo.on(theEvent, function(e){

		var $target = $(this);

		if( !$target.data('email_revealed') ){
			
			var user = $target.data('u'),
				domain = $target.data('d'),
				email = user+'@'+domain;

			$target.attr('href', 'mailto:'+email);
			$target.attr('title', email);
			$target.data('email_revealed', 1);
		}
	});
}

// Animated scroll to the id stored in the link's href
// Hides the hash in the address bar. Do we want that?
sk.scrollLinks = function(){

	sk.dom.$scrollLink.on('click', function(e){
		
		var $target = $(this),
			href = $target.attr('href');

		$('html, body').animate({ scrollTop: $(href).offset().top }, 500);

		return false;
	});
}


