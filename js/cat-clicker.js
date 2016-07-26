//Model
  var model = {
    currentCat: null,
    adminView: false,
    cats : [
          {
            name: "Cutie Pie",
            clicks: 0,
            path: "img/cute_cat0.jpg"
          },
          {
            name: "Little Beaver",
            clicks: 0,
            path: "img/cute_cat1.jpg"
          },
          {
            name: "Kitty",
            clicks: 0,
            path: "img/cute_cat2.jpg"
          },
          {
            name: "Mautzi",
            clicks: 0,
            path: "img/cute_cat3.jpg"
          },
          {
            name: "Schnurri",
            clicks: 0,
            path: "img/cute_cat4.jpg"
          }
  ]
  };

//Controller
  var controller = {

    init: function() {
      //set the current cat to the first cat in the list
      model.currentCat = model.cats[0];
      //initialize the views
      viewButtons.init();
      viewCats.init();
      adminView.init();
    },

    countClicks: function() {
      model.currentCat.clicks++;
      viewCats.render();
    },

    displayCurrentCat: function() {
      //tells the Cat View to change the picture, the name and the click number
      return model.currentCat;
    },

    getCats: function() {
      return model.cats;
    },

    setCurrentCat: function(cat) {
      model.currentCat = cat;
    },

    toggleAdminView: function() {
      if(model.adminView === false) {
        model.adminView = true;
        adminView.render();
      }
      else {
        model.adminView = false;
        adminView.hide();
      }
    },

    updateCats: function(name, path, clicks) {
      if(name) {
        model.currentCat.name = name;
      }
      if(path) {
        model.currentCat.path = path;
      }
      if(clicks) {
        model.currentCat.clicks = clicks;
      }
    }

  };
  // Button View
  var viewButtons = {
    init: function() {
      this.catList = document.getElementById("cat-list");
      this.render();
    },

    render: function() {
      var cats = controller.getCats(),
          cat, i;

      for(i = 0; i<cats.length; i++) {
        cat = cats[i];
        this.listElement = document.createElement("li");
        this.listElement.textContent = cats[i].name;
        //Attach an event listener to each cat name
        this.listElement.addEventListener("click", (function(catCopy) {
                return function() {
                  controller.setCurrentCat(catCopy);
                  viewCats.render();
                };
        })(cat));

        this.catList.appendChild(this.listElement);
      }
    }
  };
// Cat picture and counter view
  var viewCats = {

    init: function() {
      //put the DOM elements into handy pointers for reference
      this.catWrapper = document.getElementById("cat-wrapper");
      this.catName = document.getElementById("cat-name");
      this.catCount = document.getElementById("cat-count");
      this.catImg = document.getElementById("cat-img");
      this.catImg.addEventListener("click", function() {
        controller.countClicks();
      });

      this.render();
    },

    render: function() {
      var currentCat = controller.displayCurrentCat();
      this.catName.textContent = currentCat.name;
      this.catCount.textContent = currentCat.clicks;
      this.catImg.src = currentCat.path;
    },

    clickHandler: function(catId) {
      controller.countClicks(catId);
    }
  };
// Admin view
  var adminView = {
    init: function() {
      //initialize the admin view controls
      this.adminButton = document.getElementById("toggleAdminView");
      this.adminArea = document.getElementById("admin-area");
      this.adminButton.addEventListener("click", function() {
        controller.toggleAdminView();
      });
      //initialize the input controls
      this.nameInput = document.getElementById("name");
      this.pathInput = document.getElementById("path");
      this.clicksInput = document.getElementById("clicks");
      this.submitButton = document.getElementById("submit");
      this.cancelButton = document.getElementById("cancel");
      
      //assign click events to buttons
      this.submitButton.addEventListener("click", function() {
        controller.updateCats(this.nameInput.value, this.pathInput.value, this.clicksInput.value);

        viewCats.render();
      });
      this.cancelButton.addEventListener("click", function() {
        this.render();
      });
    },

    render: function() {
      this.nameInput.value = "";
      this.pathInput.value = "";
      this.clicksInput.value = "";
      this.adminArea.style.display = "block";
    },

    hide: function() {
      this.adminArea.style.display = "none";
    }
  };

controller.init();
