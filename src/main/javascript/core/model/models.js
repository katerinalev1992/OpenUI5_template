sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		/**
		 * Method create the Global model which is read from the config.json file. Next an additional properties are added to
		 * model such like information about version of application or version of the OpenUI5 library which is used
		 * for this application.
		 * @returns model object which contains all information about device on which is application running
		 */
		createGlobalModel: function (oManifest) {
			var oGlobalModel = new sap.ui.model.json.JSONModel();
			oGlobalModel.loadData("config.json", '', false); //synchronous call
			oGlobalModel.setProperty("/appVersion", oManifest.getEntry("sap.app").applicationVersion.version);
			oGlobalModel.setProperty("/ui5Version", sap.ui.version);
			oGlobalModel.setDefaultBindingMode("OneWay");

			return oGlobalModel;
		}

	};

});
