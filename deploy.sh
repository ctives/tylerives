echo "Building TylerIves.com"
jekyll build
echo "Deploying TylerIves.com to s3"
s3_website push --verbose