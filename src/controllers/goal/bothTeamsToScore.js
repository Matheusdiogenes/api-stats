const pg = require('../../database/pg')
module.exports = {
  btts: (req, res) => {
    const query = {
      text: `WITH geral as (
        SELECT team_home as "team", home_ft as "for", away_ft as "concede", home_ht as "forHT", away_ht as "concedeHT"
        FROM "seriea_ita"
        union all
        SELECT team_away, away_ft, home_ft, home_ht, away_ht
        FROM "seriea_ita"
      ) 
        SELECT "team", 
          count('team') as "game",
          count(case when "for" > 0 and "concede" > 0 then 1 end) as "BTTS_FullTime",
          count(case when "forHT" > 0 and "concedeHT" > 0 then 1 end) as "BTTS_HalfTime"
        FROM geral 
        GROUP BY "team" ORDER BY "team" 
       `
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  latestBtts: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `WITH geral as (
        SELECT game_date, team_home as "team", home_ft as "for", away_ft as "concede", home_ht as "forHT", away_ht as "concedeHT"
        FROM "seriea_ita" WHERE lower(team_home) = $1
        union all
        SELECT game_date, team_away, away_ft, home_ft, home_ht, away_ht
        FROM "seriea_ita" WHERE lower(team_away) = $1
      ) 
        SELECT
          count('team') as "game",
          count(case when "for" > 0 and "concede" > 0 then 1 end) as "BTTS_FullTime",
          count(case when "forHT" > 0 and "concedeHT" > 0 then 1 end) as "BTTS_HalfTime"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
      `,
      values: [team, game]
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  }


}