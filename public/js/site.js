var client = new ZeroClipboard($(".copy-button"));

client.on("ready", function(readyEvent) {
    client.on("aftercopy", function(event) {
        $("#copyMessage")
            .html("Copied to clipboard...")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
        // `this` === `client`
        // `event.target` === the element that was clicked
        // event.target.style.display = "none";
        // alert("Copied text to clipboard: " + event.data["text/plain"]);
    });
});