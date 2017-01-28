sap.ui.define([
  "com/openUI5_template/core/controller/BaseController",
  "jquery.sap.global"
], function (BaseController) {
  "use strict";
var pressCounter=0;
var globalObject;
  /** @module Main. Created by Kateryna Levytska*/
  var MainController = BaseController.extend("com.openUI5_template.function.client.controller.Login", {

    /**
     * The method automatically called when the view is created.
     * @public
     */
    onInit: function () {
        BaseController.prototype.onInit.apply(this);
        this.getData();
        this.byId("titleLabel").setText(globalObject.title);
    },

    onLoginPress:function(){
        this.getRouter().navTo("main", {}, false);
    },

    getData: function(){
        var URL = "https://jsonplaceholder.typicode.com/posts/1";

        jQuery.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            url: URL,
            async: false,
            success: function(){
                console.log("SUCCESS");
            },
            error:  function(){
                console.log("ERROR");
            }
        }).then(function(data) {
            console.log(data);
            globalObject = data;
        });
    }


  });

})


