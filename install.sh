curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs
npm install --global yarn
yarn global add create-react-app
create-react-app lake
yarn add react-router
yarn add react-router-dom
yarn add react-redux
yarn add bootstrap
yarn add react-bootstrap
yarn add recharts

# prod depoly
yarn global add serve
serve -s /home/kun/github/lake/lake/build

cd lake
yarn install
yarn start
yarn build   // prod build
yarn test
yarn eject
yarn add module_name