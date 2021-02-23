const pg = require('../database/pg')

module.exports = {
  goal: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const result = await pg.pool.query({        
      text: `WITH goals AS (
        SELECT game_date, team_home AS "TEAM", home_ft AS "ATTACK", away_ft AS "DEFENSE", home_ht AS "ATTACK HT", away_ht AS "DEFENSE HT"
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht
        FROM "${table}"
        )
        SELECT "TEAM",
          COUNT("TEAM") AS "MATCHE(S)",
          COUNT(CASE WHEN "ATTACK" > "DEFENSE" THEN 1 END) AS "WIN", 
          COUNT(CASE WHEN "ATTACK" = "DEFENSE" THEN 1 END) AS "DRAW", 
          COUNT(CASE WHEN "ATTACK" < "DEFENSE" THEN 1 END) AS "LOSS", 
          SUM("ATTACK") AS "ATTACK",
          SUM("DEFENSE") AS "DEFENSE",
          ROUND(AVG("ATTACK"), 1) AS "GOALS SCORED",
          ROUND(AVG("DEFENSE"), 1) AS "GOALS AGAINST",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") > 2 THEN 1 END) AS "OVER 2.5",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") < 3 THEN 1 END) AS "UNDER 2.5",
          COUNT(CASE WHEN ("ATTACK HT" + "DEFENSE HT") > 0 THEN 1 END) AS "OVER 0.5 HALFTIME",
          COUNT(CASE WHEN "ATTACK" > 0 and "DEFENSE" > 0 THEN 1 END) AS "BOTH TEAMS TO SCORE"
        FROM goals  
        GROUP BY "TEAM" ORDER BY "TEAM";
      `
    })    
    res.status(200).json(result.rows)
  },

  goalTeam: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const matche = req.params['matche']
    const result = await pg.pool.query({        
      text: `WITH goals AS (
        SELECT game_date, team_home AS "TEAM", home_ft AS "ATTACK", away_ft AS "DEFENSE", home_ht AS "ATTACK HT", away_ht AS "DEFENSE HT"
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht
        FROM "${table}"
      )
        SELECT "TEAM",
          COUNT("TEAM") AS "MATCHE(S)",
          COUNT(CASE WHEN "ATTACK" > "DEFENSE" THEN 1 END) AS "WIN", 
          COUNT(CASE WHEN "ATTACK" = "DEFENSE" THEN 1 END) AS "DRAW", 
          COUNT(CASE WHEN "ATTACK" < "DEFENSE" THEN 1 END) AS "LOSS", 
          SUM("ATTACK") AS "ATTACK",
          SUM("DEFENSE") AS "DEFENSE",
          ROUND(AVG("ATTACK"), 1) AS "GOALS SCORED",
          ROUND(AVG("DEFENSE"), 1) AS "GOALS AGAINST",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") > 2 THEN 1 END) AS "OVER 2.5",
          COUNT(CASE WHEN ("ATTACK" + "DEFENSE") < 3 THEN 1 END) AS "UNDER 2.5",
          COUNT(CASE WHEN ("ATTACK HT" + "DEFENSE HT") > 0 THEN 1 END) AS "OVER 0.5 HALFTIME",
          COUNT(CASE WHEN "ATTACK" > 0 and "DEFENSE" > 0 THEN 1 END) AS "BOTH TEAMS TO SCORE"
        FROM goals
        WHERE LOWER("TEAM") = '${team}' 
          AND game_date IN (SELECT game_date FROM goals WHERE LOWER("TEAM") = '${team}' ORDER BY game_date DESC LIMIT ${matche})
        GROUP BY "TEAM";      
      `
    })    
    res.status(200).json(result.rows)
  },

  corner: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const result = await pg.pool.query({        
      text: `WITH corners AS (
        SELECT game_date, team_home AS "TEAM", corners_home_ft AS "FOR", corners_away_ft AS "AGAINST",
          corners_home_ht AS "FOR HT", corners_away_ht AS "AGAINST HT"
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, corners_away_ft, corners_home_ft, corners_away_ht, corners_home_ht
        FROM "${table}"
        )
        SELECT "TEAM",
          COUNT("TEAM") AS "MATCHE(S)",    
          ROUND(AVG("FOR"), 1) AS "CORNERS SCORED",
          ROUND(AVG("AGAINST"), 1) AS "CORNERS AGAINST",
          ROUND(AVG("FOR HT"), 1) AS "CORNERS SCORED HALFTIME",
          ROUND(AVG("AGAINST HT"), 1) AS "CORNERS AGAINST HALFTIME",
          ROUND(AVG("AGAINST HT" + "FOR HT"), 1) AS "AVERAGE HALFTIME",
          ROUND(AVG("AGAINST" + "FOR"), 1) AS "AVERAGE TOTAL",
          COUNT(CASE WHEN ("FOR HT" + "AGAINST HT") > 3 THEN 1 END) AS "OVER 3.5 HALFTIME",
          COUNT(CASE WHEN ("FOR" + "AGAINST") > 9 THEN 1 END) AS "OVER 9.5",
          COUNT(CASE WHEN ("FOR" + "AGAINST") > 10 THEN 1 END) AS "OVER 10.5"
        FROM corners  
        GROUP BY "TEAM" ORDER BY "TEAM";
      `
    })    
    res.status(200).json(result.rows)
  },
  cornerTeam: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()    
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const matche = req.params['matche']
    const result = await pg.pool.query({        
      text: `WITH corners AS (
        SELECT game_date, team_home AS "TEAM", corners_home_ft AS "FOR", corners_away_ft AS "AGAINST",
          corners_home_ht AS "FOR HT", corners_away_ht AS "AGAINST HT"
        FROM "${table}"
        UNION ALL
        SELECT game_date, team_away, corners_away_ft, corners_home_ft, corners_away_ht, corners_home_ht
        FROM "${table}"
        )
        SELECT "TEAM",
          COUNT("TEAM") AS "MATCHE(S)",    
          ROUND(AVG("FOR"), 1) AS "CORNERS SCORED",
          ROUND(AVG("AGAINST"), 1) AS "CORNERS AGAINST",
          ROUND(AVG("FOR HT"), 1) AS "CORNERS SCORED HALFTIME",
          ROUND(AVG("AGAINST HT"), 1) AS "CORNERS AGAINST HALFTIME",
          ROUND(AVG("AGAINST HT" + "FOR HT"), 1) AS "AVERAGE HALFTIME",
          ROUND(AVG("AGAINST" + "FOR"), 1) AS "AVERAGE TOTAL",
          COUNT(CASE WHEN ("FOR HT" + "AGAINST HT") > 3 THEN 1 END) AS "OVER 3.5 HALFTIME",
          COUNT(CASE WHEN ("FOR" + "AGAINST") > 9 THEN 1 END) AS "OVER 9.5",
          COUNT(CASE WHEN ("FOR" + "AGAINST") > 10 THEN 1 END) AS "OVER 10.5"
        FROM corners  
        WHERE LOWER("TEAM") = '${team}' AND 
          game_date IN (SELECT game_date FROM corners WHERE LOWER("TEAM") = '${team}' ORDER BY game_date DESC LIMIT ${matche})        
        GROUP BY "TEAM" ORDER BY "TEAM";
      `
    })    
    res.status(200).json(result.rows)
  },



}