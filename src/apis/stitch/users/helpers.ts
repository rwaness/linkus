/* eslint-disable import/prefer-default-export */
export const getUserId = ({ _id: id } = {}, toString = true) => (id
  ? ((toString && `${id}`) || id)
  : null
);
