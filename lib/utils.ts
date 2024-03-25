export function extractDynamicVariables(htmlString: string): string[] {
  const regex = /{([^}]*)}/g;
  const matches = htmlString.match(regex);
  if (!matches) return [];

  const variables = matches.map((match) =>
    match.substring(1, match.length - 1).trim(),
  );

  return variables;
}
