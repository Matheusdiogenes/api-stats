const pg = require('../../database/pg')
module.exports = {
  fullTime: (req, res) => {
    const query = {
      text: `WITH geral as (
        SELECT team_home as "team", home_ft as "for", away_ft as "concede"        
        FROM "seriea_ita"
        union all
        SELECT team_away, away_ft, home_ft
        FROM "seriea_ita"
      ) 
        SELECT "team", 
          count('team') as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for",
          round(avg("concede"), 2) as "avg_concede",
          round(avg("for"+ "concede"), 2) as "avg_total"
          
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

  latestFT: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `WITH geral as (
        SELECT game_date, team_home as "team", home_ft as "for", away_ft as "concede"
        FROM "seriea_ita" WHERE lower(team_home) = $1
        union all
        SELECT game_date, team_away, away_ft, home_ft
        FROM "seriea_ita" WHERE lower(team_away) = $1
      ) 
        SELECT
          count('team') as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for",
          round(avg("concede"), 2) as "avg_concede",
          round(avg("for"+ "concede"), 2) as "avg_total"
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
  },

  halftime: (req, res) => {
    const query = {
      text: `WITH geral as (
        SELECT game_date, team_home as "team", home_ht as "for", away_ht as "concede"
        FROM "seriea_ita"
        union all
        SELECT game_date, team_away, away_ht, home_ht
        FROM "seriea_ita"
      ) 
        SELECT
          "team",
          count('team') as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for",
          round(avg("concede"), 2) as "avg_concede",
          round(avg("for"+ "concede"), 2) as "avg_total"
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

  latestHT: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']

    const query = {
      text: `WITH geral as (
        SELECT game_date, team_home as "team", home_ht as "for", away_ht as "concede"
        FROM "seriea_ita" WHERE lower(team_home) = $1
        union all
        SELECT game_date, team_away, away_ht, home_ht
        FROM "seriea_ita" WHERE lower(team_away) = $1
      ) 
        SELECT
          count('team') as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for",
          round(avg("concede"), 2) as "avg_concede",
          round(avg("for"+ "concede"), 2) as "avg_total"
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