To see the progress of the app as we built it, click on the `commits` link above to inspect the code at each stage of development.

What's left to do if you clone this and work on it?
+ The event listener callback function is awfully big and busy. Break that code out into samller functions that the callback can reference
+ Is there a more elegant way to change the prices in the DOM?
+ It would be great if prices switched back to their original value if a different season is selected
+ We have one big, messy `js` file. Break it up into modules across a couple of new files. Each module should contain related functionality. For example, DOM manipulation, creation of our DOM object, and the XHR calls are three separate duties of out little app. Can you build modules for each of those responsibilities using iife syntax or by using block scope with let/const? Sure you can! 
