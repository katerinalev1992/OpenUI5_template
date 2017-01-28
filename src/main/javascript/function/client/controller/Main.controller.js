sap.ui.define([
  "com/openUI5_template/core/controller/BaseController",
  'sap/m/MessageToast',
    'sap/ui/core/format/DateFormat',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel'
], function (BaseController, jQuery, MessageToast, DateFormat, JSONModel) {
  "use strict";
  var data = new Array();
  var pressCounter=0;
  var pressCounter2=0;
  /** @module Main. Created by Kateryna Levytska*/
  var MainController = BaseController.extend("com.openUI5_template.function.client.controller.Main", {

    /**
     * The method automatically called when the view is created.
     * @public
     */
    onInit: function () {
        BaseController.prototype.onInit.apply(this);

        // set mock model
        this.getView().setModel(new JSONModel());

         var widthAfterResize = $(document).width()-100;
         sap.ui.getCore().byId("__xmlview2--messageList").setWidth(widthAfterResize+"px");
    },

    /**
     * The method automatically called when the view is shown.
     * @public
     */
    onAfterShow: function(){

    },

    onCollapseExapandPress: function (event) {
        var navigationList = this.getView().byId('navigationList');
        var expanded = !navigationList.getExpanded();

        navigationList.setExpanded(expanded);
        if(expanded){
             var widthAfterResize = $(document).width()-330;
             sap.ui.getCore().byId("__xmlview2--messageList").setWidth(widthAfterResize+"px");
             console.log("1" + widthAfterResize)
        }else{
             var widthAfterResize = $(document).width()-100;
             sap.ui.getCore().byId("__xmlview2--messageList").setWidth(widthAfterResize+"px");
             console.log("1" + widthAfterResize)
        }
    },

    handlePopoverPress: function (oEvent) {

        // create popover
        if (! this._oPopover) {
            this._oPopover = sap.ui.xmlfragment("com.openUI5_template.function.client.view.SmilesPopover", this);
            this.getView().addDependent(this._oPopover);
        }

        // delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
        var oButton = oEvent.getSource();

        if(pressCounter == 0){
            this._oPopover.openBy(oButton);
            pressCounter++;
        } else {
            this._oPopover.close();
            pressCounter = 0;
        }

    },

    onPost: function (oEvent) {
        var oFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({style: "medium"});
        var oDate = new Date();
        var sDate = oFormat.format(oDate);
        // create new entry
        var sValue = oEvent.getParameter("value");
        var oEntry = {
            Author : "Alexandrina",
            AuthorPicUrl : "sap-icon://world",
            Type : "Reply",
            Date : "" + new Date(),
            Text : sValue
        };
        data.push(oEntry);
        // update model
        var oModel = this.getView().getModel();
        var aEntries = oModel.getData().EntryCollection;
        console.log(data)

        oModel.setData({
            EntryCollection : data
        });

    },

    onSenderPress: function (oEvent) {
        MessageToast.show("Clicked on Link: " + oEvent.getSource().getSender());
    },

    onIconPress: function (oEvent) {
        MessageToast.show("Clicked on Image: " + oEvent.getSource().getSender());
    },

    handleFileUploaderPopoverPress:function(oEvent){
         // create popover
        if (! this._oPopover) {
            this._oPopover = sap.ui.xmlfragment("com.openUI5_template.function.client.view.FileUploader", this);
            this.getView().addDependent(this._oPopover);
        }

        // delay because addDependent will do a async rerendering and the actionSheet will immediately close without it.
        var oButton = oEvent.getSource();

        if(pressCounter == 0){
            this._oPopover.openBy(oButton);
            pressCounter2++;
        } else {
            this._oPopover.close();
            pressCounter2 = 0;
        }
    },

    handleUploadComplete: function(oEvent) {
        var sResponse = oEvent.getParameter("response");
        if (sResponse) {
            var sMsg = "";
            var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
            if (m[1] == "200") {
                sMsg = "Return Code: " + m[1] + "\n" + m[2], "SUCCESS", "Upload Success";
                oEvent.getSource().setValue("");
            } else {
                sMsg = "Return Code: " + m[1] + "\n" + m[2], "ERROR", "Upload Error";
            }

            MessageToast.show(sMsg);
        }
    },

    handleUploadPress: function(oEvent) {
        var oFileUploader = this.getView().byId("fileUploader");
        oFileUploader.upload();
    }

  });

  window.onresize = function(event){
      if(sap.ui.getCore().byId('__xmlview2--navigationList').getExpanded()){
          var widthAfterResize = $(document).width()-330;
          sap.ui.getCore().byId("__xmlview2--messageList").setWidth(widthAfterResize+"px");
      }else{
          var widthAfterResize = $(document).width()-120;
          sap.ui.getCore().byId("__xmlview2--messageList").setWidth(widthAfterResize+"px");
      }

  }

  return MainController;
});


