#!/bin/bash
# Setup script for Vista deployment

echo "==================================="
echo "Vista Deployment Setup"
echo "==================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}This script will help you set up the Vista deployment.${NC}"
echo ""

# Step 1: Check for GH_PAT
echo "Step 1: GitHub Personal Access Token (PAT)"
echo "-------------------------------------------"
echo "You need to create a GitHub PAT with 'repo' and 'workflow' scopes."
echo ""
echo "1. Go to: https://github.com/settings/tokens"
echo "2. Click 'Generate new token' → 'Generate new token (classic)'"
echo "3. Give it a name like 'Vista Deployment'"
echo "4. Select scopes: 'repo' and 'workflow'"
echo "5. Generate and copy the token"
echo ""
read -p "Have you created the PAT? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Please create the PAT first and run this script again.${NC}"
    exit 1
fi

# Step 2: Add secrets to repositories
echo ""
echo "Step 2: Add GH_PAT Secret to Repositories"
echo "-------------------------------------------"
echo "Add the secret to BOTH repositories:"
echo ""
echo "Main Repository (skjapps.github.io):"
echo "  https://github.com/skjapps/skjapps.github.io/settings/secrets/actions"
echo ""
echo "Vista Repository (youchat):"
echo "  https://github.com/skjapps/youchat/settings/secrets/actions"
echo ""
echo "Name the secret: GH_PAT"
echo "Value: [paste your token]"
echo ""
read -p "Have you added GH_PAT to both repositories? (y/n) " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Please add the secrets and run this script again.${NC}"
    exit 1
fi

# Step 3: Verify icon exists
echo ""
echo "Step 3: Vista Icon"
echo "-------------------------------------------"
if [ -f "public/assets/img/vista.png" ]; then
    echo -e "${GREEN}✓ Vista icon found at public/assets/img/vista.png${NC}"
else
    echo -e "${RED}✗ Vista icon not found!${NC}"
    echo "Please add a vista.png icon (60x60px recommended) to:"
    echo "  public/assets/img/vista.png"
fi

# Step 4: Check youchat workflow
echo ""
echo "Step 4: YouChat Repository Workflow"
echo "-------------------------------------------"
echo "The trigger workflow should be added to the youchat repository at:"
echo "  .github/workflows/trigger-deploy.yml"
echo ""
if [ -f "../YouChat/youchat/.github/workflows/trigger-deploy.yml" ]; then
    echo -e "${GREEN}✓ Workflow file found${NC}"
else
    echo -e "${YELLOW}⚠ Workflow file not found in expected location${NC}"
    echo "Make sure to commit and push the workflow file to youchat repository"
fi

# Step 5: Test deployment
echo ""
echo "Step 5: Testing"
echo "-------------------------------------------"
echo "To test the deployment:"
echo ""
echo "1. Commit and push changes to 'next' branch of skjapps.github.io"
echo "   git add ."
echo "   git commit -m 'Add Vista deployment'"
echo "   git push origin next"
echo ""
echo "2. Watch the deployment at:"
echo "   https://github.com/skjapps/skjapps.github.io/actions"
echo ""
echo "3. After deployment, Vista should be available at:"
echo "   https://skjapps.github.io/vista"
echo ""
echo "4. Test automatic trigger by pushing to youchat main branch:"
echo "   cd /path/to/youchat"
echo "   git commit --allow-empty -m 'Test Vista deployment'"
echo "   git push origin main"
echo ""

echo -e "${GREEN}==================================="
echo "Setup Complete!"
echo "===================================${NC}"
echo ""
echo "Next steps:"
echo "1. Commit and push changes to this repository"
echo "2. Commit and push the trigger workflow to youchat repository"
echo "3. Test the deployment by pushing to either repository"
echo ""
echo "For more details, see: VISTA_DEPLOYMENT.md"
