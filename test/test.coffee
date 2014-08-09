require '../'

describe 'Mithril - Dependency injection', ->

  describe 'module factory', ->

    it 'should throw error on empty factory name', ->
      (-> Mithril.factory()).should.throw 'Dependency name undefined'

    it 'should throw error on wrong type of name', ->
      names = [1, true, [], {}, '', null]

      names.forEach (name) ->
        (->Mithril.factory name ).should.throw 'Dependency name undefined'

    it 'should throw error on empty module as function', ->
      (-> Mithril.factory 'fail').should.throw 'Empty dependency list'

    it 'should throw error on empty module as array', ->
      (-> Mithril.factory 'fail', []).should.throw 'Empty dependency list'

    it 'should throw error on wrong dependency definition', ->
      definitions = [1, true, [], [1,2,3],  {}, '', null]

      definitions.forEach (definition) ->
        (-> Mithril.factory 'fail', definition).should.throw()

    it 'should register module with function', ->
      (-> Mithril.factory 'success.function', ->
          true
      ).should.not.throw()

    it 'should throw error on duplicate module', ->
      (-> Mithril.factory 'success.function', ->
          true
      ).should.throw 'Duplicate dependency entry'

    it 'should register module with array', ->
      (-> Mithril.factory 'success.array', [
        -> true
      ]).should.not.throw()

    it 'should register module with dependency list', ->
      (-> Mithril.factory 'success.dependency', ['success.function', 'success.array', (sa, sf) ->
          sa && sf;
        ]
      ).should.not.throw()

  describe 'module resolve', ->

    it 'should throw error on unregistered module resolving', ->
      (-> Mithril.resolve 'fail').should.throw 'Undefined dependency resolve: fail'

    it 'should resolve module', ->
      Mithril
        .resolve 'success.function'
        .should.be.true

    it 'should resolve module with dependencies', ->
      Mithril
        .resolve 'success.dependency'
        .should.be.true

    it 'should throw error on resolving module with undefined dependency in list', ->
      Mithril.factory 'fail', ['unsuccess', (us) ->
        us
      ]

      (-> Mithril.resolve 'fail').should.throw 'Undefined dependency resolve: unsuccess'
