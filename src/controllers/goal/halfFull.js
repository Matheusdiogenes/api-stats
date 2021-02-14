const pg = require('../../database/pg')
module.exports = {
  // FULL  
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
          "team",
          count('team') as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for",
          round(avg("concede"), 2) as "avg_concede",
          round(avg("for"+ "concede"), 2) as "avg_total"
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

  fullTimeHome: (req, res) => {
    const query = {
      text: `SELECT team_home,
              count(team_home) as "game",
              count(case when home_ft > away_ft then 1 end) as "win",
              count(case when home_ft = away_ft then 1 end) as "draw",
              count(case when home_ft < away_ft then 1 end) as "loss",
              round(avg(home_ft), 2) as "avg_for",
              round(avg(away_ft), 2) as "avg_concede",
              round(avg(home_ft+ away_ft), 2) as "avg_total"
            FROM "seriea_ita"
            GROUP BY team_home order by team_home
       `
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  fullTimeAway: (req, res) => {
    const query = {
      text: `SELECT team_away,
              count(team_away) as "game",
              count(case when away_ft > home_ft then 1 end) as "win",
              count(case when away_ft = home_ft then 1 end) as "draw",
              count(case when away_ft < home_ft then 1 end) as "loss",
              round(avg(home_ft), 2) as "avg_for",
              round(avg(away_ft), 2) as "avg_concede",
              round(avg(home_ft+ away_ft), 2) as "avg_total"
            FROM "seriea_ita"
            GROUP BY team_away order by team_away
       `
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  latestFullHome: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `
      WITH geral as (
        SELECT game_date, team_home, home_ft, away_ft
          FROM "seriea_ita" WHERE lower(team_home) = $1        
      ) 
        SELECT
          team_home,
          count(team_home) as "game",
          count(case when home_ft > away_ft then 1 end) as "win",
          count(case when home_ft = away_ft then 1 end) as "draw",
          count(case when home_ft < away_ft then 1 end) as "loss",
          round(avg(home_ft ), 2) as "avg_for",
          round(avg(away_ft), 2) as "avg_concede",
          round(avg(home_ft + away_ft), 2) as "avg_total"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
        GROUP BY team_home`,
      values: [team, game]
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  latestFullAway: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `
      WITH geral as (
        SELECT game_date, team_home, home_ft, away_ft
          FROM "seriea_ita" WHERE lower(team_home) = $1        
      ) 
        SELECT
          team_home,
          count(team_home) as "game",
          count(case when away_ft > home_ft then 1 end) as "win",
          count(case when away_ft = home_ft then 1 end) as "draw",
          count(case when away_ft < home_ft then 1 end) as "loss",
          round(avg(away_ft), 2) as "avg_for",
          round(avg(home_ft), 2) as "avg_concede",
          round(avg(home_ft + away_ft), 2) as "avg_total"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
        GROUP BY team_home`,
      values: [team, game]
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },
  //HALF

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
          "team",
          count('team') as "game",
          count(case when "for" > "concede" then 1 end) as "win",
          count(case when "for" = "concede" then 1 end) as "draw",
          count(case when "for" < "concede" then 1 end) as "loss",
          round(avg("for"), 2) as "avg_for",
          round(avg("concede"), 2) as "avg_concede",
          round(avg("for"+ "concede"), 2) as "avg_total"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
        GROUP BY "team"
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

  homeHT: (req, res) => {
    const query = {
      text: `SELECT team_home,
              count(team_home) as "game",
              count(case when home_ht > away_ht then 1 end) as "win",
              count(case when home_ht = away_ht then 1 end) as "draw",
              count(case when home_ht < away_ht then 1 end) as "loss",
              round(avg(home_ht), 2) as "avg_for",
              round(avg(away_ht), 2) as "avg_concede",
              round(avg(home_ht+ away_ht), 2) as "avg_total"
            FROM "seriea_ita"
            GROUP BY team_home order by team_home
       `
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  latestHomeHT: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `
      WITH geral as (
        SELECT game_date, team_home, home_ht, away_ht
          FROM "seriea_ita" WHERE lower(team_home) = $1        
      ) 
        SELECT
          team_home,
          count(team_home) as "game",
          count(case when home_ht > away_ht then 1 end) as "win",
          count(case when home_ht = away_ht then 1 end) as "draw",
          count(case when home_ht < away_ht then 1 end) as "loss",
          round(avg(home_ht ), 2) as "avg_for",
          round(avg(away_ht), 2) as "avg_concede",
          round(avg(home_ht + away_ht), 2) as "avg_total"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
        GROUP BY team_home`,
      values: [team, game]
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  awayHT: (req, res) => {
    const query = {
      text: `SELECT team_away,
              count(team_away) as "game",
              count(case when away_ht > home_ht then 1 end) as "win",
              count(case when away_ht = home_ht then 1 end) as "draw",
              count(case when away_ht < home_ht then 1 end) as "loss",
              round(avg(away_ht), 2) as "avg_for",
              round(avg(home_ht), 2) as "avg_concede",
              round(avg(home_ht + away_ht), 2) as "avg_total"
            FROM "seriea_ita"
            GROUP BY team_away order by team_away
       `
    } 
    pg.pool.query(query, (err, result) => {
      if(err) {
        throw err
      }     
      res.status(200).json(result.rows)
    })  
  },

  latestAwayHT: (req, res) => {
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const game = req.params['latest']
    const query = {
      text: `
      WITH geral as (
        SELECT game_date, team_away, home_ht, away_ht
          FROM "seriea_ita" WHERE lower(team_away) = $1        
      ) 
        SELECT
          team_away,
          count(team_away) as "game",
          count(case when away_ht > home_ht then 1 end) as "win",
          count(case when away_ht = home_ht then 1 end) as "draw",
          count(case when away_ht < home_ht then 1 end) as "loss",
          round(avg(away_ht ), 2) as "avg_for",
          round(avg(home_ht), 2) as "avg_concede",
          round(avg(home_ht + away_ht), 2) as "avg_total"
        FROM geral
        WHERE game_date in (SELECT game_date FROM geral order by game_date desc LIMIT $2 )
        GROUP BY team_away`,
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