/**
 * Mock object since we dont need hardlink DI to Mithril
 * @type {Object}
 */
Mithril = {};

var should = require('should');

// Not exactly a NodeJS module, so…
require('../');

describe('Mithril - Dependency injection', function () {

  describe('module factory', function() {

    it('should throw error on empty factory name', function() {
      (function () {
        Mithril.factory();
      }).should.throw('Dependency name undefined');
    });

    it('should throw error on wrong type of name', function() {
      var names = [1, true, [], {}, '', null];

      names.forEach(function (name) {
        (function () {
          Mithril.factory(name);
        }).should.throw('Dependency name undefined');
      });
    });

    it('should throw error on empty module as function', function() {
      (function () {
        Mithril.factory('fail');
      }).should.throw('Empty dependency list');
    });

    it('should throw error on empty module as array', function () {
      (function () {
        Mithril.factory('fail', []);
      }).should.throw('Empty dependency list');
    });

    it('should throw error on wrong dependency definition', function() {
      var definitions = [1, true, [], [1,2,3],  {}, '', null];

      definitions.forEach(function (definition) {
        (function () {
          Mithril.factory('fail', definition);
        }).should.throw();
      });
    });

    it('should register module with function', function() {
      (function () {
        Mithril.factory('success.function', function () {
          return true;
        });
      }).should.not.throw();
    });

    it('should throw error on duplicate module', function() {
      (function () {
        Mithril.factory('success.function', function () {
          return true;
        });
      }).should.throw('Duplicate dependency entry');
    });

    it('should register module with array', function() {
      (function () {
        Mithril.factory('success.array', [
          function () {
            return true;
          }
        ]);
      }).should.not.throw();
    });

    it('should register module with dependency list', function() {
      (function () {
        Mithril.factory('success.dependency', ['success.function', 'success.array', function (sa, sf) {
          return sa && sf;
        }]);
      }).should.not.throw();
    });

  });

  describe('module resolve', function() {

    it('should throw error on unregistered module resolving', function() {
      (function () {
        Mithril.resolve('fail');
      }).should.throw('Undefined dependency resolve: fail');
    });

    it('should resolve module', function() {
      /* jshint ignore:start */
      Mithril.resolve('success.function').should.be.true;
      /* jshint ignore:end */
    });

    it('should resolve module with dependencies', function() {
      /* jshint ignore:start */
      Mithril.resolve('success.dependency').should.be.true;
      /* jshint ignore:end */
    });

    it('should throw error on resolving module with undefined dependency in list', function() {
      Mithril.factory('fail', ['unsuccess', function (us) {
        return us;
      }]);

      (function () {
        Mithril.resolve('fail');
      }).should.throw('Undefined dependency resolve: unsuccess');
    });

  });

});
