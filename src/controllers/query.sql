WITH geral AS (
        SELECT game_date, team_home AS "TEAM", corners_home_ft,
        corners_away_ft, corners_home_ht, corners_away_ht
        FROM "ita_sa"
        UNION ALL 
        SELECT game_date, team_away AS "TEAM", corners_home_ft,
        corners_away_ft, corners_home_ht, corners_away_ht
        FROM "ita_sa"
)
SELECT 
        "TEAM",
        count("TEAM") as "MATCHES",
        round(avg(corners_home_ft), 2) as "FOR FULLTIME", 
        round(avg(corners_away_ft), 2) AS "CONCEDE FULLTIME", 
        round(avg(corners_home_ht), 2) AS "FOR HALFTIME", 
        round(avg(corners_away_ht), 2) AS "CONCEDE HALFTIME"
FROM geral WHERE "TEAM" = 'AC Milan' 
        AND game_date in (SELECT game_date FROM geral where "TEAM" = 'AC Milan' order by game_date desc LIMIT 5)
GROUP BY "TEAM"


WITH geral as (
        SELECT game_date, team_home as "team", home_ft as "for", away_ft as "concede", home_ht as "forHT", away_ht as "concedeHT"        
        FROM "ita_sa" WHERE lower(team_home) = 'juventus'
        union all
        SELECT game_date, team_away, away_ft, home_ft, away_ht, home_ht         
        FROM "ita_sa" WHERE lower(team_home) = 'juventus'
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
        WHERE lower("team") = 'juventus' 
                and game_date in (SELECT game_date FROM geral where lower("team") = 'juventus' order by game_date desc LIMIT 6 ) 
        GROUP BY "team"        
        


WITH geral AS (
        SELECT game_date, team_home AS "TEAM", corners_home_ft as "for",
        corners_away_ft as "against", corners_home_ht as "forht", corners_away_ht as "againstht"
        FROM "ita_sa" WHERE lower(team_home) = 'juventus'
        UNION ALL
        SELECT game_date, team_away AS "TEAM", corners_away_ft, 
        corners_home_ft, corners_away_ht, corners_home_ht
        FROM "ita_sa" WHERE lower(team_home) = 'juventus'
      )
      SELECT 
              "TEAM",
              count("TEAM") as "MATCHE(S)",
              round(avg("for"), 2) as "FOR (FULLTIME)", 
              round(avg("against"), 2) AS "AGAINST (FULLTIME)", 
              round(avg("forht"), 2) AS "FOR (HALFTIME)", 
              round(avg("againstht"), 2) AS "AGAINST (HALFTIME)"
      FROM geral WHERE "TEAM" = 'Juventus' AND game_date in (SELECT game_date FROM geral WHERE "TEAM" = 'Juventus' order by game_date desc LIMIT 5)
      GROUP BY "TEAM"

SELECT team_home, count(team_home)AS "matches", sum(home_ft) as "home ft", sum(away_ft) as "away ft", sum(home_ht) as "home ht", sum(away_ht) as "away ht"
FROM "ita_sa" GROUP BY team_home order by "home ft" desc