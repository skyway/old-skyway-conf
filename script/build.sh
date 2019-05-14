if [[ "$1" =~ ^(major|minor|patch)$ ]]; then
  version=$(npm --no-git-tag-version version $1)
  npm run build
  git add .
  git commit -m "Build: $version"
else
  echo "Build version is missing..."
fi
