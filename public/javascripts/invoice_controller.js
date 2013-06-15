

function InvoiceController($scope) {

	
	$scope.currencySymbol = '$';
	$scope.vatPercentage = '0.25';

	$scope.items = [
		{description:'en apa', price:500},
		{description:'en ko', price:1500},
	];

	$scope.updateSummary = function() {

		var subtotalPrice = 0;

		for (i in $scope.items) {
			var item = $scope.items[i];
			subtotalPrice += parseInt(item.price, 10);
		}
		
		$scope.subtotalPrice = subtotalPrice;
		$scope.vatAmount = $scope.subtotalPrice * $scope.vatPercentage;
		

	$scope.totalPrice = $scope.subtotalPrice + $scope.vatAmount;

	}; $scope.updateSummary();

	$scope.updateTo = function() {
		$scope.totalPrice = 0;
	}; $scope.updateSummary();

	$scope.addItem = function() {
		var item = {
			description: $scope.description,
			price: $scope.price,
		}
		$scope.items.push(item);

		$scope.description = '';
		$scope.price = '';

		$scope.updateSummary();
	};

	$scope.removeItem = function(index) {
		console.log("remove");
		$scope.items.splice(index, 1);
		$scope.updateSummary();
	};
}

