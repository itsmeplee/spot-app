# Prisma ORM and DB Setup
Database for local with prisma

Stand up by #docker-compose up#

Then prisma schema must be deployed on DB, move into the users directory and services/users/database
DEFINE A NEW PRISMA SECRET in the prisma.yml file or as an Environment variable. THis should keep your instance safe.

*TO DEFINE AN ENV VARIABLE* 
define the env variables using export PRISMA_SECRET etc (ADD MORE DOCUMENTATION HERE REGARDING WHICH VARIABLES ARE NEEDED);
then prisma deploy

Once you've spun up the local prisma, also remember to run 'prisma token' to get an auth token with your prisma secret to connect to the playground. 
WHen you have that token, add it to the playground using HEADERS:
{
  "Authorization": "Bearer \[token\]"
}
Now you should be able to connect using the playground

docker exec -it users-service sh

lsof -i for all the ports,  I had an issue where the port was already occupied

