let instances = [];

export function register(instance) {
  instances.push(instance);
}

export function unregister(instance) {
  instances = instances.filter(i => i !== instance);
}

export function matchPath(pathname, options) {
  const { exact = false, path } = options;

  /**
   * If a Route is not given a path, it will automatically be rendered.
   */
  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true
    };
  }

  const match = new RegExp(`^${path}`).exec(pathname);

  if (!match) {
    return null;
  }

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) {
    return null;
  }

  return { path, url, isExact };
}

export function historyReplace(path) {
  window.history.replaceState({}, null, path); // replace current entry of window.history
  instances.forEach(i => i.forceUpdate());
}

export function historyPush(path) {
  window.history.pushState({}, null, path); // add new entry to window.history on top of existing
  instances.forEach(i => i.forceUpdate());
}
