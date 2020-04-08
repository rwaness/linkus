/* eslint-disable import/prefer-default-export */
export const getGroupId = ({ _id: id } = {}, toString = true) => (id
  ? ((toString && `${id}`) || id)
  : null
);
