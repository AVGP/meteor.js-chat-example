var Rooms = new Meteor.Collection("rooms");
var Messages = new Meteor.Collection("messages");

Template.rooms.events = {
    "click #addRoom": function () {
        var roomName = window.prompt("Name for the new name", "My room");
        if(roomName != "") {
            Rooms.insert({"name": roomName});
        }
    }
};

Template.main.currentRoom = function() {
    return Session.get("room") || false;
}

Template.rooms.availableRooms = function () {
    return Rooms.find({});
};

Template.roomItem.events = {
    "click a.enter": function () {
        if(Session.get("name") === undefined) {
            var name = window.prompt("Your name", "Anonymous Coward");
            if(name === "") name = "Jerky";
            Session.set("name", name);
        }
        Session.set("room", this._id);
    }
};

Template.room.roomName = function() {
     var room = Rooms.findOne({_id: Session.get("room")});
     return room && room.name ;
};

Template.room.messages = function() {
    return Messages.find({room: Session.get("room")});
};

Template.room.events = {
    "click #leave": function() {
        if(!window.confirm("Leave this room", "Do you really want to leave?")) return;
        Session.set("room", undefined);
    },
    "submit": function() {
        Messages.insert({
            "room": Session.get("room"),
            "author": Session.get("name"),
            "text": $("#msg").val()
        });
        $("#msg").val("");
    }
};
