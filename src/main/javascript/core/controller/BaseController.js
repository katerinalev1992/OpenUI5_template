var RESOURCE_MODEL_ID = "i18n";

sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/core/routing/History"
], function (Controller, History) {
  "use strict";

  var BaseController = Controller.extend("com.openUI5_template.core.controller.BaseController", {

    onInit: function () {
      var that = this;
      this.getView().addEventDelegate({

        onBeforeFirstShow: function (oEvent) {
          if (that.onBeforeFirstShow) {
            that.onBeforeFirstShow(oEvent);
          }
        },
        /**
         * The method is automatically called before the view is shown.
         * @public
         */
        onBeforeShow: function (oEvent) {
          if (that.onBeforeShow) {
            that.onBeforeShow(oEvent);
          }
        },

        /**
         * The method is automatically called before the view is hidden.
         * @public
         */
        onBeforeHide: function (oEvent) {
          if (that.onBeforeHide) {
            that.onBeforeHide(oEvent);
          }
        },

        /**
         * The method is automatically called after the view is shown.
         * @public
         */
        onAfterShow: function (oEvent) {
          if (that.onAfterShow) {
            that.onAfterShow(oEvent);
          }
        },

        /**
         * The method is automatically called after the view is hidden.
         * @public
         */
        onAfterHide: function (oEvent) {
          if (that.onAfterHide) {
            that.onAfterHide(oEvent);
          }
        }
      });
    },

    /**
     * @returns {BaseController_L6.BaseControllerAnonym$1
     * @call;getOwnerComponent
     * @call;getEventBus} Event Bus for initialized for this application
     */
    getEventBus: function () {
        if(this.getOwnerComponent())
            return this.getOwnerComponent().getEventBus();
        else
            return this.getEventBus();
    },

    /**
     * @returns sap.m.Router for this view/controller
     * @public
     */
    getRouter: function () {
      return sap.ui.core.UIComponent.getRouterFor(this);
    },

    /**
     * Convenience method for getting the resource bundle.
     * @public
     * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
     */
    getResourceBundle: function () {
      if(this.getOwnerComponent())
        return this.getOwnerComponent().getModel(RESOURCE_MODEL_ID).getResourceBundle();
      else
        return this.getModel(RESOURCE_MODEL_ID).getResourceBundle();
    },

    getAppContext: function () {
      return sap.ui.getCore().ApplicationContext;
    },

    /**
     * Convenience method for setting the view model.
     * Since 1.2.0
     * @public
     * @param {sap.ui.model.Model} oModel the model instance
     * @param {string} sModelName the model name
     * @returns {sap.ui.mvc.View} the view instance
     */
    setModel: function (oModel, sModelName) {
      return this.getView().setModel(oModel, sModelName);
    },

    /**
     * Return a view model by given name {sModelName}
     * Since 1.2.0
     * @param sModelName name of model which should be found
     * @returns view model by {sModelName}, otherwise null is returned
     */
    getModel: function (sModelName) {
      return this.getView().getModel(sModelName);
    },

    /**
     * Convenience method for setting the global model.
     *
     * @param {sap.ui.model.Model} oModel the model instance
     * @param {string} sModelName the model name
     */
    setCoreModel: function (model, modelName) {
      sap.ui.getCore().setModel(model, modelName);
    },

    /**
     * Return a global model by given name {sModelName}
     *
     * @param sModelName name of model which should be found
     * @returns view model by {sModelName}, otherwise null is returned
     */
    getCoreModel: function (modelName) {
      return sap.ui.getCore().getModel(modelName);
    },

    /**
     * Returns component model by {modelName}
     *
     * @returns the owner component model if such existed, else return model by {modelName}
     */
    getComponentModel: function (modelName) {
      if(this.getOwnerComponent())
        return this.getOwnerComponent().getModel(modelName);
      else
        return this.getModel(modelName);
    },

    /**
     * Returns the Configuration / global JSON model. Model is read from JSON file
     * Since 1.1.0
     * @returns the Configuration / global JSON model. Model is read from JSON file
     */
    getConfigurationModel: function () {
      return this.getComponentModel("global");
    },

    /**
     * Returns default currency which is set inside of the configuration JSON file
     * Since 1.1.0
     * @returns default currency which is set inside of the configuration JSON file
     */
    getDefaultCurrency: function () {
      return this.getConfigurationModel().getProperty("/currency");
    },


    /**
     * Round a value {num} to defined {precision}
     * Since 1.2.0
     * @param num value which should be round
     * @param precision to which rounded number should contains
     * @returns {number} rounded number
     */
    round: function (num, precision) {
      return FormatterUtils.getInstance().round(num, precision)
    },


    onNavBack: function (oEvent) {
      var oHistory, sPreviousHash;
      oHistory = History.getInstance();
      sPreviousHash = oHistory.getPreviousHash();
      if (sPreviousHash !== undefined) {
        window.history.go(-1);
      } else {
        this.getRouter().navTo("appHome", {}, true /*no history*/);
      }
    },

    /**
     *
     * @param {Boolean} bCheckHashHistory
     * @private
     */
    navBackWithHasHistory: function (bCheckHashHistory) {
      if (bCheckHashHistory) {
        var oHistory = History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();
        if (sPreviousHash !== undefined) {
          // The history contains a previous entry
          window.history.go(-1);
        } else {
          delete this.getAppContext().Navigation;
          this.getRouter().navTo("authorization", {}, true /*no history*/);
        }
      } else {
        window.history.go(-1);
      }
    },
    /**
     * Set busy application
     * @param {bBusy} which parameter true/false must be set
     * @private
     */
    showAppBusy: function (bBusy) {
    var oApp;
    if(this.getOwnerComponent()){
         oApp = this.getOwnerComponent().getAggregation("rootControl").byId("idAppControl");
    }else{
         oApp = this.getAggregation("rootControl").byId("idAppControl");
    }
    oApp.setBusy(bBusy);

    },

    /**
     * By this method sap.m.Dialog will be shown (type Warning)
     * @param {String} sMessage message text which should be shown
     * @since 1.3.0
     *
     * @public
     */
    showWarningMessageDialog: function (sMessage, sTitle) {
      var dialog = new sap.m.Dialog({
        title: sTitle ? sTitle : this.getResourceBundle().getText("dialogTitleWarning"),
        type: 'Message',
        state: 'Warning',
        content: new sap.m.Text({
          text: sMessage
        }),
        beginButton: new sap.m.Button({
          text: 'OK',
          press: function () {
            dialog.close();
          }
        }),
        afterClose: function () {
          dialog.destroy();
        }
      });

      dialog.open();
    },

  });

  BaseController.prototype.backstack = new Array();

  return BaseController;

});