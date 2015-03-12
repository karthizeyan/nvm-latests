var client = new ZeroClipboard(document.getElementById("copy-button"));

client.on("ready", function(readyEvent) {
    // alert( "ZeroClipboard SWF is ready!" );

    client.on("aftercopy", function(event) {
        $("#copyMessage")
            .html("URL copied to your clipboard")
            .fadeIn(500)
            .delay(2000)
            .fadeOut(500);
        // `this` === `client`
        // `event.target` === the element that was clicked
        // event.target.style.display = "none";
        // alert("Copied text to clipboard: " + event.data["text/plain"]);
    });
});