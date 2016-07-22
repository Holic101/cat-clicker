var clickCounter = 0;
$(function () {
  console.log("test");

  $("img").click(function() {
    clickCounter++;
    $("#clicker").html(clickCounter);
  });
})
