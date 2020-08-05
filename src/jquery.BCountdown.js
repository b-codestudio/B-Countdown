/* 
	B-Countdown is fully Customizable
	Javascript/jQuery plugin
	
	Version 1.0.1
*/
(function($, window, document, undefined){
	$.fn.BCountdown = function(options){
						
		// Initialize default variables 
		var settings = $.extend({}, $.fn.BCountdown.defaults, options);							
			
		return this.each(function(){
			var $this = $(this),
				divElem = "div",
				divider,
				timeBackground,
				timeSmallBG,
				timeHolder,
				newTimeElem,
				oldTimeElem,
				title,
				newDays,
				newHours,
				newMinutes,
				newSeconds,
				oldDays,
				oldHours,
				oldMinutes,
				oldSeconds,
				timer,						
				firstRun = false,
				millisecToSec = 1000,
				widthSize = 0,
				layoutClass = [],				
				
				
				//================== Creating elements and adjust styles ==================//				
				// Check size of timer
				checkSizeType = function(){						
					var allSet;
					
					if(isNaN(parseInt(settings.width))){
						allSet = false;							
					}
					else {	
						allSet = true;
																
						if(settings.width.includes("%")){						
							widthSize = ($this.outerWidth() * parseInt(settings.width)) / 100;
						}
						else {
							widthSize = parseInt(settings.width);							
						}
					}
					
					return	allSet;													
				},
				
				// Adjusting the object style
				adjustDirection = function(direction){				
					if(direction === 'vertical'){
						$this.css({
							width: widthSize / 4,
							height:	widthSize,
							position: "relative"
						});						
					}
					else {
						$this.css({
								width: widthSize,
								height:	widthSize / 4,
								position: "relative"
						});						
					}
				},
				
				// Title visibiliy
				titleVisibility = function(){
					var visibility;
					if(settings.titleOn){
						visibility = "block";	
					}
					else {
						visibility = "none";		
					}
					
					return visibility;
				},
				
				// Set sizes based on layout
				setSize = function(){
					var sizes = [];
					
					if(settings.layoutDirection === 'vertical'){
						adjustDirection("vertical");
						sizes = [100, 25];
					}
					else {
						adjustDirection("horizontal");
						sizes = [25, 100];
					}
					return sizes;
				},
				
				// Check countdown layout
				checkLayout = function(){														
					if(settings.layout === 'square'){						
						layoutClass = ['BCountdown-divider', 'BCountdown-square-timeBG', 'BCountdown-square-timeSmallBG']
					}								
					else {						
						layoutClass = ['BCountdown-divider', 'BCountdown-square-timeBG BCountdown-circle-border',
										'BCountdown-square-timeSmallBG BCountdown-circle-border'];
					}					
				},
				
				// Create template
				createTemp = function(index){
					divider = $("<" + divElem + "/>").css({width:setSize()[0] + '%',height:setSize()[1] + '%'}).addClass(layoutClass[0]).appendTo($this);
					
					timeBackground = $("<" + divElem + "/>").css({background:settings.outterBG})
															.addClass(layoutClass[1]).appendTo(divider);
															
					timeSmallBG = $("<" + divElem + "/>").css({background:settings.innerBG, 
								   webkitBoxShadow:"0px " + widthSize * 0.0056 + "px " + widthSize * 0.0056 + "px 0px rgba(0, 0, 0, 0.8), 0px "
								             + widthSize * 0.016 + "px " + widthSize * 0.016 + "px 0px rgba(0, 0, 0, 0.7)",
								   mozBoxShadow:"0px " + widthSize * 0.0056 + "px " + widthSize * 0.0056 + "px 0px rgba(0, 0, 0, 0.8), 0px "
								             + widthSize * 0.016 + "px " + widthSize * 0.016 + "px 0px rgba(0, 0, 0, 0.7)",
								   boxShadow:"0px " + widthSize * 0.0056 + "px " + widthSize * 0.0056 + "px 0px rgba(0, 0, 0, 0.8), 0px "
								             + widthSize * 0.016 + "px " + widthSize * 0.016 + "px 0px rgba(0, 0, 0, 0.7)"})
													 	.addClass(layoutClass[2]).appendTo(timeBackground);
														
					timeHolder = $("<" + divElem + "/>").css({color:settings.timeColor, fontSize:widthSize * 0.08125 + "px",
															lineHeight:widthSize * 0.2018 + "px"})
													.addClass("BCountdown-timeHolder").appendTo(timeSmallBG);
					
					newTimeElem = $("<" + divElem + "/>").attr({id:settings.newTimeID[index]}).addClass("BCountdown-newTimeNumber").appendTo(timeHolder);
				
					oldTimeElem = $("<" + divElem + "/>").attr({id:settings.oldTimeID[index]}).addClass("BCountdown-oldTimeNumber").appendTo(timeHolder);
																					
					title = $("<" + divElem + "/>").text(settings.titles[index]).css({color:settings.titleColor, 
																						fontSize:widthSize * 0.0225 + "px", 
																						lineHeight:widthSize * 0.0225 + "px",
																						letterSpacing:widthSize * 0.0025 + "px", 
																						display: titleVisibility()})
																			.addClass("BCountdown-titles").appendTo(timeSmallBG);
				},
				
				//================== Time calculation ==================//
				// Subtract timezone from local time
				subtractTimeZone = function(localTime){
					var currentDate = new Date(),
					subtratedTime = localTime - (-(currentDate.getTimezoneOffset() * 60 * 1000));
					return subtratedTime;
				},
			
				// Check the current date in milliseconds
				checkCurrentTime = function(){
					var currentDate = new Date(),
					currentDateInMilliseconds = currentDate.getTime();
					currentDateInMilliseconds = subtractTimeZone(currentDateInMilliseconds) + (settings.GMT * 3600000);
					currentDateInMilliseconds = parseInt(currentDateInMilliseconds / millisecToSec,10);								
					return currentDateInMilliseconds;
				},
			
				// Subtract user's adjusted date of current time 
				generateRemainedTime = function(){
					var userDateTime = new Date(settings.date).getTime();			
					userDateTime = parseInt(userDateTime / millisecToSec,10);			
					var remainedTimeInSeconds = userDateTime - checkCurrentTime();			
					return remainedTimeInSeconds;				
				},
					
				// Add to zero to numbers
				addZero = function(number){
					var timeNum;
					
					if(number >= 0 && number < 10){
						timeNum = "0" + number;
					}
					else {
						timeNum = number;	
					}
					
					return timeNum;
				}, 
							
				// Sivide remained time and assign them into array
				divideRemainedTime = function(){
					// Remained time in seconds
					var difference = generateRemainedTime(),
		
					// Extract total time to days , hours , minutes , seconds
					extractTime = function(timeInSeconds){
						var amount,			
						amount = parseInt(difference / timeInSeconds,10);
						difference -= (amount * timeInSeconds);			
						return amount;	
					},
		
					// Extracted days , hours , minutes , seconds
					days = extractTime(86400),
					hours = extractTime(3600),
					minutes = extractTime(60),
					seconds = extractTime(1),
															
		
					// Array of extracted time										
					dividedTime = [days, hours, minutes, seconds];								
								
					// Stop counting and reset the time numbers											
					if(days <= 0 && hours <= 0 && minutes <= 0 && seconds < 0){
						dividedTime = [0,0,0,0];			
						clearInterval(timer);					
					}			
					else if(isNaN(days) && isNaN(hours) && isNaN(minutes) && isNaN(seconds)){
						dividedTime = [0,0,0,0];			
						clearInterval(timer);				
					}
					return dividedTime;																				
				},
				
				
				//================== Animations ==================//
				// Elements effects
				animate = function(effectType, oldElement, newElement, newTime){
									
					if(effectType === 'flash'){
						flash(oldElement, newElement, newTime);	
					}
					else if(effectType === 'fadeInOut'){
						fadeInOut(oldElement, newElement, newTime);	
					}
					else if(effectType === 'slideRight'){
						slideRight(oldElement, newElement, newTime);	
					}
					else if(effectType === 'noAnimation'){
						oldElement.text(newTime);	
					}
					else {
						slideDown(oldElement, newElement, newTime);
					}
				},
				
				// Slide down effect
				slideDown = function(oldElement, newElement, newTime){
									
					oldElement.animate({top:"100%",opacity:0}, 300);												
					newElement.css({top:"-100%"});
					newElement.animate({top:"0%",opacity:1}, 400, function(){
						oldElement.css({top:"0%",opacity:1}).text(newTime);
						newElement.css({top:"-100%", opacity:0});	
					});																
				},
				
				// Slide left effect
				slideRight = function(oldElement, newElement, newTime){
					
					oldElement.animate({left:"100%",opacity:0}, 300);												
					newElement.css({left:"-100%"});
					newElement.animate({left:"0%",opacity:1}, 400, function(){
						oldElement.css({left:"0%",opacity:1}).text(newTime);
						newElement.css({left:"-100%", opacity:0});	
					});	
				},
			
				// Flashing effect 
				flash = function(oldElement, newElement, newTime){
					
					oldElement.animate({opacity:0}, 100); 
					newElement.animate({opacity:1}, 500, function(){
						oldElement.css({opacity:1}).text(newTime);
						newElement.css({opacity:0});
					});				
				},
				
				// Fade-In-Out effect
				fadeInOut = function(oldElement, newElement, newTime){
					
					newElement.animate({opacity:1}, 100); 
					oldElement.animate({opacity:0}, 500, function(){
						oldElement.css({opacity:1}).text(newTime);
						newElement.css({opacity:0});
					});
				},
									
										
				//================== Generate the template ==================// 
				// Add time to elements
				addTimeToElems = function (){

					if(!firstRun){										
																																					
						// Day time
						newDays = divideRemainedTime()[0];
						$this.find("#" + settings.oldTimeID[0] + "").text(addZero(newDays));
						oldDays = newDays;
						
						// Hour time
						newHours = divideRemainedTime()[1];
						$this.find("#" + settings.oldTimeID[1] + "").text(addZero(newHours));
						oldHours = newHours;
						
						// Minute time
						newMinutes = divideRemainedTime()[2];
						$this.find("#" + settings.oldTimeID[2] + "").text(addZero(newMinutes));
						oldMinutes = newMinutes;
						
						// Second time
						newSeconds = divideRemainedTime()[3];
						$this.find("#" + settings.oldTimeID[3] + "").text(addZero(newSeconds));
						oldSeconds = newSeconds;
						
						firstRun = true;
					}
									
					
					// Check and run animation for second
					if(oldSeconds === newSeconds && firstRun === true){					
						newSeconds = divideRemainedTime()[3];						
						$this.find("#" + settings.newTimeID[3] + "").text(addZero(newSeconds));											
					}
					if(oldSeconds !== newSeconds){
						animate(settings.effectType, $this.find("#" + settings.oldTimeID[3] + ""), $this.find("#" + settings.newTimeID[3] + ""), addZero(newSeconds));
						oldSeconds = newSeconds;
					}
					
					// Check and run animation for minute
					if(oldMinutes === newMinutes && firstRun === true){					
						newMinutes = divideRemainedTime()[2];						
						$this.find("#" + settings.newTimeID[2] + "").text(addZero(newMinutes));											
					}
					if(oldMinutes !== newMinutes){
						animate(settings.effectType, $this.find("#" + settings.oldTimeID[2] + ""), $this.find("#" + settings.newTimeID[2] + ""), addZero(newMinutes));
						oldMinutes = newMinutes;
					}
					
					// Check and run animation for hour
					if(oldHours === newHours && firstRun === true){					
						newHours = divideRemainedTime()[1];						
						$this.find("#" + settings.newTimeID[1] + "").text(addZero(newHours));											
					}
					if(oldHours !== newHours){
						animate(settings.effectType, $this.find("#" + settings.oldTimeID[1] + ""), $this.find("#" + settings.newTimeID[1] + ""), addZero(newHours));
						oldHours = newHours;
					}
					
					// Check and run animation for day
					if(oldDays === newDays && firstRun === true){					
						newDays = divideRemainedTime()[0];						
						$this.find("#" + settings.newTimeID[0] + "").text(addZero(newDays));											
					}
					if(oldDays !== newDays){
						animate(settings.effectType, $this.find("#" + settings.oldTimeID[0] + ""), $this.find("#" + settings.newTimeID[0] + ""), addZero(newDays));
						oldDays = newDays;
					}												
				}				
				
				
				// generate temp
				if(checkSizeType()){
					checkLayout();
																	
					for(var i = 0; i < 4; i++){
						createTemp(i);						
					}
					
					// Run the countdown
					timer = setInterval(addTimeToElems, 1000);
				}
		});	
	};
	$.fn.BCountdown.defaults = {
		width: '100%',
		
		titles: ["DAYS","HOURS","MINUTES","SECONDS"],
				
		newTimeID : ["newDays", "newHours", "newMinutes", "newSeconds"],
		oldTimeID : ["oldDays", "oldHours", "oldMinutes", "oldSeconds"],
		
		outterBG : "transparent",
		innerBG : "transparent",
		timeColor : "#000000",
		titleColor : "#000000",
		
		effectType : "slideDown",
		
		titleOn : true,
		layout : 'circle',
		layoutDirection : 'horizontal',
		
		date : null,
		GMT : 0	
	};	
}(jQuery, window, document));
