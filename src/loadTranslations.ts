export default async function loadTranslations(locale: string) {
  try {
    const translations = await import(`../public/i18n/${locale}.json`);
    return translations.default;
  } catch (error) {
    console.error("Failed to load translations for " + locale);
    return {};
  }
}