function updateRankings(client) {
  const queryVars = {
    isWorker: true
  };
  const queryRankings = `
    {
      getRankingInfo {
        user_id
        cancelCount
        noShowCount
        successCount
      }
    }
  `;

  const mutationQuery = `($isWorker: Boolean, $userid: String, $rating: String){
    updateUserRanking: updateUserRanking(isWorker: $isWorker, userid: $userid, rating: $rating) {
        id
        rating
        user_name
    }
  }`;

  var rankings = Object.freeze({'red' : 1, 'yellow' : 2, 'green' : 3});

  client.query(queryRankings, queryVars)
    .then(userRankings => {
    
      userRankings.getRankingInfo.map(userRanking => {

        let userRank = rankings['green'];
        // get all users
        // update user ranking based off algorithm
        let user_id = userRanking.user_id;
        let cancelCount = userRanking.cancelCount;
        let noShowCount = userRanking.noShowCount;
        let successCount = userRanking.successCount;

        if(cancelCount !== 0 || noShowCount !== 0){
          //bring down ranking
          if ( successCount < (noShowCount + cancelCount)) {
            userRank = rankings['red'];
          }
          if( successCount <= cancelCount || successCount <= noShowCount ){
            userRank = rankings['yellow'];
          }
        }

        const mutationVars = {
          isWorker: true,
          userid: user_id,
          rating: userRank
        };

        client.mutate(mutationQuery, mutationVars).then(resp => {
          console.log('Rank updated to : ' + userRank + ' for ' + resp.updateUserRanking.user_name + '.');
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = { updateRankings };
