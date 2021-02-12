const pg = require('../../database/pg')
module.exports = {
  OverUnderFT: (req, res) => {
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
          count(case when ("for"+"concede") > 0 then 1 end) as "Over 0.5",
          count(case when ("for"+"concede") > 1 then 1 end) as "Over 1.5",
          count(case when ("for"+"concede") > 2 then 1 end) as "Over 2.5",
          count(case when ("for"+"concede") > 3 then 1 end) as "Over 3.5",          
          count(case when ("for"+"concede") < 1 then 1 end) as "Under 0.5",
          count(case when ("for"+"concede") < 2 then 1 end) as "Under 1.5",
          count(case when ("for"+"concede") < 3 then 1 end) as "Under 2.5",
          count(case when ("for"+"concede") < 4 then 1 end) as "Under 3.5"          
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

  latestOverUnderFT: (req, res) => {
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
        count(case when ("for"+"concede") > 0 then 1 end) as "Over 0.5",
        count(case when ("for"+"concede") > 1 then 1 end) as "Over 1.5",
        count(case when ("for"+"concede") > 2 then 1 end) as "Over 2.5",
        count(case when ("for"+"concede") > 3 then 1 end) as "Over 3.5",          
        count(case when ("for"+"concede") < 1 then 1 end) as "Under 0.5",
        count(case when ("for"+"concede") < 2 then 1 end) as "Under 1.5",
        count(case when ("for"+"concede") < 3 then 1 end) as "Under 2.5",
        count(case when ("for"+"concede") < 4 then 1 end) as "Under 3.5"
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

  OverUnderHT: (req, res) => {
    const query = {
      text: `WITH geral as (
        SELECT team_home as "team", home_ht as "for", away_ht as "concede"        
        FROM "seriea_ita"
        union all
        SELECT team_away, away_ht, home_ht
        FROM "seriea_ita"
      ) 
        SELECT "team", 
          count('team') as "game",
          count(case when ("for"+"concede") > 0 then 1 end) as "Over 0.5",
          count(case when ("for"+"concede") > 1 then 1 end) as "Over 1.5",
          count(case when ("for"+"concede") > 2 then 1 end) as "Over 2.5",
          count(case when ("for"+"concede") > 3 then 1 end) as "Over 3.5",          
          count(case when ("for"+"concede") < 1 then 1 end) as "Under 0.5",
          count(case when ("for"+"concede") < 2 then 1 end) as "Under 1.5",
          count(case when ("for"+"concede") < 3 then 1 end) as "Under 2.5",
          count(case when ("for"+"concede") < 4 then 1 end) as "Under 3.5"          
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

  latestOverUnderHT: (req, res) => {
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
        count(case when ("for"+"concede") > 0 then 1 end) as "Over 0.5",
        count(case when ("for"+"concede") > 1 then 1 end) as "Over 1.5",
        count(case when ("for"+"concede") > 2 then 1 end) as "Over 2.5",
        count(case when ("for"+"concede") > 3 then 1 end) as "Over 3.5",          
        count(case when ("for"+"concede") < 1 then 1 end) as "Under 0.5",
        count(case when ("for"+"concede") < 2 then 1 end) as "Under 1.5",
        count(case when ("for"+"concede") < 3 then 1 end) as "Under 2.5",
        count(case when ("for"+"concede") < 4 then 1 end) as "Under 3.5"
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