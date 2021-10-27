echo '---------- Begin generate latest build ----------'
npm run build
cp -R build higgs-shop-sample-app
tar -zcvf dist/higgs-shop-sample-app.tar.gz higgs-shop-sample-app
rm -rf build
rm -rf higgs-shop-sample-app
git add dist/higgs-shop-sample-app -f
git commit -m 'chore(build): Generate latest assets [skip ci]'