(function(Mithril) {
  var repository;
  repository = [];
  Mithril.factory = function(name, dependencies) {
    if (typeof name === 'undefined' || (typeof name !== "string" || name.length === 0)) {
      throw new Error('Dependency name undefined');
    } else if (typeof repository[name] !== 'undefined') {
      throw new Error('Duplicate dependency entry');
    } else if (typeof dependencies !== 'function' && (!Array.isArray(dependencies) || dependencies.length === 0)) {
      throw new Error('Empty dependency list');
    }
    repository[name] = {
      fn: typeof dependencies === "function" ? dependencies : dependencies.pop() || null,
      dependencies: Array.isArray(dependencies) ? dependencies || null : null,
      instance: null
    };
    if (repository[name].fn === null) {
      delete repository[name];
      throw new Error('Empty repository entry');
    } else if (typeof repository[name].fn !== 'function') {
      delete repository[name];
      throw new Error('Dependency not a function');
    }
    return true;
  };
  Mithril.resolve = function(name, params, scope) {
    var resolved;
    if (typeof repository[name] === 'undefined') {
      throw new Error("Undefined dependency resolve: " + name);
    }
    if (repository[name].instance === null) {
      resolved = [];
      if (repository[name].dependencies !== null) {
        repository[name].dependencies.forEach(function(dependency) {
          return resolved.push(Mithril.resolve(dependency));
        });
      }
      repository[name].instance = repository[name].fn.apply(scope || {}, resolved.concat(Array.prototype.slice.call(params || [], 0)));
    }
    return repository[name].instance;
  };
  return Mithril;
})(m);
