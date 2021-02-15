const pg = require('../../database/pg')
module.exports = {

  info: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `
      WITH geral as (
        SELECT game_date, team_home as "team", home_ht as "forHT", away_ht as "concedeHT", home_ft as "for", away_ft as "concede"
        FROM "seriea_ita" WHERE lower(team_home) = $1
        union all
        SELECT game_date, team_away, away_ht, home_ht, away_ft, home_ft
        FROM "seriea_ita" WHERE lower(team_away) = $1
      )         
        SELECT "team",     
          count("team") as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "for", 
          round(avg("concede"), 2) as "concede", 
          round(avg("forHT"), 2) as "for_ht", 
          round(avg("concedeHT"), 2) as "concede_ht",
          count(case when ("forHT" + "concedeHT") > 0 then 1 end) as "Over 0,5 ht",
          count(case when ("for" + "concede") > 1 then 1 end) as "Over 1.5",
          count(case when ("for" + "concede") > 2 then 1 end) as "Over 2.5",
          count(case when ("for" + "concede") < 2 then 1 end) as "Under 1.5",
          count(case when ("for" + "concede") < 3 then 1 end) as "Under 2.5",
          count(case when "for" > 0 and "concede" > 0 then 1 end) as "Btts"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
        GROUP BY "team"`,
      values: [team, game]
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  compare: (req, res) => {
    const teamHome = req.params['teamHome'].replace('-', ' ').toLowerCase()
    const teamAway = req.params['teamAway'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `
      WITH geral as (
        SELECT game_date, team_home as "team", home_ft as "for", away_ft as "concede", home_ht as "forHT", away_ht as "concedeHT"        
        FROM "seriea_ita" WHERE lower(team_home) = $1
        union all
        SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht         
        FROM "seriea_ita" WHERE lower(team_away) = $2
      ) 
        SELECT "team",     
          count("team") as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "for", 
          round(avg("concede"), 2) as "concede", 
          round(avg("forHT"), 2) as "for_ht", 
          round(avg("concedeHT"), 2) as "concede_ht",
          count(case when ("forHT" + "concedeHT") > 0 then 1 end) as "Over 0,5 ht",
          count(case when ("for" + "concede") > 1 then 1 end) as "Over 1.5",
          count(case when ("for" + "concede") > 2 then 1 end) as "Over 2.5",
          count(case when ("for" + "concede") < 2 then 1 end) as "Under 1.5",
          count(case when ("for" + "concede") < 3 then 1 end) as "Under 2.5",
          count(case when "for" > 0 and "concede" > 0 then 1 end) as "Btts"
        FROM geral 
        WHERE lower("team") = $1 and game_date in (SELECT game_date FROM geral where lower("team") = $1 order by game_date desc LIMIT $3 ) 
        GROUP BY "team"
        union
        SELECT "team",     
          count("team") as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "for", 
          round(avg("concede"), 2) as "concede", 
          round(avg("forHT"), 2) as "for_ht", 
          round(avg("concedeHT"), 2) as "concede_ht",
          count(case when ("forHT" + "concedeHT") > 0 then 1 end) as "Over 0,5 ht",
          count(case when ("for" + "concede") > 1 then 1 end) as "Over 1.5",
          count(case when ("for" + "concede") > 2 then 1 end) as "Over 2.5",
          count(case when ("for" + "concede") < 2 then 1 end) as "Under 1.5",
          count(case when ("for" + "concede") < 3 then 1 end) as "Under 2.5",
          count(case when "for" > 0 and "concede" > 0 then 1 end) as "Btts"
        FROM geral 
        WHERE lower("team") = $2 and game_date in (SELECT game_date FROM geral where lower("team") = $2 order by game_date desc LIMIT $3 ) 
        GROUP BY "team"`,
      values: [teamHome, teamAway, game]
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  teams: (req, res) => {
    const query = {
      text: `
      WITH geral as (
        SELECT team_home as "team"
        FROM "seriea_ita" 
        union all
        SELECT team_away
        FROM "seriea_ita" 
      )         
        SELECT "team" FROM geral
        GROUP BY "team"
        ORDER BY "team"
      `
    }
    pg.pool.query(query, (err, result) => {
      if(err) throw err;
      res.status(200).json(result.rows)
    })
  }


}