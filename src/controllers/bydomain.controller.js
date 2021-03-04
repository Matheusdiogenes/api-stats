const pg = require('../database/pg')

module.exports = {  
  full: async (req, res) => {
    const table = req.params['leagueID'].replace('-', '_').toLowerCase()
    const domain = req.params['domain'].toLowerCase()
    const op = {
      "home": ['team_home', 'home_ft', 'away_ft', 'home_ht', 'away_ht'],
      "away": ['team_away','away_ft', 'home_ft',  'away_ht', 'home_ht']
    }
    const result = await pg.pool.query({        
      text: `SELECT ${op[domain][0]} AS "team", 
                COUNT(${op[domain][0]}) AS "g",
                COUNT(CASE WHEN ${op[domain][1]} > ${op[domain][2]} THEN 1 END) AS "w", 
                COUNT(CASE WHEN ${op[domain][1]} = ${op[domain][2]} THEN 1 END) AS "d", 
                COUNT(CASE WHEN ${op[domain][1]} < ${op[domain][2]} THEN 1 END) AS "l", 
                SUM(${op[domain][1]}) AS "at",
                SUM(${op[domain][2]}) AS "de", 
                ROUND(AVG(${op[domain][1]}), 1) AS "av. at", 
                ROUND(AVG(${op[domain][2]}), 1) AS "av. de",
                ROUND(AVG(${op[domain][1]} + ${op[domain][2]}), 1) AS "av"
            FROM "${table}" GROUP BY ${op[domain][0]} ORDER BY "team"`
    })
    res.status(200).json(result.rows)
  },

}
