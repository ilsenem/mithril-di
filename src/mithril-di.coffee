do ->
  repository = []

  Mithril.factory = (name, dependencies) ->
    if typeof name is 'undefined' or (typeof name isnt "string" or name.length is 0)
      throw new Error 'Dependency name undefined'
    else if typeof repository[name] isnt 'undefined'
      throw new Error 'Duplicate dependency entry'
    else if typeof dependencies isnt 'function' and (!Array.isArray(dependencies) or dependencies.length is 0)
      throw new Error 'Empty dependency list'

    repository[name] =
      fn           : if typeof dependencies is "function" then dependencies else dependencies.pop() or null
      dependencies : if Array.isArray dependencies then dependencies or null else null,
      instance     : null

    if repository[name].fn is null
      delete repository[name]

      throw new Error 'Empty repository entry'
    else if typeof repository[name].fn isnt 'function'
      delete repository[name]

      throw new Error 'Dependency not a function'

    true

  Mithril.resolve = (name, params, scope) ->
    if typeof repository[name] is 'undefined'
      throw new Error "Undefined dependency resolve: #{name}"

    if repository[name].instance is null
      resolved = []

      if repository[name].dependencies isnt null
        repository[name].dependencies.forEach (dependency) ->
          resolved.push Mithril.resolve dependency

      repository[name].instance = repository[name].fn.apply scope || {}, resolved.concat Array.prototype.slice.call params || [], 0

    repository[name].instance;

  Mithril
