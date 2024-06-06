export function UniversalRoute(name, target, context, route) {
  let pathname = '/' + name.replace(/\ /g, '');

  return UniversalLinker(null, pathname, null, null, null, false, context, target, null, null, route);
}

export function UniversalContext(name, target, context) {
  if (!target || target === 'new' || target === 'popup') {
    let pathname = window.location.pathname;
    let query = 'universalcontext=' + name;

    if (context) {
      context = context + ',target=' + target;
    } else {
      context = 'target=' + target;
    }

    UniversalLinker(null, pathname, query, null, null, false, context, target, null, null);
  } else {
    document.getElementById(target).contentWindow.postMessage('UniversalContext,' + name + ',,' + context + ',target=&disableHeader=true&linkerInstance=true', window.location.origin);
  }
}

export function UniversalDocument(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'document=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalView(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'view=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalChart(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'chart=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalHelp(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'help=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalGrid(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'grid=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalTable(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'table=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalForm(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'form=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalApi(endpoint, httpmethod, postbody, target, context, linktype, linkidentifier) {
  if (context) {
    context = context + ',target=popup';
  } else {
    context = 'target=popup';
  }

  return UniversalLinker(endpoint, null, null, httpmethod, postbody, true, context, target, linktype, linkidentifier, null);
}

export function UniversalLinker(environment, pathname, search, method, body, api, context, target, linktype, linkidentifier, route) {
  if (!api) {
    if (search) {
      pathname = pathname + '?' + encodeURIComponent(search);
    }
    if (context) {
      if (search) {
        pathname = pathname + '&context=' + encodeURIComponent(context);
      } else {
        pathname = pathname + '?context=' + encodeURIComponent(context);
      }
    }

    if (!route || route === 'true') {
      if (target === 'new') {
        window.open(pathname);
      } else {
        window.history.pushState({ liquid: true }, '', pathname);
        window.history.pushState('', '', window.location.pathname);
        window.history.forward();
        window.history.back();
      }
    } else {
      return pathname;
    }
  } else {
    window.history.pushState(
      { liquid: true },
      '',
      '?api=' +
        encodeURIComponent(environment) +
        ',' +
        method +
        ',' +
        encodeURIComponent(body) +
        ',' +
        linktype +
        ',' +
        linkidentifier +
        ',' +
        target +
        '&context=' +
        encodeURIComponent(context)
    );
    window.history.pushState('', '', window.location.pathname);
    window.history.forward();
    window.history.back();
  }
}

export function UniversalWork(name, target, context, route) {
  let pathname = window.location.pathname;
  let query = 'work=' + name;

  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}

export function UniversalAddTicket(name, target, context, route, accountid, loastatus = '') {
  let pathname = window.location.pathname;
  let query = 'addticket=' + name;
  query = accountid ? query + '&acctid=' + accountid : query;
  query = loastatus ? query + '&loastatus=' + loastatus : query;
  if (context) {
    context = context + ',target=' + target;
  } else {
    context = 'target=' + target;
  }

  return UniversalLinker(null, pathname, query, null, null, false, context, target, null, null, route);
}
