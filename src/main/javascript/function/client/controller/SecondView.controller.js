sap.ui.define([
    "com/openUI5_template/core/controller/BaseController",
    'sap/ui/model/json/JSONModel'
], function (BaseController, JSONModel) {
    "use strict";
    var pressCounter=0;
    /** @module Main. Created by Kateryna Levytska*/
    var MainController = BaseController.extend("com.openUI5_template.function.client.controller.SecondView", {

        /**
         * The method automatically called when the view is created.
         * @public
         */
        onInit: function () {
            BaseController.prototype.onInit.apply(this);

            // set explored app's demo model on this sample
            var oLocalData = oMockData;
            console.log(oLocalData)
            this.getView().setModel(new JSONModel(oLocalData), "ProductCollection");
        },

        onHelloPress: function () {
            alert("On HEllo Press");
        }

    });

})


