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


		var subtotalPrice = 0;

		for (i in $scope.invoice.items) {
			var item = $scope.invoice.items[i];
			var rawPrice = item.price.replace(/\,/g,'')
			item.price = formatMoney(rawPrice);
			var value = parseFloat(rawPrice, 10);
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
		var item = {
			description: $scope.newItem.description,
			price: $scope.newItem.price,
		}
		$scope.invoice.items.push(item);

		$scope.newItem.description = '';
		$scope.newItem.price = '';

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

