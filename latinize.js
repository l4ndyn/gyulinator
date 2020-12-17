const Latinise = {}; Latinise.latin_map = {'á':'a', 'é':'e', 'í':'i', 'ó':'o', 'ö':'o', 'ő':'o', 'ú':'u', 'ü':'u', 'ű':'u'};
String.prototype.latinise=function(){return this.replace(/[^A-Za-z0-9\[\] ]/g,function(a){return Latinise.latin_map[a]||a})};
module.exports = {
	latinize : function(s) { return s.latinise(); },
};
String.prototype.isLatin=function(){return this==this.latinise()}