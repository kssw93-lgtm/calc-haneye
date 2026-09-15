# Cloudflare Pages automatic deployment

Production: https://calc-haneye.kr — Pages project: calc-haneye.

This is a Direct Upload project. GitHub Actions performs the deployment; GitHub push alone does not deploy until this workflow is enabled.

## Activation checklist

1. Reconcile the Windows production checkout's uncommitted changes with main. In particular preserve transaction analysis, welfare middleware/security, calculator fixes, news rewrites and image assets. Do not replace the dirty checkout or publish the older main over production.
2. Create a dedicated Cloudflare API token with Account / Cloudflare Pages / Edit limited to the site's account. Do not copy Wrangler's personal OAuth session to GitHub.
3. In repository Settings > Secrets and variables > Actions add secrets CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID. Never put credentials in source, chat, screenshots, or logs.
4. Only after reconciliation and review, set repository variable PAGES_DEPLOY_ENABLED to true. Until then the deployment job is intentionally skipped.
5. Run Cloudflare Pages production from Actions using main. Check tests, build and deployment success, then inspect production article titles/body and existing tools.

Subsequent main pushes build, test and deploy automatically. Feature branches do not publish production. Article fact checking remains required: CI verifies code, not factual accuracy. To pause deployments, set PAGES_DEPLOY_ENABLED to false.

Official reference: https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/
