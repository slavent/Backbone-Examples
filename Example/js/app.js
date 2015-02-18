var Item = Backbone.Model.extend({

	validate: function(attrs){
		//console.log(attrs);
	}

});

var item = new Item();

var ItemsCollection = Backbone.Collection.extend({
	model: Item
});

var ItemView = Backbone.View.extend({
	initialize: function(){
		//console.log(this.model);
		//this.render();
	},

	tagName: "div",
	className: "list__item",

	tmpl: "#item",

	render: function(){
		var tmpl = _.template($(this.tmpl).html());

		this.$el.html(tmpl(this.model.toJSON()));

		return this;
	}
});

var ItemsView = Backbone.View.extend({
	initialize: function(){
		console.log(this.collection);
	},

	tagName: "div",
	className: "list",

	render: function(){
		this.collection.each(function(item){
			var itemView = new ItemView({model: item});

			this.$el.append(itemView.render().el);
		}, this);

		return this;
	}
});

var link = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";

$.getJSON(link,
	{
	   tags: "mount rainier",
	   tagmode: "any",
	   format: "json"
	}, 
	function(data){
		var itemsCollection = new ItemsCollection(data.items);
		var itemsView = new ItemsView({collection: itemsCollection});

		$(".wrp").html(itemsView.render().el);
	}
);