

function InvoiceController($scope) {
	$scope.items = [
		{description:'en apa', price:500},
		{description:'en ko', price:1500},
	];

	$scope.addItem = function() {
		var item = {
			description: $scope.description,
			price: $scope.price,
		}
		$scope.items.push(item);

		$scope.description = '';
		$scope.price = '';
	};

	$scope.removeItem = function(index) {
		$scope.items.splice(index, 1);
	};
}

