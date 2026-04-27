# Backend

This folder is reserved for **server-side code** that stays separate from the static portfolio in `../frontend/`.

Typical uses:

- REST or GraphQL API
- Contact form handler (email, database)
- Authentication or CMS integration

Keep secrets (API keys, database URLs) in environment variables and never commit them. Point your frontend to this API using absolute URLs or a config file when you deploy.
