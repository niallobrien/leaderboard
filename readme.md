# Leaderboard

Leaderboard is a simple MeteorJS example application. It features accounts & real-time data syncing.

  - Visit http://leaderboard-niall.meteor.com/ and create an account.
  - Create some users and give the varying points (click to select a player).
  - Open http://leaderboard-niall.meteor.com/ from another browser & log into the same account.
  - Watch the views in both browsers update in real-time as you change the scores in one of the browsers.

##### Download & Run
1. _git_ _clone_ _git@github.com:niallobrien/leaderboard.git_
2. _cd_ _leaderboard_
3. meteor
4. http://localhost:3000
 
The default Autopublish & Insecure packages have been removed, so the client cannot modify the database from the browser. Instead the client calls server-side methods which perform these operations.

Enjoy.
