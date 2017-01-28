sap.ui.define([
	"com/openUI5_template/core/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("com.openUI5_template.core.controller.NotFound", {

		/**
		 * Navigates to the worklist when the link is pressed
		 * @public
		 */
		onLinkPressed: function() {
			this.getRouter().navTo("");
		}

	});

});