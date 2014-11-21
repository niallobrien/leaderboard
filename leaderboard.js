PlayersList = new Meteor.Collection('players');

if (Meteor.isClient) {

    Meteor.subscribe('thePlayers');

    Template.leaderboard.helpers({
        players: function() {
            var currentUserId = Meteor.userId();
            return PlayersList.find({}, {sort: {score: -1, name: 1}});
        },

        // Add selected class to selected player
        selectedClass: function() {
            var playerId = this._id;
            var selectedPlayer = Session.get('selectedPlayer');
            if (selectedPlayer === playerId) {
                return 'selected';
            }
        },

        showSelectedPlayer: function() {
            var selectedPlayer = Session.get('selectedPlayer');
            return PlayersList.findOne(selectedPlayer);
        }

    });


    Template.leaderboard.events({
        'click li.player': function() {
            var playerId = this._id;
            Session.set('selectedPlayer', playerId);
            var selectedPlayer = Session.get('selectedPlayer');
            console.log(selectedPlayer);
        },
        'click #increment': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer, 5);
        },
        'click #decrement': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('modifyPlayerScore', selectedPlayer, -5);
        },
        'click #remove': function() {
            var selectedPlayer = Session.get('selectedPlayer');
            Meteor.call('removePlayer', selectedPlayer);
        }
    });

    Template.addPlayerForm.events({
        'submit form': function(e, template) {
            e.preventDefault();
            var playerNameVar = template.find('#playerName').value;
            if (playerNameVar === '') {
                return;
            }
            // reset form
            $('#playerName').val('');
            Meteor.call('insertPlayer', playerNameVar);
        }
    });

}

if (Meteor.isServer){
    Meteor.publish('thePlayers', function() {
        var currentUserId = this.userId;
        return PlayersList.find({createdBy: currentUserId});
    });

    Meteor.methods({
        'insertPlayer': function(playerNameVar) {
            var currentUserId = this.userId;
            PlayersList.insert({
                name: playerNameVar,
                score: 0,
                createdBy: currentUserId
            });

            console.log('Hi');
        },
        'removePlayer': function(selectedPlayer) {
            PlayersList.remove(selectedPlayer);
        },
        'modifyPlayerScore': function(selectedPlayer, scoreValue) {
            PlayersList.update( {_id: selectedPlayer}, {$inc: {score: scoreValue}} );
        }
    });
}
