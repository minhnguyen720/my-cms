export const checkUndefined = (target, message) => {
  if (target === undefined) throw message ? message : 'Target is undefined';
};

export const checkValidBody = (body) => {
  if (typeof body !== 'object') throw 'Body is not an object';
  Object.entries(body).forEach(([key, value]) => {
    if (key === undefined) throw 'Some key is undefined';
    else if (value === undefined) throw `Value of ${key} is undefined`;
  });
};
