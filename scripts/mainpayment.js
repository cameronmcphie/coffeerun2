(function(window) {
  "use strict";
  var FORM_SELECTOR = "[data-payment-info=\"form\"]";

  var App = window.App;

  var FormHandler = App.FormHandler;
  var formHandler = new FormHandler(FORM_SELECTOR);

  formHandler.addSubmitHandler(function(data) {
    var $ = window.jQuery;
    var title = data.title;
    var name = data.username;
    var $div = $("<div></div>", {
      "id": "text",
      "class": "modal"
    });
    var $p = $("<p></p>");

    var $a = $("<a></a>", {
      "href": "#",
      "rel": "modal:close"
    });

    var text = "Thank you for your payment, " + " " + title + " " + name;

    $p.append(text);
    $div.append($p);
    $div.append($a);

    $div.modal();
  });
  console.log(formHandler);
})(window);
