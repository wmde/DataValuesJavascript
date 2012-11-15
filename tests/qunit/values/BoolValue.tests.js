/**
 * @since 0.1
 * @file
 * @ingroup DataValues
 *
 * @licence GNU GPL v2+
 * @author Jeroen De Dauw < jeroendedauw@gmail.com >
 */
( function( dv, $, QUnit, undefined ) {
	'use strict';

	var PARENT = dv.tests.DataValueTest,
		constructor = function() {
		};

	/**
	 * Constructor for creating a test object for the boolean DataValue.
	 *
	 * @constructor
	 * @extends dv.tests.DataValueTest
	 * @since 0.1
	 */
	dv.tests.BoolValueTest = dv.util.inherit( PARENT, constructor, {

		/**
		 * @see dv.tests.DataValueTest.getObject
		 */
		getObject: function() {
			return dv.BoolValue;
		},

		/**
		 * @see dv.tests.DataValueTest.getConstructorArguments
		 */
		getConstructorArguments: function() {
			return [
				[ true ],
				[ false ]
			];
		}

	} );

	var test = new dv.tests.BoolValueTest();

	test.runTests( 'dataValues.BoolValue' );

}( dataValues, jQuery, QUnit ) );
