Template.checklist.items = function(){
  return checklists.find();
}

var okCancel = function(selector, callbacks){
  var ok = callbacks.ok || function(){}
  var cancel = callbacks.cancel || function() {}

  events = {};
  
  events['keyup ' + selector + ', focusout ' + selector + ', keydown ' + selector] = function(e){
    if (e.type === 'keydown' && e.which === 27){
      cancel.call(this, e);
    }
    else if ((e.type === 'keyup' && e.which === 13) || e.type === 'focusout'){
      var val = String(e.target.value || '');
      if (val)
        ok.call(this, val, e);
      else
        cancel.call(this, e);
    }
  }

  return events;
}
Template.checklist.events({
  'change input[type=checkbox].checkbox' : function () {
    checklists.update({_id: this._id}, {$set: {completed: !this.completed}});
  },
  'click #add_checkbox': function(e, t){
    Session.set('adding_checkbox', true);
  }
});
Template.item.events({
  'click .edit-checkbox': function(e, t){
    Session.set('editing_title', e.target.id);
    Meteor.flush();
    t.find('#editing_title').focus();
  }
});

Template.item.editing_title = function(){
  if (Session.get('editing_title') != null &&
      !Session.equals('editing_title', null)){
    return Session.equals('editing_title', this._id);
  }
  return false;
}

Template.checklist.events(okCancel(
  '#new_checkbox_name',
  {
    ok: function(val, t){
      checklists.insert({title: val, sublist: [], completed: false});
      Session.set('adding_checkbox', false);
    },
    cancel: function(){
      Session.set('adding_checkbox', false);
    }
  }
));

Template.item.events(okCancel(
  '#editing_title',
  {
    ok: function(val, evt){
      checklists.update({_id: Session.get('editing_title')}, {$set: {title: val}});
      Session.set('editing_title', false);
    },
    cancel: function(evt){
      Session.set('editing_title', false);
    }
  }
));


Template.checklist.adding_checkbox = function(){
  return Session.get('adding_checkbox');
}

Template.item.checked = function(){
  return this.completed ? 'checked' : ''
}
