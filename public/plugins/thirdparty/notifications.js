// # Hackathon Notification Plugin
//
// Best to encapsulate your plugin in a closure, although not required.
function doSetTimeout(element) {
  setTimeout(function() {element.addClass("show");       }, 10);
};

function doSetTimeoutHide(element) {
    element.removeClass("show");
    setTimeout(function() { element.remove();       }, 500);

}

(function()
{

  freeboard.loadWidgetPlugin({
    "type_name"   : "hack_notifications_plugin",
    "display_name": "Hackathon Notifications",
    "description" : "Awesome notifications",
    "fill_size" : false,
    "settings"    : [
      {
        "name"        : "notifications",
        "display_name": "Data",
        "description"  : "Bind the widget to a data source.",
        "type"        : "calculated"
      },
    ],
    newInstance   : function(settings, newInstanceCallback)
    {
      newInstanceCallback(new myWidgetPlugin(settings));
    }
  });

    // ### Widget Implementation
    //
    // -------------------
    // Here we implement the actual widget plugin. We pass in the settings;
    var myWidgetPlugin = function(settings)
    {
        var self = this;
        var currentSettings = settings;

        var notificationIds = [];

        // Here we create an element to hold the text we're going to display. We're going to set the value displayed in it below.
        var myTextElement = $("<ul class='fade' id='notificationContainer'></ul>");

        // **render(containerElement)** (required) : A public function we must implement that will be called when freeboard wants us to render the contents of our widget. The container element is the DIV that will surround the widget.
        self.render = function(containerElement)
        {
            // Here we append our text element to the widget container element.
            $(containerElement).append(myTextElement);
        }

        // **getHeight()** (required) : A public function we must implement that will be called when freeboard wants to know how big we expect to be when we render, and returns a height. This function will be called any time a user updates their settings (including the first time they create the widget).
        //
        // Note here that the height is not in pixels, but in blocks. A block in freeboard is currently defined as a rectangle that is fixed at 300 pixels wide and around 45 pixels multiplied by the value you return here.
        //
        // Blocks of different sizes may be supported in the future.
        self.getHeight = function()
        {
            return 2;
        }

        // **onSettingsChanged(newSettings)** (required) : A public function we must implement that will be called when a user makes a change to the settings.
        self.onSettingsChanged = function(newSettings)
        {
            // Normally we'd update our text element with the value we defined in the user settings above (the_text), but there is a special case for settings that are of type **"calculated"** -- see below.
            currentSettings = newSettings;
        }

        // **onCalculatedValueChanged(settingName, newValue)** (required) : A public function we must implement that will be called when a calculated value changes. Since calculated values can change at any time (like when a datasource is updated) we handle them in a special callback function here.
        self.onCalculatedValueChanged = function(settingName, newValue)
        {
            console.log(newValue);
            // Remember we defined "the_text" up above in our settings.
            if(settingName == "notifications")
            {
                for(var ele of newValue){
                    var text = "id:" + ele.id +" -> val:" +ele.number;

                    if (notificationIds.indexOf(ele.id) > -1){
                        console.log("id already in list - updating");
                        $("#id"+ele.id).find("span").text(text);
                    }else{
                        notificationIds.push(ele.id)
                        var newElement = $("<li class='notification'><div><i class='fa "+ ele.icon +" fa-4x'></i></div><span></span></li>");
                        newElement.attr("id", "id"+ele.id);
                        console.log("add new value with id" + ele.id);
                        newElement.find("span").text(text);
                        $(myTextElement).append(newElement);
                        doSetTimeout(newElement);
                        
                    }    
                }
                
                //check if all ids are still in collection
                for(var i=0; i < notificationIds.length; i++){
                    var found = false;
                    var id = notificationIds[i];

                    for(var ele of newValue){
                        if(ele.id === id){
                            found = true;
                            break;
                        }
                    }

                    if(!found){
                        console.log("removed notification with id " + id);
                        notificationIds.splice(i ,1);
                        i--;
                        var element = $("#id" + id); 
                        doSetTimeoutHide(element);
                    }

                }


                // Here we do the actual update of the value that's displayed in on the screen.
                
            }
        }

        // **onDispose()** (required) : Same as with datasource plugins.
        self.onDispose = function()
        {
        }
    }
}());