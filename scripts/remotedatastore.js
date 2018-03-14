(function(window) {
  "use strict";
  var App = window.App || {};
  var $ = window.jQuery;

  function RemoteDataStore(url) {
    if (!url) {
      throw new Error("No remote URL supplied.");
    }
    this.serverUrl = url;
  }

  // For the herokuapp api
  // RemoteDataStore.prototype.add = function (key, val) {
  //   $.post(this.serverUrl, val, function (serverResponse) {
  //     console.log(serverResponse);
  //   });
  // };

  RemoteDataStore.prototype.add = function(key, val) {
    $.ajax(this.serverUrl, {
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify(val),
      success: function(serverResponse) {
        // Do something
        console.log(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  // For the herokuapp api
  // RemoteDataStore.prototype.getAll = function (cb) {
  //   $.get(this.serverUrl, function (serverResponse) {
  //     console.log(serverResponse);
  //     cb(serverResponse);
  //   });
  // };
  RemoteDataStore.prototype.getAll = function(cb) {
    $.ajax(this.serverUrl, {
      type: "GET",
      success: function(serverResponse) {
        // Do something
        console.log(serverResponse);
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  // For the herokuapp api
  // RemoteDataStore.prototype.get = function (key, cb) {
  //   $.get(this.serverUrl + "/" + key, function (serverResponse) {
  //     console.log(serverResponse);
  //     cb(serverResponse);
  //   });
  // };

  RemoteDataStore.prototype.get = function(key, cb) {
    $.ajax(this.serverUrl + "?emailAddress=" + key, {
      type: "GET",
      success: function(serverResponse) {
        cb(serverResponse);
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  // For the herokuapp api
  // RemoteDataStore.prototype.remove = function (key) {
  //   $.ajax(this.serverUrl + "/" + key, {
  //     type: "DELETE"
  //   });
  // };

  RemoteDataStore.prototype.remove = function(key) {
    var url = this.serverUrl;
    $.ajax(url + "?emailAddress=" + key, {
      type: "GET",
      success: function(key) {
        $.ajax({
          type: "POST",
          url: url + "/" + key[0].id + "?_method=DELETE",
          data: {
            _method: "DELETE"
          },
          success: function(serverResponse) {
            // Object was deleted. response body empty.
            console.log(serverResponse);
          },
          error: function(xhr) {
            alert(xhr.responseText);
          }
        });
      },
      error: function(xhr) {
        alert(xhr.responseText);
      }
    });
  };

  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
