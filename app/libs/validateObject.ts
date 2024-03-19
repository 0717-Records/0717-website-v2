import { NextResponse } from 'next/server';

const validateObject = (obj: any) => {
  const reqStringProps = ['name', 'type'];
  const reqBooleanProps = ['display'];

  // Check properties exist
  [...reqStringProps, ...reqBooleanProps].forEach((prop) => {
    if (!obj.hasOwnProperty(prop))
      throw new NextResponse(`Listing validation failed: '${prop}' not supplied.`, {
        status: 400,
        statusText: 'MISSING_VALUE',
      });
  });

  // Check for non-empty strings
  reqStringProps.forEach((prop) => {
    if (typeof obj[prop] !== 'string' || obj[prop].trim() === '')
      throw new NextResponse(`Listing validation failed: '${prop}' must be a valid string.`, {
        status: 400,
        statusText: 'EMPTY_STRING',
      });
  });

  // Check for boolean types
  reqBooleanProps.forEach((prop) => {
    if (typeof obj[prop] !== 'boolean')
      throw new NextResponse(`Listing validation failed: '${prop}' must be a boolean.`, {
        status: 400,
        statusText: 'NON_BOOLEAN',
      });
  });

  // All conditions passed, return the object
  return obj;
};

export default validateObject;
