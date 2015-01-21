(function($) {
  var defaults = { intervalSpeed: 2000, animationSpeed: 1 };

  $.TextSlider = function(el, options) {
    this.$el = $(el);
    this.$verbWrap = this.$el.find('.verb');
    this.$predWrap = this.$el.find('.predicate');
    this.verbIndex = 0;
    this.predicateIndex = 0;
    this.currPredicateIndex = 0;
    this.content = options.content;
    this.settings = $.extend(defaults, options);
    this.populate();
    this.run();
    window.addEventListener('focus', this.run.bind(this));    
    window.addEventListener('blur', this.pause.bind(this));
  }

  $.TextSlider.prototype.verbs = function() {
    if (typeof this._verbs === "undefined") {
      this._verbs = [];
      for (var verb in this.content) {
        this._verbs.push(verb)
      }
    }
    return this._verbs;
  }

  $.TextSlider.prototype.populate = function() {
    this.populateVerbs();
    this.populatePredicates();
    // this.updateElements();
  }

  $.TextSlider.prototype.populateVerbs = function() {
    var $verbs = [];
    for(var i = 0; i < this.verbs().length; i++) {
      var $verb = $('<p></p>').text(this.verbs()[i]);
      $verbs.push($verb);
    }
    this.$verbWrap.append($verbs);
    this.$verbs = this.$verbWrap.children();
  }

  $.TextSlider.prototype.setCurrentVerb = function() {
    this.$currVerb = this.$verbs.eq(this.verbIndex);
    this.$currVerb.addClass('active');
    this.$verbWrap.width(this.$currVerb.outerWidth(true) + 20);
  }

  $.TextSlider.prototype.setCurrentPred = function() {
    this.$currPred = this.$predWrap.children().eq(this.predicateIndex)
    this.$currPred.addClass('active');
    this.$predWrap.width(this.$currPred.outerWidth(true) + 200);
  }

  $.TextSlider.prototype.setWidth = function() {
    var totalWidth = this.$currVerb.outerWidth(true) + this.$currPred.outerWidth(true);
    this.$el.width(totalWidth + 10);
  }

  $.TextSlider.prototype.populatePredicates = function() {
    var $predicates = [];
    this.predicatesLength = 0;
    for( var i = 0; i < this.verbs().length; i++) {
      var preds = this.content[this.verbs()[i]];
      this.predicatesLength += preds.length;
      for (var j = 0; j < preds.length; j++) {
        var $predicate = $('<p></p>').text(preds[j]);
        $predicates.push($predicate);
      }
    }
    this.$predWrap.append($predicates);
  }

  $.TextSlider.prototype.updateElements = function() {
    this.setCurrentVerb();
    this.setCurrentPred();
    this.setWidth();
  }

  $.TextSlider.prototype.run = function() {
    this.interval = window.setInterval(
        this.tick.bind(this), this.settings.intervalSpeed
        );
  }

  $.TextSlider.prototype.tick = function() {
    this.slidePredicate();
  }

  $.TextSlider.prototype.slidePredicate = function(group, index) {
    var $oldVerb,
        $newVerb;

    var $oldItem = (this.$predWrap.children().eq(this.predicateIndex));
    if (this.incrementPredicate()) {
      var $oldVerb = (this.$verbWrap.children().eq(this.verbIndex));
      this.verbIndex = (this.verbIndex + 1 + this.verbs().length) % this.verbs().length;
      var $newVerb = (this.$verbWrap.children().eq(this.verbIndex));
    }
    console.log(this.predicateIndex);
    var $newItem = (this.$predWrap.children().eq(this.predicateIndex));


    $newItem.addClass('bottom active');
    $newVerb && $newVerb.addClass('top active');
    $oldItem.one("transitionend", (function() {
      $oldItem.removeClass("active top");
      $oldVerb && $oldVerb.removeClass("active bottom");
    }).bind(this));


    setTimeout(function() {
      $oldItem.addClass('top');
      $oldVerb && $oldVerb.addClass("bottom");
      $newItem.removeClass('bottom');
      $newVerb && $newVerb.removeClass('top');
    }, 0);
  }

  $.TextSlider.prototype.incrementPredicate = function() {
    this.predicateIndex = ((this.predicateIndex + 1 + this.predicatesLength) % this.predicatesLength);
    this.currPredicateIndex++;
    var currVerb = this.verbs()[this.verbIndex];
    var currPreds = this.content[currVerb];
    if (this.currPredicateIndex >= currPreds.length) {
      this.currPredicateIndex = 0;
    }
    return this.currPredicateIndex === 0;
  }
  
  $.TextSlider.prototype.pause = function() {
    window.clearInterval(this.interval);
  }


  $.fn.textSlider = function(options) {
    return this.each(function() {
      return new $.TextSlider(this, options);
    });
  }
}(jQuery));
