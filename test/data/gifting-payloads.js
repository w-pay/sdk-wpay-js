"use strict";

const giftingProductDetail = () => ({
	redemptionInstructions: "Test instructions",
	redemptionType: "INSTORE",
	termsAndConditions: "Test terms and conditions",
	minValue: 0,
	maxValue: 100,
	expiryPeriodInDays: 100,
	expiryPeriodText: "Test expiry period",
	isActive: true,
	redemptionStores: ["test"],
	availability: "PHYSICAL",
	designs: [
		{
			designId: "design-1",
			designType: "DIGITAL",
			imageUrl: "http://test.com"
		}
	],
	productId: "product-1",
	name: "Test Gift Card",
	barCodeType: "PAN",
	lastUpdateDateTime: new Date("2017-10-26T04:56:25.046Z"),
	defaultDesign: {
		designId: "design-1",
		designType: "PHYSICAL",
		imageUrl: "http://test.com"
	},
	discountOffered: {
		discountId: "discount-1",
		description: "Test Discount",
		percentageDiscount: 10,
		startDate: new Date("2017-10-26T04:56:25.046Z"),
		endDate: new Date("2017-10-26T04:56:25.046Z")
	}
});

const giftingProductList = () => ({
	products: [
		{
			productId: "product-1",
			name: "Test Gift Card",
			barCodeType: "PAN",
			lastUpdateDateTime: new Date("2017-10-26T04:56:25.046Z"),
			defaultDesign: {
				designId: "design-1",
				designType: "PHYSICAL",
				imageUrl: "http://test.com"
			},
			discountOffered: {
				discountId: "discount-1",
				description: "Test Discount",
				percentageDiscount: 10,
				startDate: new Date("2017-10-26T04:56:25.046Z"),
				endDate: new Date("2017-10-26T04:56:25.046Z")
			}
		}
	]
});

const giftingQuoteRequest = () => ({
	orderItems: [
		{
			designId: "design-1",
			amount: 100,
			quantity: 1,
			isGifting: true,
			recipientDetails: {
				toName: "John Smith",
				fromName: "Jane Smith",
				message: "Test message",
				imageUrl: "http://test.com",
				mobileNumber: "+61444555666"
			}
		}
	]
});

const giftingQuoteResponse = () => ({
	quoteId: "quote-1",
	subTotalAmount: 100,
	discountAmount: 10,
	totalOrderAmount: 90,
	orderItems: {
		designId: "design-1",
		amount: 100,
		unitPrice: 100,
		totalPrice: 100,
		unitSalePrice: 90,
		totalSalePrice: 90,
		quantity: 1,
		isGifting: true,
		mobileNumber: "+61444555666"
	}
});

const giftingOrderRequest = () => ({
	instrumentId: "12345",
	deliveryEmail: "test@test.com",
	referenceId: "reference-1",
	subTotalAmount: 100,
	discountAmount: 10,
	totalOrderAmount: 90,
	billingContact: {
		firstName: "Jane",
		lastName: "Smith",
		email: "jane.smith@test.com",
		mobileNumber: "+61444555666",
		streetAddress: "123 Test St",
		extendedAddress: "Unit 1",
		suburb: "Sydney",
		stateOrTerritory: "NSW",
		postalCode: "2000",
		countryCode: "AU"
	},
	orderItems: [
		{
			designId: "design-1",
			amount: 100,
			quantity: 1,
			isGifting: true,
			recipientDetails: {
				toName: "John Smith",
				fromName: "Jane Smith",
				message: "Test message",
				imageUrl: "http://test.com",
				mobileNumber: "+61444555666"
			}
		}
	]
});

const giftingOrderResponse = () => ({
	status: "STATUS",
	orderId: "order-1",
	quoteNo: "quote-1"
});

module.exports = {
	giftingProductDetail,
	giftingProductList,
	giftingQuoteRequest,
	giftingQuoteResponse,
	giftingOrderRequest,
	giftingOrderResponse
};
