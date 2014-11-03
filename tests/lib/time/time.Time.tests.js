/**
 * @licence GNU GPL v2+
 * @author Daniel Werner
 */
define( [
	'time/time',
	'jquery',
	'qunit',
	'time/time.Time',
	'tests/lib/time/time.validTimeDefinitions',
	'time/time.Time.validate'
], function( time, $, QUnit ) {
	'use strict';

	var Time = time.Time,
		validTimeDefinitions = time.validTimeDefinitions;

	QUnit.module( 'Time.js: time.Time' );

	QUnit.test( 'Construct using time definition object', function( assert ) {
		$.each( validTimeDefinitions, function( name, definition ) {
			testConstructByObject( assert, name, definition );
		} );
	} );

	function testConstructByObject( assert, definitionName, definition ) {
		var time;
		try {
			time = new Time( definition ); // throws an error if failure
		} catch ( e ) {
		}

		assert.ok(
			time,
			'New time.Time object built from "' + definitionName + '" example definition'
		);
	}

	QUnit.test( 'Construct using string to be parsed', function( assert ) {
		$.each( validTimeDefinitions, function( name, definition ) {
			testConstructByString( assert, name, definition );
		} );

		var t;

		assert.throws(
			function() { t = new Time( {} ); },
			'Trying to instantiate with an empty object throws an error.'
		);

		assert.throws(
			function() { t = new Time( '' ); },
			'Trying to instantiate with an empty string throws an error.'
		);

		assert.throws(
			function() { t = new Time( 'foooo - invalid time' ); },
			'Trying to instantiate with an invalid string throws an error.'
		);
	} );

	function testConstructByString( assert, definitionName, definition ) {
		var time;
		try {
			time = new Time( definitionName ); // throws an error if failure
		} catch( e ) {
		}

		assert.ok(
			time,
			'New valid time.Time object built from "' + definitionName + '" example definition'
		);
	}

	QUnit.test( 'time.Time.equals()', function( assert ) {
		$.each( validTimeDefinitions, function( name, definition ) {
			var time1 = new Time( definition ),
				time2 = new Time( definition );

			assert.ok(
				time1.equals( time2 ) && time2.equals( time1 ),
				'equal() works for time definition of "' + name + '"'
			);

		} );
	} );

	QUnit.test( 'Equality of Time objects constructed by object/string', function( assert ) {
		// TODO: get rid of this once we can use a parser instance with injected options
		var dbmStateBefore = time.settings.daybeforemonth;
		time.settings.daybeforemonth = true;

		var equalTimeObjects = {};
		$.each( validTimeDefinitions, function( name, definition ) {
			equalTimeObjects[ name ] = {
				byObject: new Time( definition ),
				byString: new Time( name )
			};
		} );
		$.each( equalTimeObjects, function( name, equalTimes ) {
			var timeByObject = equalTimes.byObject,
				timeByString = equalTimes.byString;

			assert.ok(
				timeByObject.equals( timeByString ),
				'Time created from string "' + name + '" and time created from equivalent time ' +
					'object definition are equal'
			);
		} );

		time.settings.daybeforemonth = dbmStateBefore; // reset state of evil global setting
	} );

} );
