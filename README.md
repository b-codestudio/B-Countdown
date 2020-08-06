# B-Countdown

This is very simple jQuery / Javascript timer plugin that you can easily add to your project even with basic knowledge of Javascript coding.

### Compatibility
B-Countdown is fully functional with all modern browser, and old browser such as IE9 and Opera 10.5

### How to use
Using B-Countdown is really easy. After downloading files, copy **jquery.BCountdown.js** and **jquery.BCountdown.css**, and paste Jquery.BCountdown.js 
to your js folder and jquery.BCountdown.css to your css folder.

Now open your root file such as index.html and paste these two lines next to your other `<link/>` and `<script></script>`:

```
 // Your other links
  <link rel="stylesheet" href="your css folder path/jquery.BCountdown.css" type="text/css" />.
  
  // Your other scripts
  <script src="your js folder path/jquery.BCountdown.js"></script>
```
After adding these two lines of code to your `<head></head>`, it's time to add HTML structure to your body section.

### HTML Structure
Just add a simple HTML tag like `<div>` tag to your project wherever you want to use this plugin, like below:

```
<body>
    // Your other tags
    
    <div id="BCountdown"></div>
    
    // Your other tags
</body>
```
**Notice:** You can use any type of tag which has block display.

### Initialization
Initilize the plugin like other jQuery plugins, like below:

```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    // Option goes here
  });			
});
```
**Notice:** Make sure, id on you HTML tag is the same as your jQuery id.

### Options
- `date:` (Default: null) date format is exactly the same as Javascript date format. Like below:
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
  
    // Month day year  hour:minute:second
    date: 'august 26 2021 13:40:32'
    
  });			
});
```

- `GMT:` (Default: 0) You can have positive and negative floating numbers.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4.5
  });			
});
```

- `width:` (Default:100%) You can have both pixel (px) width and percentage (%) size. B-Countdown automatically adjust the height based on your width.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px'		
  });			
});
```

- `outterBG:` (Default: Transparent) OutterBG or outter background is the outter part of background or the frame around the timer. You can have solid or gradient background.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9'
  });			
});
```

- `innerBG:` (Default: Transparent) InnerBG or inner background is the background of timer numbers and title. You can have solid or gradient background.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E'
  });			
});
```

` `timeColor:` (Default: #000000) TimeColor or time color is the color of timer numbers. You can have all types of css color codes.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E',
    timeColor : "#f5f5f5"
  });			
});
```

- `titleColor:` (Default: #000000) TitleColor or title color is the color of titles. You can have all types of css color codes.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E',
    timeColor : "#f5f5f5",
    titleColor : "#f5f5f5"
  });			
});
```

- `effectType:` (Default: slideDown) You have 5 different options for effect type. List of effects:
  - flash
  - fadeInOut
  - slideRight
  - noAnimation
  - slideDown

```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E',
    timeColor : "#f5f5f5",
    titleColor : "#f5f5f5",
    effectType : "slideRight"
  });			
});
```

- `titleOn:` (Default: true) With titleOn you can hide or visible the titles. If you set false then titles would be hidden.
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E',
    timeColor : "#f5f5f5",
    titleColor : "#f5f5f5",
    effectType : "slideRight",
    titleOn : true
  });			
});
```

- `layout:` (Default: circle) Easily match the timer with your design based on square or circle design. List of layouts:
  - square
  - circle

```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E',
    timeColor : "#f5f5f5",
    titleColor : "#f5f5f5",
    effectType : "slideRight",
    titleOn : true,
    layout : 'square'
  });			
});
```

- `layoutDirection:` (Default: horizontal) Fit the timer into your design based direction. List of layout directions:
  - vertical
  - horizontal
  
```
$(document).ready(function() {
  $("#BCountdown").BCountdown({
    date: 'august 26 2021 13:40:32',
    GMT: -4,
    width:'600px',
    outterBG : '#e9e9e9',
    innerBG : '#34495E',
    timeColor : "#f5f5f5",
    titleColor : "#f5f5f5",
    effectType : "slideRight",
    titleOn : true,
    layout : 'square',
    layoutDirection : 'vertical'
  });			
});
```
### Reporting issues
If you have any issues or any code improvement, please feel free to share it with me.
