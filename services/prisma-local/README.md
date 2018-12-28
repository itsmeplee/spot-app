# main_server
Database for local with prisma

Stand up by #docker-compose up#

Then prisma schema must be deployed on DB, move into the users directory and services/users/database
DEFINE A NEW PRISMA SECRET in the prisma.yml file. THis should keep your instance safe.


define the env variables using export PRISMA_SECRET etc (ADD MORE DOCUMENTATION HERE REGARDING WHICH VARIABLES ARE NEEDED);
then prisma deploy
then can start connecting


Once you've spun up the local prisma, alos remember to run 'prisma token' to get an auth token with your prisma secret to connect to the playground. 
WHen you have that token, add it to the playground using HEADERS:
{
  "Authorization": "Bearer \[token\]"
}
Now you should be able to connect using the 