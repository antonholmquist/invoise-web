/*
// declare a module
var appModule = angular.module('appModule', []);

// Create a service
appModule.factory('appService', function() {
  var serviceInstance;
  


  return serviceInstance;
});
*/




var globalInvoice = null;

function formatMoney(v) {
	return accounting.formatMoney(v, "", 2, ",", ".");
}

function InvoiceController($scope) {

	// Construct the invoice
	var invoice;

	// If pagw was recieved to be rendered, invoice data will be received from here.
	if (typeof globalStaticInvoice !== 'undefined') {
		invoice = globalStaticInvoice;

		// Avoid placeholders
		if (invoice.footerColumn0 === undefined) {
			invoice.footerColumn0 = ' ';
		}
		if (invoice.footerColumn1 === undefined) {
			invoice.footerColumn1 = ' ';
		}
		if (invoice.footerColumn2 === undefined) {
			invoice.footerColumn2 = ' ';
		} 
	}

	// Else, create default values
	else {
		invoice = {};
		invoice.invoiceText = "_invalid_ invoice variable missing";		
	}

	// Set the constructed invoice
	$scope.invoice = invoice;

	// Copy to global scope so ajax can get it
	globalInvoice = $scope.invoice;

	// Watch vat label
	$scope.$watch('invoice.vatLabel', function(newValue, oldValue) { 
		$scope.updateSummary();
	}, true);

	// Watch items (third option enables deep linking)
	$scope.$watch('invoice.items', function(newValue, oldValue) { 
		$scope.updateSummary();
	}, true);
	
	function isNumber(n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	

	$scope.updateSummary = function() {


		console.log("updateSummary");

		var subtotalPrice = 0;

		// Set total price
		for (var i = 0; i < $scope.invoice.items.length; i++) {
			var item = $scope.invoice.items[i];

			item.totalPrice = parseFloat(item.quantity * item.unitPrice);

		}

		for (var i = 0; i < $scope.invoice.items.length; i++) {

			/*
			var item = $scope.invoice.items[i];

			var rawUnitPrice = item.unitPrice.replace(/\,/g,'')
			item.unitPrice = formatMoney(rawUnitPrice);


			if (item.totalPrice) {
				var rawTotalPrice = item.totalPrice.replace(/\,/g,'')
				item.totalPrice = formatMoney(rawTotalPrice);
			}
			
			*/

			var value = parseFloat(item.totalPrice, 10);
			// 
			if (isNumber(value)) {
				subtotalPrice += value;
			}
			
		}

		// Parse VAT
		// http://stackoverflow.com/questions/12059284/get-text-between-two-rounded-brackets
		var vat = $scope.invoice.vatLabel.match(/\(([^)]+)\)/)[1];
		vat = vat.replace(/%$/, "");
		vat /= 100.0;
		
		var roundedSubtotalPrice = subtotalPrice; //Math.round(subtotalPrice);
		var roundedVatAmount = subtotalPrice * vat; //Math.round(subtotalPrice * vat);

		$scope.invoice.subtotalPrice = formatMoney(roundedSubtotalPrice);
		$scope.invoice.vatAmount = formatMoney(roundedVatAmount);
		$scope.invoice.totalPrice = formatMoney(roundedSubtotalPrice + roundedVatAmount);


	}; 


	$scope.addItem = function() {
		console.log("add: " + JSON.stringify($scope.newItem));
		
		// Need to copy here
		var item = {
			description: $scope.newItem.description,
			unitPrice: $scope.newItem.unitPrice,
			quantity: $scope.newItem.quantity,
		}

		$scope.invoice.items.push(item);


		$scope.newItem.description = '';
		$scope.newItem.unitPrice = '';
		$scope.newItem.quantity = '';
		

	};

	$scope.removeItem = function(index) {
		console.log("remove");
		$scope.invoice.items.splice(index, 1);
	};
}

$(document).ready(function() {

	// Autosize all inputs
	$('input').autosizeInput();

				
});

