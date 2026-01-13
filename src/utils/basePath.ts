export const BASE_PATH =
  process.env.NEXT_PUBLIC_ENV === 'prod'
    ? '/JaneStyle'
    : process.env.NEXT_PUBLIC_ENV === 'dev'
    ? '/JaneStyle/dev'
    : '';

export const asset = (path: string) =>
  `${BASE_PATH}/${path}`.replace(/\/+/g, '/');