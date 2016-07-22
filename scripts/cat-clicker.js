$(function () {
  var clickCounter = 0;
  $("img").on("click", function() {
    clickCounter++;
    $("#clicker").html = clickCounter;
  })
})
