import changeCase from "change-case";

const ToCamelCase = a => {
  return changeCase.camelCase(a);
};

const ToSnakeCase = a => {
  return changeCase.snakeCase(a);
};

const isArray = function(a) {
  return Array.isArray(a);
};

const isObject = function(o) {
  return o === Object(o) && !isArray(o) && typeof o !== "function";
};

const keysToCamel = function(o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[ToCamelCase(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map(i => {
      return keysToCamel(i);
    });
  }

  return o;
};

const keysToSnake = function(o) {
  if (isObject(o)) {
    const n = {};

    Object.keys(o).forEach(k => {
      n[ToSnakeCase(k)] = keysToCamel(o[k]);
    });

    return n;
  } else if (isArray(o)) {
    return o.map(i => {
      return keysToCamel(i);
    });
  }

  return o;
};
