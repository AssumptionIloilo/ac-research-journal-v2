# Colors
NO_FORMAT="\033[0m"
F_BOLD="\033[1m"
C_GREEN="\033[38;5;40m"

LOCAL_DB="mongodb://127.0.0.1/"
CONTAINER_NAME=ac_research_journal_mongodb

# load the environment variables.
source .env

printf "${F_BOLD}${C_GREEN}Dumping the Atlas Database...${NO_FORMAT}\n"
docker exec $CONTAINER_NAME mongodump --uri "$DATABASE_URL_REMOTE"

printf "\n${F_BOLD}${C_GREEN}Dropping the Local Database...${NO_FORMAT}\n"
docker exec $CONTAINER_NAME mongosh $LOCAL_DB --eval "db.dropDatabase()"
printf "\n${F_BOLD}${C_GREEN}Restoring the Dump to Local...${NO_FORMAT}\n"
docker exec $CONTAINER_NAME mongorestore --uri="$LOCAL_DB" dump/

printf "\n${F_BOLD}${C_GREEN}✨ DONE CLONING! ✨${NO_FORMAT}\n"
