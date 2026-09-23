export function validateName(name: string): boolean {
  if (!name) return false;
  return !!name.match(/[a-zA-ZÀ-ÿ]+ [a-zA-ZÀ-ÿ]+/);
}

