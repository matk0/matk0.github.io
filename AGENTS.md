# Repository Workflow

## Copy-only changes

- Run only an existing focused copy test. Do not run the full suite or production build unless code behavior also changed or Matej asks for release verification.
- Skip browser verification unless the edit could affect layout, Matej asks to see it, or there is a concrete rendering concern.
- When browser verification is needed, reuse an existing local server if available and inspect the page in Matej's Chrome session. Do not launch an isolated test browser.
- Do not commit without explicit authorization.
