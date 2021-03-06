(function() {
	var CONSTANTS = {
			API_KEY: 'cY1MfyFqnit8iGSj',
			NOTHING_FOUND_MESSAGE: 'Нищо не е намерено. Моля, пробвайте търсене в други категории.'
		},
		el = new Everlive(CONSTANTS.API_KEY),
		courses = el.data('Courses'),
		order,
		$resultsEl = $('.search-results');

	$(".btn-search").on("click", function() {
		var $categories = $(".search-input-category").find('input:checked'),
			categoriesArr = $.makeArray($categories),
			categoriesNames = [];

		$resultsEl.html('');
		$('.alert-info').hide();
		$('.glyphicon-refresh-animate').show();

		order = $('.input-order').find('input:checked').attr('id');

		_.every(categoriesArr, function(item) {
			return categoriesNames.push($(item).parent().text())
		})

		var filter = {
			"Category": {
				"$in": categoriesNames
			}
		};

		var url = 'http://api.everlive.com/v1/cY1MfyFqnit8iGSj/Courses?filter=' + JSON.stringify(filter);

		$.ajax({
			url: url,
			type: "GET",
			headers: {
				"Authorization": CONSTANTS.API_KEY
			},
			success: function(data) {
				$('.glyphicon-refresh-animate').hide();
				showCourses(data.Result);
			},
			error: function(error) {
				alert(JSON.stringify(error));
			}
		});
	})

	function showCourses(coursesArr) {
		if (coursesArr.length === 0) {
			$resultsEl.append('<div class="alert alert-warning" role="alert">' + CONSTANTS.NOTHING_FOUND_MESSAGE + '</div>')
		} else {
			var coursesSorted = _.map(_.sortByOrder(coursesArr, ['Year', 'Name'], [order, 'asc']), 'Name');

			_.every(coursesSorted, function(item) {
				return $('<li />')
					.html('<a href=""><span class="glyphicon glyphicon-link"></span>' + item + '<a/>')
					.appendTo($resultsEl)
			})
		}
		$resultsEl.show();
	}
}())