import { graphql, list } from '@keystone-6/core';
import { text } from '@keystone-6/core/fields';

export const lists = {
  Something: list({
    fields: {
      text: text({ label: 'Initial Label For Text' }),
    },
  }),
};

export const extendGraphqlSchema = graphql.extend(() => {
  return {
    query: {
      someNumber: graphql.field({
        type: graphql.Int,
        resolve: () => 1,
      }),
    },
  };
});
