# dr-tis-assignment

This is a RESTful API with CRUD operation for `products` and `sales` collections.

- [Environment Variables](#environment-variables)
- [Run with docker-compose](#run-with-docker-compose)
- [Run mannually](#run-manually-(development))
- [Scripts](#scripts)
# Environment Variables
- **NODE_ENV** - defaults to `local`
- **PORT** - defaults to `8080`
- **MONGO_URL** - default to `mongodb://localhost/dr-tis`

# Run with docker-compose
```bash
git clone git@github.com:thiagoloddi/dr-tis-assignment.git
cd dr-tis-assignment
docker-compose up --build
```

# Run manually (development)

## Install
```bash
git clone git@github.com:thiagoloddi/dr-tis-assignment.git
cd dr-tis-assignment
npm install
```

## Run

1. Run MongoDB
```bash
sudo service mongod start # linux
sudo mongod # mac
```

2. Run project
```bash
npm start
# or, for watch mode:
npm run dev
```

# Scripts
Run this command to run a script that populates the database with 10 fake products:
```bash
npm run populate
```