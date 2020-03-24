export default function loadI18nMessages(localeMessages, options = {}) {
  const prefix = options.prefix || 'mongodbStitch';

  let messages = { ...localeMessages };

  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i);
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages = {
        ...messages,
        [locale]: {
          ...(messages[locale] || {}),
          [prefix]: {
            ...locales(key),
            ...((messages[locale] || {})[prefix] || {}),
          },
        },
      };
    }
  });

  return messages;
}
