var app = angular.module("Airbnb");

function bookingDataServiceFn($http) {

	var activeBooking = {};

	function setBooking(booking) {
		activeBooking.property = booking;
	}

	function getBooking() {
		return activeBooking;
	}

	function setBookingDates(bookingDates) {
		activeBooking.bookingDates = bookingDates;
	}

	function deleteBooking() {
		activeBooking = {};
	}

	function setBookingQty(qty) {
		activeBooking.qty = qty;
	}

	
	
	return{
		setBooking:setBooking,
		getBooking:getBooking,
		setBookingDates:setBookingDates,
		deleteBooking:deleteBooking,
		setBookingQty:setBookingQty
	}
}

app.service("bookingDataService",bookingDataServiceFn);