const pg = require('../database/pg')

module.exports = {  
  infoDomain: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const op = {
      "home": ['team_home', 'home_ft', 'away_ft', 'home_ht', 'away_ht'],
      "away": ['team_away','away_ft', 'home_ft',  'away_ht', 'home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "TEAM", 
                COUNT(${op[domain][0]}) AS "MATCHE(S)",                
                COUNT(CASE WHEN ${op[domain][1]} > ${op[domain][2]} THEN 1 END) AS "WIN", 
                COUNT(CASE WHEN ${op[domain][1]} = ${op[domain][2]} THEN 1 END) AS "DRAW", 
                COUNT(CASE WHEN ${op[domain][1]} < ${op[domain][2]} THEN 1 END) AS "LOSS", 
                SUM(${op[domain][1]}) AS "ATTACK", 
                SUM(${op[domain][2]}) AS "DEFENCE", 
                ROUND(AVG(${op[domain][1]}), 1) AS "AVERAGE ATTACK", 
                ROUND(AVG(${op[domain][2]}), 1) AS "AVERAGE DEFENCE", 
                ROUND(AVG(${op[domain][3]}), 1) AS "AVERAGE ATTACK (HALFTIME)", 
                ROUND(AVG(${op[domain][4]}), 1) AS "AVERAGE DEFENSE (HALFTIME)",
                COUNT(CASE WHEN (${op[domain][3]} + ${op[domain][4]}) > 0 THEN 1 END) AS "GAMES WITH OVER 0.5 HALFTIME",
                COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) > 1 THEN 1 END) AS "GAMES WITH OVER 1.5",
                COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) > 2 THEN 1 END) AS "GAMES WITH OVER 2.5",
                COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) < 2 THEN 1 END) AS "GAMES WITH UNDER 1.5",
                COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) < 3 THEN 1 END) AS "GAMES WITH UNDER 2.5",
                COUNT(CASE WHEN ${op[domain][1]} > 0 and ${op[domain][2]} > 0 THEN 1 END) AS "BOTH TEAMS TO SCORE"
            FROM "${table}" GROUP BY ${op[domain][0]} ORDER BY "WIN" DESC`
    })    
    res.status(200).json(result.rows)
  },
  
  defenseDomain: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const op = {
      "home": ['team_home', 'home_ft', 'away_ft', 'home_ht', 'away_ht'],
      "away": ['team_away','away_ft', 'home_ft',  'away_ht', 'home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "TEAM", 
              COUNT(${op[domain][0]}) AS "MATCHE(S)", 
              SUM(${op[domain][1]}) AS "ATTACK", 
              SUM(${op[domain][2]}) AS "DEFENSE", 
              SUM(${op[domain][3]}) AS "ATTACK HALFTIME", 
              SUM(${op[domain][4]}) AS "DEFENCE HALFTIME"
            FROM "${table}" GROUP BY ${op[domain][0]} ORDER BY "DEFENSE" DESC`
    })    
    res.status(200).json(result.rows)
  },

  attackDomain: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const op = {
      "home": ['team_home', 'home_ft', 'away_ft', 'home_ht', 'away_ht'],
      "away": ['team_away','away_ft', 'home_ft',  'away_ht', 'home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS 'TEAM', 
              COUNT(${op[domain][0]}) AS "MATCHE(S)", 
              SUM(${op[domain][1]}) AS "ATTACK", 
              SUM(${op[domain][2]}) AS "DEFENSE",
              SUM(${op[domain][3]}) AS "ATTACK HALFTIME", 
              SUM(${op[domain][4]}) AS "DEFENCE HALFTIME"
            FROM "${table}" GROUP BY ${op[domain][0]} ORDER BY "ATTACK" DESC`
    })    
    res.status(200).json(result.rows)
  },

  cornerDomain: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const op = {
      "home": ['team_home', 'corners_home_ft', 'corners_away_ft', 'corners_home_ht', 'corners_away_ht'],
      "away": ['team_away','corners_away_ft', 'corners_home_ft',  'corners_away_ht', 'corners_home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "TEAM", 
              COUNT(${op[domain][0]}) AS "MATCHE(S)", 
              ROUND(AVG(${op[domain][1]}), 1) AS "FOR", 
              ROUND(AVG(${op[domain][2]}), 1) AS "AGAINST", 
              ROUND(AVG(${op[domain][3]}), 1) AS "FOR HALFTIME", 
              ROUND(AVG(${op[domain][4]}), 1) AS "AGAINST HALFTIME",
              ROUND(AVG(${op[domain][1]} + ${op[domain][2]} ), 1) AS "AVERAGE PER GAME",
              COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) > 9 THEN 1 END) AS "GAMES WITH OVER 9.5",
              COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) > 10 THEN 1 END) AS "GAMES WITH OVER 10.5"
            FROM "${table}"            
            GROUP BY ${op[domain][0]} ORDER BY "AVERAGE PER GAME" DESC`
    })    
    res.status(200).json(result.rows)
  },  

  
  cornerDomainMatche: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const team = req.params['team'].replace('-', ' ').toLowerCase()
    const matche = req.params['matche']
    const op = {
      "home": ['team_home', 'corners_home_ft', 'corners_away_ft', 'corners_home_ht', 'corners_away_ht'],
      "away": ['team_away','corners_away_ft', 'corners_home_ft',  'corners_away_ht', 'corners_home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "TEAM", 
              COUNT(${op[domain][0]}) AS "MATCHE(S)", 
              ROUND(AVG(${op[domain][1]}), 1) AS "FOR", 
              ROUND(AVG(${op[domain][2]}), 1) AS "AGAINST", 
              ROUND(AVG(${op[domain][3]}), 1) AS "FOR HALFTIME", 
              ROUND(AVG(${op[domain][4]}), 1) AS "AGAINST HALFTIME",
              ROUND(AVG(${op[domain][1]} + ${op[domain][2]} ), 1) AS "AVERAGE TOTAL",
              COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) > 9 THEN 1 END) AS "OVER 9.5",
              COUNT(CASE WHEN (${op[domain][1]} + ${op[domain][2]}) > 10 THEN 1 END) AS "OVER 10.5"
            FROM "${table}"
            WHERE lower(${op[domain][0]}) = '${team}'
                  AND game_date in (SELECT game_date FROM ${table} 
                                    WHERE LOWER(${op[domain][0]}) = '${team}' 
                                    ORDER BY game_date DESC LIMIT ${matche} )
            GROUP BY ${op[domain][0]}`
    })    
    res.status(200).json(result.rows)
  },  

}
