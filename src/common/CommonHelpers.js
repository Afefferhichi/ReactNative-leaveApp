String.prototype.humanize = function(){
  return this.replace(/[^a-zA-Z0-9]/gi, ' ').capitalize();
};

String.prototype.capitalize = function(){
  var s = this.toLowerCase();
  return s[0].toUpperCase() + s.substr(1,10000);
};
